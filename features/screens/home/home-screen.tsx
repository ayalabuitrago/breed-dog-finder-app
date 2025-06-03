import BdfIcon from "@/assets/icons/avatar.svg";
import GalleryIcon from "@/assets/icons/gallery.svg";
import HistoryIcon from "@/assets/icons/history.svg";
import RefreshIcon from "@/assets/icons/refresh.svg";
import { usePredict } from "@/domain/hooks/predict";
import { useHistory } from "@/domain/hooks/use-history";
import { ActionButton } from "@/features/components/action-button";
import { PopUpMessage } from "@/features/components/popup-message";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, ImageBackground, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { homeScreenStyle } from "./styles";

interface HomeScreenProps {
  onLayout: () => void;
}

export function HomeScreen(props: Readonly<HomeScreenProps>) {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const { predictResult, predict, resetPredict } = usePredict();
  const { addHistory } = useHistory();

  const camera = useRef<CameraView>(null);
  
  const scale = useSharedValue(1);
  const top = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    top: top.value,
  }));


  useEffect(() => {
    requestCameraPermission();
  }, [requestCameraPermission]);

  const retry = useCallback(async () => {
    setPhotoUri(null);
    resetPredict();
    scale.value = withTiming(1, {
      duration: 300,
    });
    top.value = withTiming(0, {
      duration: 300,
    });
  }, [resetPredict, scale, top]);

  const showPreviewPhoto = useCallback(
    (params: { uri: string }) => {
      setPhotoUri(params.uri);
      scale.value = withTiming(0.85, {
        duration: 300,
      });
      top.value = withTiming(-50, {
        duration: 300,
      });
    },
    [scale, top]
  );

  const takePhoto = useCallback(async () => {
    if (!camera.current) return;

    setProcessing(true);

    const picture = await camera.current.takePictureAsync({
      base64: true,
      shutterSound: true,
      quality: 1,
    });

    if (!picture.base64) return;

    showPreviewPhoto({
      uri: picture.uri,
    });

    const predictRes = await predict({
      uri: picture.uri,
      height: picture.height,
      width: picture.width,
    });

    if (predictRes) {
      addHistory({
        ...predictRes,
        temp_uri: predictRes.image_uri,
      });
    }

    setProcessing(false);
  }, [predict, showPreviewPhoto, addHistory]);

  const pickImage = useCallback(async () => {
    setProcessing(false);

    const pictures = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    const picture = pictures.assets?.at(0);

    if (!picture?.base64) return;

    showPreviewPhoto({
      uri: picture.uri,
    });

    const predictRes = await predict({
      uri: picture.uri,
      height: picture.height,
      width: picture.width,
    });

    if (predictRes) {
      addHistory({
        ...predictRes,
        temp_uri: predictRes.image_uri,
      });
    }

    setProcessing(false);
  }, [addHistory, predict, showPreviewPhoto]);

  return (
    <ImageBackground
      style={homeScreenStyle.container}
      source={require("@/assets/images/background.png")}
      onLayout={props.onLayout}
    >
      <View style={homeScreenStyle.content}>
        <Animated.View
          style={[homeScreenStyle.cameraContainer, animatedStyles]}
        >
          {photoUri && (
            <Image source={{ uri: photoUri }} style={homeScreenStyle.image} />
          )}
          {cameraPermission?.granted && (
            <CameraView ref={camera} style={homeScreenStyle.camera} />
          )}
        </Animated.View>
        {!!photoUri && (
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(300)}
            style={homeScreenStyle.messageContainer}
          >
            <PopUpMessage
              avatar={BdfIcon}
              message={predictResult}
              loading={processing}
            />
          </Animated.View>
        )}
      </View>
      <View style={homeScreenStyle.footer}>
        {!!photoUri && (
          <ActionButton size="lg" onPress={retry} icon={RefreshIcon} />
        )}
        {!photoUri && (
          <>
            <Link href={"/history"} asChild>
              <ActionButton label="Historial" icon={HistoryIcon} />
            </Link>
            <ActionButton size="lg" onPress={takePhoto} />
            <ActionButton
              label="Importar"
              icon={GalleryIcon}
              onPress={pickImage}
            />
          </>
        )}
      </View>
    </ImageBackground>
  );
}
