import { CondOperator } from '@dataui/crud-request';
import omitBy from 'lodash.omitby';
import { fetchUtils } from 'react-admin';

import type {
  DataProvider as AdminDataProvider,
  CreateParams,
  CreateResult,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'react-admin';

class DataProvider implements AdminDataProvider {
  private apiUrl: string;
  private httpClient: typeof fetchUtils.fetchJson;

  constructor(apiUrl: string, httpClient = fetchUtils.fetchJson) {
    this.apiUrl = apiUrl;
    this.httpClient = httpClient;
  }

  private countDiff = (
    o1: Record<string, string>,
    o2: Record<string, string>
  ): Record<string, unknown> => omitBy(o1, (v: string, k: string | number) => o2[k] === v);

  private composeFilter = (paramsFilter: string): string => {
    const flatFilter: Record<string, string> = fetchUtils.flattenObject(paramsFilter);
    return Object.keys(flatFilter)
      .map((key) => {
        const splitKey: string[] = key.split(/\|\||:/);
        const uuidRegex: RegExp =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/gi;

        let field: string = splitKey[0];
        let ops: string = splitKey[1];
        if (!ops) {
          if (
            typeof flatFilter[key] === 'boolean' ||
            typeof flatFilter[key] === 'number' ||
            (typeof flatFilter[key] === 'string' && flatFilter[key].match(/^\d+$/)) ||
            flatFilter[key].match(uuidRegex)
          ) {
            ops = CondOperator.EQUALS;
          } else {
            ops = CondOperator.CONTAINS_LOW;
          }
        }

        if (field.startsWith('_') && field.includes('.')) {
          field = field.split(/\.(.+)/)[1];
        }
        return `filter=${field}||${ops}||${flatFilter[key]}`;
      })
      .join('&');
  };

  private composeQueryParams = (params: GetListParams): string => {
    const queryParams: { [key: string]: string | number } = {};

    if (params.pagination) {
      queryParams.limit = params.pagination.perPage;
      queryParams.offset = (params.pagination.page - 1) * params.pagination.perPage;
    }

    if (params.sort) {
      queryParams.sort = `${params.sort.field},${params.sort.order}`;
    }

    const filterString: string = this.composeFilter(params.filter || {});
    const queryString: string = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return filterString ? `${queryString}&${filterString}` : queryString;
  };

  public getList = async (resource: string, params: GetListParams): Promise<GetListResult> => {
    const queryStringParams: string = this.composeQueryParams(params);

    const url: string = `${this.apiUrl}/${resource}?${queryStringParams}`;
    const { json } = await this.httpClient(url);
    return {
      data: json.data,
      total: json.total,
    };
  };

  public getOne = async (resource: string, params: GetOneParams): Promise<GetOneResult> => {
    const { json } = await this.httpClient(`${this.apiUrl}/${resource}/${params.id}`);
    return { data: json };
  };

  public getMany = async (resource: string, params: GetManyParams): Promise<GetManyResult> => {
    const query: string = `filter=id||${CondOperator.IN}||${params.ids.join(',')}`;
    const url: string = `${this.apiUrl}/${resource}?${query}`;

    const { json } = await this.httpClient(url);
    return { data: json.data || json };
  };

  public getManyReference = async (
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult> => {
    const queryParams: string = this.composeQueryParams(params);
    const queryStringParams: string =
      queryParams + `&filter=${params.target}||${CondOperator.EQUALS}||${params.id}`;

    const url: string = `${this.apiUrl}/${resource}?${queryStringParams}`;
    const { json } = await this.httpClient(url);
    return {
      data: json.data,
      total: json.total,
    };
  };

  public update = async (resource: string, params: UpdateParams): Promise<UpdateResult> => {
    const data: Record<string, unknown> = this.countDiff(params.data, params.previousData);
    const { json } = await this.httpClient(`${this.apiUrl}/${resource}/${params.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return { data: json };
  };

  public updateMany = async (
    resource: string,
    params: UpdateManyParams
  ): Promise<UpdateManyResult> => {
    const responses: Record<string, unknown>[] = await Promise.all(
      params.ids.map(async (id) => {
        const { json } = await this.httpClient(`${this.apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
        });
        return json;
      })
    );

    return {
      data: responses,
    };
  };

  public create = async (resource: string, params: CreateParams): Promise<CreateResult> => {
    const { json } = await this.httpClient(`${this.apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
    });
    return {
      data: { ...json },
    };
  };

  public delete = async (resource: string, params: DeleteParams): Promise<DeleteResult> => {
    const { json } = await this.httpClient(`${this.apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    });
    return { data: { ...json, id: params.id } };
  };

  public deleteMany = async (
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> => {
    const responses: Record<string, unknown>[] = await Promise.all(
      params.ids.map(async (id) => {
        const { json } = await this.httpClient(`${this.apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
        });
        return json;
      })
    );
    return { data: responses };
  };
}

const dataProvider = (apiUrl: string, httpClient = fetchUtils.fetchJson) =>
  new DataProvider(apiUrl, httpClient);
export default dataProvider;
