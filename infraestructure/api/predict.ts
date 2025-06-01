
import { httpHandler } from "@/infraestructure/http/handler/http-handler";
import axiosInstance from "@/infraestructure/http/instance/bdf-axios-instance";

export interface PredictRequest {
    base64: string,
}

export interface PredictResponse {
    accuracy: number,
    breed_dog: string,
    unreliable: boolean
}

export const postPredict = async (data: PredictRequest) => {
    const response = await httpHandler<PredictRequest, PredictResponse>({
        instance: axiosInstance,
        endpoint: '/predict',
        method: 'POST',
        body: data,
    })

    return response;
}