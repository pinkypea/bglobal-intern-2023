import { EventBus } from "./bus.plugin";
import { Vue } from "./vue.plugin";

export class SearchParams extends Vue {
  public params: SearchParamState = this.reactive({});
  public hook: OnSearchParamChangeCallback<any> = () => {};

  public constructor() {
    super();
    this.params = this.getAllFromUrl();
    EventBus.on(SEARCH_PARAMS_EVENTS.updated, (data: SearchParamState) => {
      this.params = data;
      this.hook(this.params);
    });
  }

  public get = (key: string) => {
    return this.params[key] || null;
  };

  public getAll = () => {
    return this.params;
  };

  public getAllFromUrl = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    return Object.fromEntries(urlSearchParams.entries());
  };

  public changeParams = (params: TmpSearchParamState) => {
    const string = this.convertObjectToString(params);
    const newParams = Object.fromEntries(Object.entries(params).filter((param) => ![null, undefined, ""].includes(param[1])));
    if (window.location.search !== string) {
      this.pushState(string);
      EventBus.emit(SEARCH_PARAMS_EVENTS.updated, newParams);
    }
  };

  public convertObjectToString = (params: TmpSearchParamState) => {
    let array: Array<string> = [];
    Object.entries(params).forEach(([key, value]) => {
      if (!["", null, undefined].includes(value)) {
        array = [...array, `${key}=${value}`];
      }
    });
    return `?${array.join("&")}`;
  };

  public onStateChange = (callback: OnSearchParamChangeCallback<any>) => {
    this.hook = callback;
  };

  private pushState = (string: string) => {
    if (window.history.pushState) {
      const url = window.location.protocol + "//" + window.location.host + window.location.pathname + string;
      window.history.pushState({ path: url }, "", url);
    }
  };
}

export const SEARCH_PARAMS_EVENTS = {
  updated: "search-params-updated",
};

export type SearchParamState = {
  [key: string]: string;
};

export type TmpSearchParamState = {
  [key: string]: string | null | undefined;
};

export type OnSearchParamChangeCallback<T> = (data: T) => void;
