import { Api } from "@merchant-workspace/api-interfaces";
import { apiClient } from "./apiClient";
import { AxiosError } from "axios";
import {TOKEN_KEY} from "./context/accountContext";

type HttpMethod = "GET" | "POST";
type QueryObject = Record<string, unknown>;
type ContainsKey<T, K extends string | number, ELSE> = T extends {
  [key in K]: any;
}
  ? T[K]
  : ELSE;

const parseQueryParams = (queryObject?: QueryObject): string => {
  if (!queryObject) {
    return "";
  }

  const entries = Object.entries(queryObject);

  if (!entries.length) {
    return "";
  }

  const queryArray: string[] = [];

  for (const [key, value] of entries) {
    queryArray.push(`${key}=${value}`);
  }

  return `?${queryArray.join("&")}`;
};

async function query<URL extends keyof Api>(url: URL, method: HttpMethod): Promise<Api[URL]["response"]>;
async function query<URL extends keyof Api>(
  url: URL,
  method: HttpMethod,
  queryParams: ContainsKey<Api[URL], "queryParams", QueryObject>
): Promise<Api[URL]["response"]>;
async function query<URL extends keyof Api>(
  url: URL,
  method: HttpMethod,
  queryParams: ContainsKey<Api[URL], "queryParams", QueryObject>,
  params: ContainsKey<Api[URL], "params", null>
): Promise<Api[URL]["response"]>;
async function query<URL extends keyof Api>(
  url: URL,
  method: HttpMethod,
  queryParams: ContainsKey<Api[URL], "queryParams", QueryObject>,
  params: ContainsKey<Api[URL], "params", null>,
  body: ContainsKey<Api[URL], "body", QueryObject>
): Promise<Api[URL]["response"]>;
async function query<URL extends keyof Api>(
  url: URL,
  httpMethod: HttpMethod,
  queryParams?: ContainsKey<Api[URL], "queryParams", QueryObject>,
  params?: ContainsKey<Api[URL], "params", never>,
  body?: ContainsKey<Api[URL], "body", never>
): Promise<Api[URL]["response"]> {
  const query = parseQueryParams(queryParams);
  const fullUrl = `${url}${query}`;
  const endpointMethod: Api[URL]["method"] = httpMethod;
  const method = getHttpMethod(endpointMethod);
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  }

  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(TOKEN_KEY)

    if (token) {
      // TODO fix that
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      headers['Authorization'] = `Bearer ${token.replaceAll('"', '')}`
    }
  }

  try {
    if (body) {
      const response = (await apiClient({ method, url: fullUrl, data: body, headers })).data as Api[URL]["response"];
      return response;
    }

    if (!params || (params && !params.length)) {
      const response = (await apiClient(fullUrl, { method, headers })).data as Api[URL]["response"];
      return response;
    }

    const regexp = /:[a-zA-Z\d]+/gm;
    let i = 0;

    for (const param of fullUrl.matchAll(regexp)) {
      const valueToReplace = param[0];
      const destinedValue = params[i];
      fullUrl.replace(valueToReplace, `${destinedValue}`);
      i++;
    }

    const response = (await apiClient(fullUrl, { method, headers })).data as Api[URL]["response"]; // TODO get rid of casting
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? 0;
      if ([400, 401, 404, 409].includes(status)) {
        const message = typeof error.response?.data === "string" ? error.response.data : error.message;
        throw new Error(message);
      }
    }

    throw error;
  }
}

const getHttpMethod = (method: HttpMethod): "get" | "post" => {
  switch (method) {
    case "GET":
      return "get";
    case "POST":
      return "post";
    default:
      return "get";
  }
};

/**
 * example
 * query('api/v1/account/:id', "GET", {}, [2]);
 * query('api/v1/account/:id', "POST", {}, {}, { id: 1 });
 * query('api/v1/account/:id', "GET");
 */

export default query;
