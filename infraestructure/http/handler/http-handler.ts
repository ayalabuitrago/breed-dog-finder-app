import { AxiosResponse } from "axios";
import { HttpHandlerOptions } from "./types";

export const httpHandler = async <TRequest, TResponse>(
    {
        instance,
        endpoint,
        method = "GET",
        body,
        params,
        token,
        headers,
        abort,
    }: HttpHandlerOptions<TRequest>
) => {
    const response: AxiosResponse<TResponse> = await instance.request<TResponse>({
        url: endpoint,
        method,
        params,
        data: body,
        signal: abort?.signal,
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
    });

    return response.data
}