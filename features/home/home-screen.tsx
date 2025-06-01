import BdfIcon from "@/assets/icons/avatar.svg";
import GalleryIcon from "@/assets/icons/gallery.svg";
import HistoryIcon from "@/assets/icons/history.svg";
import RefreshIcon from "@/assets/icons/refresh.svg";
import { ActionButton } from "@/components/action-button";
import { PopUpMessage } from "@/components/popup-message";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useCallback, useEffect, useRef, useState } from "react";
import { Image, ImageBackground, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { homeScreenStyle } from "./styles/home-screen.styles";

interface HomeScreenProps {
  onLayout: () => void;
}

export function HomeScreen(props: Readonly<HomeScreenProps>) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const scale = useSharedValue(1);
  const top = useSharedValue(0);

  const camera = useRef<CameraView>(null);

  useEffect(() => {
    requestCameraPermission();
  }, [requestCameraPermission]);

  const resetCamera = useCallback(async () => {
    setPhotoUri(null);
    scale.value = withTiming(1, {
      duration: 300,
    });
    top.value = withTiming(0, {
      duration: 300,
    });
  }, [scale, top]);

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

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    top: top.value,
  }));

  const takePhoto = useCallback(async () => {
    if (!camera.current) return;

    // take picture
    const picture = await camera.current.takePictureAsync({
      base64: true,
      shutterSound: true,
      quality: 1,
    });

    // photo preview
    showPreviewPhoto({
      uri: picture.uri,
    });
  }, [showPreviewPhoto]);

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
              message={`La raza de tu mascota es “**Chaw Chaw**”\n##% de Precisión`}
            />
          </Animated.View>
        )}
      </View>
      <View style={homeScreenStyle.footer}>
        {!!photoUri && (
          <ActionButton size="lg" onPress={resetCamera} icon={RefreshIcon} />
        )}
        {!photoUri && (
          <>
            <ActionButton label="Historial" icon={HistoryIcon} />
            <ActionButton size="lg" onPress={takePhoto} />
            <ActionButton label="Importar" icon={GalleryIcon} />
          </>
        )}
      </View>
    </ImageBackground>
  );
}
