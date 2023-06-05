export abstract class Fetch {
  protected configs: HttpRequestInit;
  protected baseUrl: string | null;

  constructor() {
    const headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || null;
    this.configs = this.onBeforeSend({
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: headers,
      redirect: "follow",
      referrerPolicy: "no-referrer-when-downgrade",
    });
  }

  /**
   * Initial common configs request
   * @param configs HttpRequestInit
   * @returns HttpRequestInit
   */
  protected onBeforeSend(configs: HttpRequestInit): HttpRequestInit {
    return configs;
  }

  /**
   * Run after server response status 2xx
   * @param response Response
   * @return response;
   */
  protected async onSuccess(response: Response): Promise<Response> {
    return response;
  }

  /**
   * Run after server response status 4xx or 5xx
   * @param response Response
   * @return response;
   */
  protected async onFailure(response: Response): Promise<Response> {
    return response;
  }

  /**
   * Run if catch an error during fetching api
   * @param error any
   */
  protected async onError(error: any) {
    return error;
  }

  /**
   * Convert object to query parameters string
   * @param params HttpParams | null
   * @returns string
   */
  protected getParameters(params: HttpParams | null): string {
    if (params === null) params = {};
    if (Object.keys(params).length === 0) return "";
    return "?" + new URLSearchParams(params).toString();
  }

  /**
   * Fetching API via fetch()
   * @param method HttpMethods
   * @param params HttpParams
   * @param body HttpBody
   * @param configs HttpRequestInit
   * @return Promise<Response>
   */
  protected async fetch(uri: string, method: HttpMethods, params: HttpParams | null, body: HttpBody | null, configs: HttpRequestInit): Promise<Response> {
    try {
      const baseUrl = this.baseUrl ? (this.baseUrl.endsWith("/") ? this.baseUrl : this.baseUrl + "/") : "";
      const path = uri.startsWith("/") ? uri.substring(1) : uri;
      const fullPath = uri.indexOf("http://") === 0 || uri.indexOf("https://") === 0 ? uri : baseUrl + path;
      const headers = this.configs.headers;
      configs.headers.forEach((value, key) => headers.append(key, value));
      const response: Response = await fetch(fullPath + this.getParameters(params), {
        ...this.configs,
        ...configs,
        headers,
        method,
        body,
      });
      if (response.status >= 200 && response.status <= 299) {
        return this.onSuccess(response);
      } else if (response.status >= 400 && response.status <= 599) {
        return this.onFailure(response);
      } else {
        return response;
      }
    } catch (error: any) {
      throw this.onError(error);
    }
  }

  public async get(uri: string, params: HttpParams | null = null, configs: HttpRequestInit = defaultHttpRequestConfigs): Promise<Response> {
    return this.fetch(uri, "GET", params, null, configs);
  }

  public async post(uri: string, body: HttpBody | null = null, configs: HttpRequestInit = defaultHttpRequestConfigs): Promise<Response> {
    return this.fetch(uri, "POST", null, body, configs);
  }

  public async put(uri: string, body: HttpBody | null = null, configs: HttpRequestInit = defaultHttpRequestConfigs): Promise<Response> {
    return this.fetch(uri, "PUT", null, body, configs);
  }

  public async patch(uri: string, body: HttpBody | null = null, configs: HttpRequestInit = defaultHttpRequestConfigs): Promise<Response> {
    return this.fetch(uri, "PATCH", null, body, configs);
  }

  public async delete(uri: string, body: HttpBody | null = null, configs: HttpRequestInit = defaultHttpRequestConfigs): Promise<Response> {
    return this.fetch(uri, "DELETE", null, body, configs);
  }
}

export const defaultHttpRequestConfigs: HttpRequestInit = {
  headers: new Headers(),
};

export type HttpMethods = "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH";

export type HttpHeaders = Headers & {};

export type HttpBody = BodyInit & {};

export type HttpParams = string[][] | Record<string, string> | string | URLSearchParams;

export type HttpRequestInit = RequestInit & { headers: HttpHeaders };
