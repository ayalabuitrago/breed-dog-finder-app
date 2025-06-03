import { postPredict, PredictRequest, PredictResponse } from "@/infraestructure/api/predict";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { resizeImage } from "../utils/image";

export const usePredict = () => {
    const [predictResult, setPredictResult] = useState("");

    const predictMutation = useMutation({
        mutationKey: ['predict'],
        mutationFn: (params: PredictRequest) => postPredict(params),
    });


    const resetPredict = () => {
        setPredictResult("");
    }

    const predict = useCallback(async (picture: {
        uri: string,
        height: number,
        width: number,
    }): Promise<PredictResponse & { image_uri: string } | null> => {
        try {
            const { base64, uri } = await resizeImage({
                uri: picture.uri,
                height: picture.height,
                width: picture.width,
                factor: 4,
            });

            if (!base64) throw new Error('Ocurrión un error inesperado');

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

            return {
                ...res,
                image_uri: uri
            };
        }
        catch (error) {
            setPredictResult(
                (error as Error)?.message ?? "Ocurrió un error inesperado"
            );
            return null;
        }

    }, [predictMutation]);

    return {
        predictResult,
        resetPredict,
        predict,
    }
}