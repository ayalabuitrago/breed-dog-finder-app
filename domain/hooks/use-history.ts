import { guid } from "@/domain/utils/guid";
import { PredictResponse } from "@/infraestructure/api/predict";
import { persistImage } from "@/infraestructure/storage/image-storage";
import { HistoryItem, useHistoryStore } from "@/infraestructure/stores/history-store";
import { useCallback, useMemo } from "react";

export const useHistory = () => {
    const { history: h, add } = useHistoryStore();

    const addHistory = useCallback(async (params: { temp_uri: string } & PredictResponse) => {
        try {

            // Persist image in app storage
            const image_uri: string = await persistImage(params.temp_uri);

            const item: HistoryItem = {
                ...params,
                image_uri,
                id: guid(),
                date: new Date().toISOString(),
            }

            add(item);
        }
        catch (error) {
            console.error(error)
            throw new Error('Ocurrió un error al intentar guardar en el historial');
        }
    }, [add]);

    const history = useMemo(() => h.toReversed(), [h])

    return { addHistory, history }
}