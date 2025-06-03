import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  DimensionValue,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface SkeletonProps {
  height: DimensionValue;
  width: DimensionValue;
  radius: number;
  backgroundColor?: string;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export default function Skeleton(props: Readonly<SkeletonProps>) {
  const {
    height,
    width,
    radius,
    backgroundColor = '#FFFFFF' + '20',
  } = props;

  const translateX = useSharedValue(-400);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(400, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={{
        width,
        height,
        backgroundColor,
        borderRadius: radius,
        overflow: "hidden",
      }}
    >
      <AnimatedLinearGradient
        colors={
          backgroundColor === '#FFFFFF' + '20'
            ? ["transparent", '#FFFFFF' + '15', "transparent"]
            : ['#FFFFFF' + '10', '#13151C' + '10', '#FFFFFF' + '10']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          {
            borderRadius: radius,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          animatedStyle,
        ]}
      />
    </View>
  );
}
