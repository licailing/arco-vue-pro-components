export interface ArcoVueProComponentLang {
  locale?: string;
  moneySymbol: string;
  tableForm: {
    search: string;
    reset: string;
    submit: string;
    collapsed: string;
    expand: string;
    inputPlaceholder: string;
    selectPlaceholder: string;
    lightSearch: string;
    lightInputPlaceholder: string;
  };
  alert: {
    clear: string;
    selected: string;
    item: string;
  };
  pagination: {
    total: {
      range: string;
      total: string;
      item: string;
    };
  };
  tableToolBar: {
    leftPin: string;
    rightPin: string;
    noPin: string;
    leftFixedTitle: string;
    rightFixedTitle: string;
    noFixedTitle: string;
    reset: string;
    columnDisplay: string;
    columnSetting: string;
    fullScreen: string;
    exitFullScreen: string;
    reload: string;
    density: string;
    densityDefault: string;
    densityLarger: string;
    densityMiddle: string;
    densitySmall: string;
  };
}

export type ArcoVueProComponentI18nMessages = Record<
  string,
  ArcoVueProComponentLang
>;
