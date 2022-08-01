import { Api } from '@merchant-workspace/api-interfaces';
import { apiClient } from './apiClient';

type QueryObject = Record<string, unknown>;
type ContainsKey<T, K extends string | number, ELSE> = T extends {
  [key in K]: any;
}
  ? T[K]
  : ELSE;

const parseQueryParams = (queryObject?: QueryObject): string => {
  if (!queryObject) {
    return '';
  }

  const entries = Object.entries(queryObject);

  if (!entries.length) {
    return '';
  }

  const queryArray: string[] = [];

  for (const [key, value] of entries) {
    queryArray.push(`${key}=${value}`);
  }

  return `?${queryArray.join('&')}`;
};

async function query<URL extends keyof Api>(
  url: URL
): Promise<Api[URL]['response']>;
async function query<URL extends keyof Api>(
  url: URL,
  queryParams: ContainsKey<Api[URL], 'queryParams', QueryObject>
): Promise<Api[URL]['response']>;
async function query<URL extends keyof Api>(
  url: URL,
  queryParams: ContainsKey<Api[URL], 'queryParams', QueryObject>,
  params: ContainsKey<Api[URL], 'params', never>
): Promise<Api[URL]['response']>;

async function query<URL extends keyof Api>(
  url: URL,
  queryParams?: ContainsKey<Api[URL], 'queryParams', QueryObject>,
  params?: ContainsKey<Api[URL], 'params', never>
): Promise<Api[URL]['response']> {
  const query = parseQueryParams(queryParams);
  const fullUrl = `${url}${query}`;

  // TODO add try / catch, get rid of casting

  if (!params || (params && !params.length)) {
    return (await apiClient.get(fullUrl)).data as Api[URL]['response'];
  }

  const regexp = /:[a-zA-Z\d]+/gm;
  let i = 0;

  for (const param of fullUrl.matchAll(regexp)) {
    const valueToReplace = param[0];
    const destinedValue = params[i];
    fullUrl.replace(valueToReplace, `${destinedValue}`);
    i++;
  }

  return (await apiClient.get(fullUrl)).data as Api[URL]['response']; // TODO get rid of casting
}

/**
 * example
 * query('api/v1/account/:id', {}, [2]);
 */

export default query;
