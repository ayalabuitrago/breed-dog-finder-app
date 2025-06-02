import { postPredict, PredictRequest } from "@/infraestructure/api/predict";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export const usePredict = () => {
    const [predictResult, setPredictResult] = useState("");

    const predictMutation = useMutation({
        mutationKey: ['predict'],
        mutationFn: (params: PredictRequest) => postPredict(params),
    });

    const resetPredict = () => {
        setPredictResult("");
    }

    const predict = useCallback(async (base64: string) => {
        try {
            const res = await predictMutation.mutateAsync({
                base64,
            });

            if (res.unreliable) {
                setPredictResult(
                    "Lo siento no he podido identificar la raza de tu mascota. Inténtalo de nuevo."
                );
            } else {
                const breedDog = res.breed_dog
                    .replaceAll("_", " ")
                setPredictResult(
                    `La raza de tu mascota es “**${breedDog}**”\n${res.accuracy}% de Precisión`
                );
            }
        }
        catch (error) {
            setPredictResult(
                (error as Error)?.message ?? "Ocurrió un error inesperado"
            );
        }

    }, [predictMutation]);

    return {
        predictResult,
        resetPredict,
        predict,
    }
}