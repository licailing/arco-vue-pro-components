import { watch, Ref, onBeforeUnmount } from 'vue';
import useState from '../../_hooks/use-state';
import { debounce } from 'lodash';
import { PaginationProps } from '@arco-design/web-vue';

export interface RequestData<T> {
  data: T[];
  success?: boolean;
  total?: number;
  [key: string]: any;
}
export interface UseFetchDataAction<T = any> {
  data: Ref<T[]>;
  setDataSource: (data: T[]) => void;
  loading: Ref<boolean | undefined>;
  pageInfo: Ref<PageInfo>;
  reload: () => Promise<void>;
  reset: () => void;
  setPageInfo: (pageInfo: Partial<PageInfo>) => void;
}

export interface PageInfo {
  current: number;
  pageSize: number;
  total?: number;
}

const mergeOptionAndPageInfo = (pageInfo: PaginationProps) => {
  if (pageInfo) {
    const { current, defaultCurrent, pageSize, defaultPageSize } = pageInfo;
    return {
      current: current || defaultCurrent || 1,
      pageSize: pageSize || defaultPageSize || 20,
    };
  }
  return { current: 1, pageSize: 20 };
};
const useFetchData = <T extends RequestData<any>>(
  getData:
    | undefined
    | ((params: {
        pageSize: number;
        current: number;
      }) => Promise<T | undefined>),
  props: any,
  emit: any,
  options: {
    pageInfo: PaginationProps;
    effects: any;
  }
): UseFetchDataAction<T> => {
  const [list, setList] = useState<T['data']>(props?.defaultData || []);
  const [loading, setLoading] = useState<boolean | undefined>(
    props.loading || undefined
  );
  const [pageInfo, setPageInfo] = useState<PageInfo>(
    mergeOptionAndPageInfo(options.pageInfo)
  );
  const fetchList = async (isAppend?: boolean) => {
    if (loading.value || !getData) {
      return [];
    }
    setLoading(true);
    try {
      const {
        data = [],
        success,
        total: dataTotal = 0,
        ...rest
      } = (await getData({
        current: pageInfo.value.current,
        pageSize: pageInfo.value.pageSize,
      })) || {};
      if (success !== false) {
        if (isAppend && list) {
          setList([...list.value, ...data]);
        } else {
          setList(data);
        }
        setPageInfo({
          ...pageInfo.value,
          total: dataTotal,
        });
      }
      if (emit) {
        emit('load', data, dataTotal, rest);
      }
    } catch (e: any) {
      if (emit) {
        emit('requestError', e);
      }
    } finally {
      requestAnimationFrame(() => {
        setLoading(false);
      });
    }
    return [];
  };

  const fetchListDebounce = debounce(fetchList, 200);
  watch(
    () => pageInfo.value.current,
    () => {
      fetchListDebounce();
    }
  );

  // pageSize 修改后返回第一页
  watch(
    () => pageInfo.value.pageSize,
    () => {
      // current没变，pageSize变了需要请求数据
      if (pageInfo.value.current) {
        fetchListDebounce();
      }
      setPageInfo({ ...pageInfo.value, current: 1 });
    }
  );

  watch(
    options.effects,
    () => {
      fetchListDebounce();
    },
    {
      immediate: true,
      deep: true,
    }
  );

  onBeforeUnmount(() => {
    fetchListDebounce.cancel();
  });

  return {
    data: list,
    setDataSource: setList,
    loading,
    reload: async () => {
      await fetchListDebounce();
    },
    pageInfo,
    reset: () => {
      setPageInfo({
        current: options.pageInfo?.defaultCurrent || 1,
        pageSize: options.pageInfo?.defaultPageSize || 20,
      });
    },
    setPageInfo: (info) =>
      setPageInfo({
        ...pageInfo.value,
        ...info,
      }),
  };
};

export default useFetchData;
