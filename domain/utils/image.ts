import { ImageManipulator } from "expo-image-manipulator";

export const resizeImage = async (picture: {
    uri: string;
    width: number;
    height: number;
    factor: number;
}) => {
    const width = picture.width / 4;

    const pictureResized = await ImageManipulator.manipulate(picture.uri)
        .resize({ width })
        .renderAsync();

    return await pictureResized.saveAsync({ base64: true, compress: 0.8 });
};