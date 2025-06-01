import { postPredict, PredictRequest } from "@/infraestructure/api/predict";
import { useMutation } from "@tanstack/react-query";

export const usePredict = () => {
    const predictMutation = useMutation({
        mutationKey: ['predict'],
        mutationFn: (params: PredictRequest) => postPredict(params),
    });

    return {
        predictMutation
    }
}