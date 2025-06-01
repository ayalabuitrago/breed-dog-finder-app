import { AxiosInstance, Method } from 'axios';

export interface HttpHandlerOptions<TRequest> {
    instance: AxiosInstance,
    endpoint: `/${string}`,
    method?: Method,
    body?: TRequest,
    params?: Record<string, any>,
    token?: string,
    headers?: Record<string, string>,
    abort?: AbortController
}

