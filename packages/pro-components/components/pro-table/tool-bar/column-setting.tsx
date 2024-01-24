import {
  PropType,
  VNodeTypes,
  computed,
  defineComponent,
  inject,
  nextTick,
  reactive,
  ref,
  toRaw,
  toRef,
  watch,
} from 'vue';
import { Checkbox, Popover, Space, Tree } from '@arco-design/web-vue';
import { useI18n } from '../../../locale';
import { getPrefixCls } from '../../_utils';
import MyToolTip from '../my-tool-tip';
import MyIcon from '../my-icon/index.vue';
import { ColumnsState, ProColumns, ProTableContext } from '../interface';
import { proTableInjectionKey } from '../form/context';
import {
  IconSettings,
  IconToBottom,
  IconToTop,
} from '@arco-design/web-vue/es/icon';
import { isArray } from '../../_utils/is';
import { deepClone, getArrDiff, loopFilter } from '../utils';

type PositionType = 'left' | 'right' | 'other';

export default defineComponent({
  name: 'ColumnSetting',
  props: {
    columns: {
      type: Array as PropType<ProColumns[]>,
      default: () => [],
    },
    draggable: {
      type: Boolean,
      default: true,
    },
    checkable: {
      type: Boolean,
      default: true,
    },
    showListItemOption: {
      type: Boolean,
      default: true,
    },
    checkedReset: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const tableCtx = inject<Partial<ProTableContext>>(proTableInjectionKey, {});
    const localColumns = toRef(props, 'columns');
    const listMap = reactive<{ left: any[]; right: any[]; other: any[] }>({
      left: [],
      other: [],
      right: [],
    });
    const checkedKeysMap = reactive<{
      left: any[];
      right: any[];
      other: any[];
      disable: any[];
    }>({
      left: [],
      right: [],
      other: [],
      disable: [],
    });
    const checkedKeys = computed<any[]>(() => [
      ...checkedKeysMap.left,
      ...checkedKeysMap.right,
      ...checkedKeysMap.other,
    ]);
    // 默认已选中
    const defaultCheckedKeysMap = ref<any>({
      left: [],
      right: [],
      other: [],
      disable: [],
    });
    const defaultListMap = ref<{ left: any[]; right: any[]; other: any[] }>({
      left: [],
      right: [],
      other: [],
    });
    const treeRef = ref<any>({ left: null, right: null, other: null });
    const defaultAllCheckedKeys = ref<any[]>([]);
    const currentDragTreeData = ref<any>({});
    const needInit = ref<boolean>(
      tableCtx?.columnsMap
        ? Object.keys(tableCtx?.columnsMap).length > 0
        : false
    );
    const localColumnsMap = ref<{ [propName: string]: ColumnsState }>(
      JSON.parse(JSON.stringify(tableCtx?.columnsMap)) || {}
    );
    const loopData = (
      data: any[] | undefined,
      parentItem: any,
      parentIndex: number
    ) => {
      if (!data || !isArray(data) || !data.length) {
        return undefined;
      }
      let newData = [];
      let index = 0;
      for (let [_, columnItem] of data.entries()) {
        // 不把title(有vnode类型)传给tree 会有提示
        const { title, render, hideInSetting, sortOrder, disable, ...item } =
          columnItem;
        // 不显示
        if (hideInSetting) {
          continue;
        }
        const newItem = {
          ...item,
          disableCheckbox: parentItem.disableCheckbox || disable, // 父级不可选则也不可选
          nodeTitle: title,
          parentIndexs: (parentItem.parentIndexs || []).concat(parentIndex), //父级的index索引
          dragLevel: parentItem.dragLevel + 1,
          dragLevelKey: `${parentItem.key}_${parentItem.dragLevel + 1}`, //只能相同的拖拽
          dragIndex: index,
        };
        if (newItem.disableCheckbox) {
          checkedKeysMap.disable.push(item.key);
        }
        defaultAllCheckedKeys.value.push(item.key);
        switch (item.fixed || parentItem.fixed) {
          case 'left':
            checkedKeysMap.left.push(item.key);
            break;
          case 'right':
            checkedKeysMap.right.push(item.key);
            break;
          default:
            checkedKeysMap.other.push(item.key);
            break;
        }
        if (newItem.children) {
          newItem.children = loopData(newItem.children, newItem, index);
        }
        newData.push(newItem);
        index++;
      }
      return newData;
    };
    watch(
      [localColumns, needInit],
      ([columns, needInit]) => {
        let newLeftList: any[] = [];
        let newRightList: any[] = [];
        let newList: any[] = [];
        let parentIndexMap: any = { left: 0, right: 0, other: 0 };
        let initColumns = [...columns];
        // 初始化
        if (needInit && Object.keys(localColumnsMap.value).length > 0) {
          initColumns = loopFilter(columns, undefined, localColumnsMap, false);
        }
        initColumns.forEach((columnItem: any) => {
          // 需要处理title(有vnode类型) 传给tree会有提示
          const { title, render, hideInSetting, sortOrder, disable, ...item } =
            columnItem;
          const { fixed } = item;
          // 不显示
          if (hideInSetting) {
            return;
          }
          const newItem = {
            ...item,
            nodeTitle: title,
            disableCheckbox: disable,
            dragLevel: 1, // 只能相同的拖拽
            dragLevelKey: 1, // 只能相同的拖拽
            showTool: true, // 是否显示固定操作按钮，只有第一层有
            dragIndex: parentIndexMap[fixed || 'other'],
          };
          if (newItem.disableCheckbox) {
            checkedKeysMap.disable.push(item.key);
          }
          defaultAllCheckedKeys.value.push(item.key);
          switch (fixed) {
            case 'left':
              checkedKeysMap.left.push(item.key);
              break;
            case 'right':
              checkedKeysMap.right.push(item.key);
              break;
            default:
              checkedKeysMap.other.push(item.key);
              break;
          }
          if (newItem.children) {
            newItem.children = loopData(
              newItem.children,
              newItem,
              parentIndexMap[fixed || 'other'] // 拖拽用
            );
          }
          parentIndexMap[fixed || 'other'] += 1;
          if (fixed === 'left') {
            newLeftList.push(newItem);
            return;
          }
          if (fixed === 'right') {
            newRightList.push(newItem);
            return;
          }
          newList.push(newItem);
        });
        listMap.left = newLeftList;
        listMap.right = newRightList;
        listMap.other = newList;
        defaultCheckedKeysMap.value = JSON.parse(
          JSON.stringify(toRaw(checkedKeysMap))
        );
        // 可能有Vnode 不能用JSON
        defaultListMap.value = deepClone(listMap);
      },
      {
        immediate: true,
        deep: true,
      }
    );
    const { getMessage } = useI18n();
    const prefixCls = getPrefixCls('pro-table-column-setting');

    /** 全选和反选 */
    const checkedAll = (val: any, reset = false) => {
      if (val) {
        const defaultCheckedKeysData = toRaw(defaultCheckedKeysMap.value);
        checkedKeysMap.left = defaultCheckedKeysData.left;
        checkedKeysMap.right = defaultCheckedKeysData.right;
        checkedKeysMap.other = defaultCheckedKeysData.other;
      } else {
        if (checkedKeysMap.disable.length) {
          for (let type of Object.keys(listMap)) {
            checkedKeysMap[type as PositionType] = checkedKeysMap[
              type as PositionType
            ].filter((item: any) => {
              return checkedKeysMap.disable.includes(item);
            });
          }
        } else {
          checkedKeysMap.left = [];
          checkedKeysMap.right = [];
          checkedKeysMap.other = [];
        }
      }
      // 切换显示
      defaultAllCheckedKeys.value.map((key) => {
        localColumnsMap.value[key] = {
          ...(localColumnsMap.value[key] || {}),
          show: val,
        };
      });
      // 重置
      if (reset) {
        const defaultListMapData = toRaw(defaultListMap.value);
        listMap.left = defaultListMapData.left;
        listMap.right = defaultListMapData.right;
        listMap.other = defaultListMapData.other;
        // 重置
        if (needInit.value) {
          needInit.value = false;
        }
        localColumnsMap.value = {};
        tableCtx?.setColumnsMap?.({});
      } else {
        tableCtx?.setColumnsMap?.(localColumnsMap.value);
      }
    };
    // 是否已经选中
    const indeterminate = computed(() => {
      return (
        checkedKeys.value.length > 0 &&
        checkedKeys.value.length !== defaultAllCheckedKeys.value.length
      );
    });
    const updateTreeData = (list: any[]) => {
      if (!list || !list.length) {
        return;
      }
      function loop(data: any[], parentIndex: number) {
        data.map((item) => {
          if (item.parentIndexs) {
            // 替换第一个
            item.parentIndexs.splice(0, 1, parentIndex);
          }
          if (item.children && item.children.length) {
            loop(item.children, parentIndex);
          }
        });
      }
      list.map((item, index) => {
        item.dragIndex = index;
        // 需要更新parentIndexs
        if (item.children && item.children.length) {
          loop(item.children, index);
        }
      });
    };
    const ToolTipIcon = ({
      title,
      show,
      fixed,
      icon,
      type,
      dragIndex,
    }: {
      title: string;
      show: boolean;
      fixed: 'left' | 'right' | undefined;
      icon?: any;
      type: PositionType;
      dragIndex: number;
    }) => {
      if (!show) {
        return null;
      }
      return (
        <MyToolTip content={title}>
          <span
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              // 固定或取消固定操作
              const toolList = listMap[type].splice(dragIndex, 1);
              if (!toolList.length) {
                return;
              }
              const toolItem = toolList[0];
              toolItem.fixed = fixed;
              switch (fixed) {
                case 'left':
                  listMap['left'].push(toolItem);
                  break;
                case 'right':
                  listMap['right'].unshift(toolItem);
                  break;
                default:
                  type === 'right'
                    ? listMap['other'].push(toolItem)
                    : listMap['other'].unshift(toolItem);
                  break;
              }
              localColumnsMap.value[toolItem.key] = {
                ...(localColumnsMap.value[toolItem.key] || {}),
                fixed: fixed,
              };
              // 第一级数据排序
              [
                ...listMap['left'],
                ...listMap['other'],
                ...listMap['right'],
              ].map((item, order) => {
                localColumnsMap.value[item.key] = {
                  ...(localColumnsMap.value[item.key] || {}),
                  order,
                  fixed: item.fixed,
                };
              });
              tableCtx?.setColumnsMap?.(localColumnsMap.value);
              updateTreeData(listMap[fixed || 'other']);
              updateTreeData(listMap[type]);
              nextTick(() => {
                // 操作后树的选中值
                const currentCheckedNodes = treeRef.value[type].getCheckedNodes(
                  {
                    checkedStrategy: 'all',
                    includeHalfChecked: false,
                  }
                );
                const currentCheckedKeys = currentCheckedNodes.map(
                  (node: any) => node.key
                );
                // 当前操作树需要删除的值
                const currentKeys = getArrDiff(
                  checkedKeysMap[type],
                  currentCheckedKeys
                );
                // 添加
                checkedKeysMap[fixed || 'other'] =
                  checkedKeysMap[fixed || 'other'].concat(currentKeys);
                checkedKeysMap[type] = currentCheckedKeys;
              });
            }}
          >
            {icon}
          </span>
        </MyToolTip>
      );
    };

    const CheckboxListItem = ({
      columnKey,
      title,
      fixed,
      showListItemOption,
      showTool,
      type,
      dragIndex,
    }: {
      columnKey: string | number;
      title?: VNodeTypes;
      fixed?: boolean | 'left' | 'right';
      showListItemOption?: boolean;
      showTool?: boolean;
      type: PositionType;
      dragIndex: number;
    }) => {
      const dom = (
        <span class={`${prefixCls}-list-item-option`}>
          <ToolTipIcon
            fixed="left"
            title={getMessage('tableToolBar.leftPin', '固定在左侧')}
            show={fixed !== 'left'}
            icon={<IconToTop />}
            type={type}
            dragIndex={dragIndex}
          ></ToolTipIcon>
          <ToolTipIcon
            fixed={undefined}
            title={getMessage('tableToolBar.noPin', '不固定')}
            show={!!fixed}
            icon={<MyIcon type="icon-vertical-align-middl1" />}
            type={type}
            dragIndex={dragIndex}
          ></ToolTipIcon>
          <ToolTipIcon
            fixed="right"
            title={getMessage('tableToolBar.rightPin', '固定在右侧')}
            show={fixed !== 'right'}
            icon={<IconToBottom />}
            type={type}
            dragIndex={dragIndex}
          ></ToolTipIcon>
        </span>
      );
      return (
        <span class={`${prefixCls}-list-item`} key={columnKey}>
          <div
            class={`${prefixCls}-list-item-title`}
            title={typeof title === 'string' ? title : undefined}
          >
            {title}
          </div>
          {showListItemOption && showTool ? dom : null}
        </span>
      );
    };
    const getCurrentDropList = (list: any[], indexs: number[]) => {
      let current = list;
      for (let i of indexs) {
        current = current[i].children;
      }
      return current || [];
    };
    const CheckboxList = ({
      list,
      draggable,
      checkable,
      showListItemOption,
      showTitle = true,
      title: listTitle,
      type,
    }: {
      list: any[];
      class?: string;
      title: string;
      draggable: boolean;
      checkable: boolean;
      showListItemOption: boolean;
      showTitle?: boolean;
      type: PositionType;
    }) => {
      const listDom = (
        <Tree
          draggable={
            !!(
              draggable &&
              ((list?.length && list?.length > 1) ||
                (list.length === 1 && list[0].children))
            )
          }
          checkable={checkable}
          blockNode
          v-model:checkedKeys={checkedKeysMap[type]}
          ref={(ref) => {
            treeRef.value[type] = ref;
          }}
          showLine={false}
          onCheck={(newCheckedKeys, { checked, halfCheckedKeys }) => {
            // 选中
            if (checked) {
              [...newCheckedKeys, ...halfCheckedKeys].map((key) => {
                localColumnsMap.value[key] = {
                  ...(localColumnsMap.value[key] || {}),
                  show: true,
                };
              });
              tableCtx?.setColumnsMap?.(localColumnsMap.value);
              return;
            }
            // 未选中
            // 操作前选中值
            const prevCheckedNodes = treeRef.value[type].getCheckedNodes({
              checkedStrategy: 'all',
              includeHalfChecked: true,
            });
            const prevCheckedKeys = prevCheckedNodes.map(
              (node: any) => node.key
            );
            prevCheckedKeys.map((key: any) => {
              localColumnsMap.value[key] = {
                ...(localColumnsMap.value[key] || {}),
                show: [...newCheckedKeys, ...halfCheckedKeys].includes(key),
              };
            });
            tableCtx?.setColumnsMap?.(localColumnsMap.value);
          }}
          onDrop={({
            dragNode,
            dropNode,
            dropPosition,
          }: {
            dragNode: any;
            dropNode: any;
            dropPosition: number;
          }) => {
            const currentList = dragNode.parentIndexs
              ? getCurrentDropList(list, dragNode.parentIndexs)
              : list;
            // 1:在dropNode后面,0|-1:放dropNode前面
            currentList.splice(
              dropPosition === 1 ? dropNode.dragIndex + 1 : dropNode.dragIndex,
              0,
              dragNode
            );
            // 修正值
            const dragIndexAmend =
              dragNode.dragIndex < dropNode.dragIndex ? 0 : 1;
            currentList.splice(dragNode.dragIndex + dragIndexAmend, 1);
            currentList.map((item, index) => {
              // children里面的 改排序
              localColumnsMap.value[item.key] = {
                ...(localColumnsMap.value[item.key] || {}),
                order: index,
              };
              item.dragIndex = index;
            });
            tableCtx?.setColumnsMap?.(localColumnsMap.value);
          }}
          onDragStart={(_, dragNode: any) => {
            currentDragTreeData.value = dragNode;
          }}
          allowDrop={({
            dropNode,
          }: {
            dropNode: any;
            dropPosition: number;
          }) => {
            return (
              currentDragTreeData.value.dragLevelKey === dropNode.dragLevelKey
            );
          }}
          v-slots={{
            title: (_node: any) => {
              const node = { ..._node, children: undefined };
              if (!node.nodeTitle) return null;
              return (
                <CheckboxListItem
                  fixed={node.fixed}
                  showTool={node.showTool}
                  showListItemOption={showListItemOption}
                  title={node.nodeTitle}
                  columnKey={node.key as string}
                  type={type}
                  dragIndex={node.dragIndex}
                />
              );
            },
          }}
          data={list}
        />
      );
      return (
        <>
          {showTitle && (
            <span class={`${prefixCls}-list-title`}>{listTitle}</span>
          )}
          {listDom}
        </>
      );
    };
    const GroupCheckboxList = ({
      draggable,
      checkable,
      showListItemOption,
    }: {
      draggable: boolean;
      checkable: boolean;
      showListItemOption: boolean;
    }) => {
      const showRight = listMap.right && listMap.right.length > 0;
      const showLeft = listMap.left && listMap.left.length > 0;
      return (
        <div
          class={[
            `${prefixCls}-list`,
            { [`${prefixCls}-list-group`]: showRight || showLeft },
          ]}
        >
          <CheckboxList
            title={getMessage('tableToolBar.leftFixedTitle', '固定在左侧')}
            list={listMap.left}
            draggable={draggable}
            checkable={checkable}
            showListItemOption={showListItemOption}
            type="left"
          />
          {/* 如果没有任何固定，不需要显示title */}
          <CheckboxList
            list={listMap.other}
            draggable={draggable}
            checkable={checkable}
            showListItemOption={showListItemOption}
            title={getMessage('tableToolBar.noFixedTitle', '不固定')}
            showTitle={showLeft || showRight}
            type="other"
          />
          <CheckboxList
            title={getMessage('tableToolBar.rightFixedTitle', '固定在右侧')}
            list={listMap.right}
            draggable={draggable}
            checkable={checkable}
            showListItemOption={showListItemOption}
            type="right"
          />
        </div>
      );
    };
    const render = () => {
      return (
        <Popover
          // @ts-ignore
          showArrow={false}
          overlayClassName={`${prefixCls}-overlay`}
          trigger="click"
          position="br"
          popupContainer={tableCtx.popupContainer}
          v-slots={{
            title: () => {
              return (
                <div class={`${prefixCls}-title`}>
                  {props.checkable === false ? (
                    <div />
                  ) : (
                    <Checkbox
                      indeterminate={indeterminate.value}
                      modelValue={
                        checkedKeys.value.length ===
                        defaultAllCheckedKeys.value.length
                      }
                      onChange={(val) => {
                        checkedAll(val);
                      }}
                    >
                      {getMessage('tableToolBar.columnDisplay', '列展示')}
                    </Checkbox>
                  )}
                  {props.checkedReset ? (
                    <a
                      onClick={() => {
                        checkedAll(true, true);
                      }}
                      class={`${prefixCls}-action-rest-button`}
                    >
                      {getMessage('tableToolBar.reset', '重置')}
                    </a>
                  ) : null}
                  {slots['setting-extra'] ? (
                    <Space size={12} align="center">
                      {slots['setting-extra']()}
                    </Space>
                  ) : null}
                </div>
              );
            },
            content: () => {
              return (
                <GroupCheckboxList
                  checkable={props.checkable ?? true}
                  draggable={props.draggable ?? true}
                  showListItemOption={props.showListItemOption ?? true}
                />
              );
            },
            default: () => {
              return (
                <MyToolTip
                  content={getMessage('tableToolBar.columnSetting', '列设置')}
                >
                  {slots['setting-icon'] ? (
                    slots['setting-icon']()
                  ) : (
                    <IconSettings />
                  )}
                </MyToolTip>
              );
            },
            ...slots,
          }}
        ></Popover>
      );
    };

    return {
      render,
    };
  },
  render() {
    return this.render();
  },
});
