import * as FileSystem from 'expo-file-system';

/**
 * Mueve una imagen desde una ubicación temporal a una ubicación persistente
 * dentro del directorio de documentos de la app.
 * 
 * @param tempUri - URI temporal de la imagen (cache o galería)
 * @returns URI persistente que puede guardarse en el historial
 */
export async function persistImage(tempUri: string): Promise<string> {
    try {
        const fileName = tempUri.split('/').pop();
        if (!fileName) throw new Error('Nombre de archivo no válido');

        const folderPath = `${FileSystem.documentDirectory}history`;

        // Crear la carpeta si no existe
        const folderInfo = await FileSystem.getInfoAsync(folderPath);
        if (!folderInfo.exists) {
            await FileSystem.makeDirectoryAsync(folderPath, { intermediates: true });
        }

        const newUri = `${folderPath}/${fileName}`;

        // Mover archivo
        await FileSystem.moveAsync({
            from: tempUri,
            to: newUri,
        });

        return newUri;
    } catch (error) {
        console.error('Error al mover la imagen a almacenamiento persistente:', error);
        throw error;
    }
}
