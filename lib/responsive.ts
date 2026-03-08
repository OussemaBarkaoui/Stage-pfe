import { Dimensions, Platform, ScaledSize } from "react-native";

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

let screen: ScaledSize = Dimensions.get("window");

Dimensions.addEventListener("change", ({ window }) => {
  screen = window;
});

const horizontalScale = (size: number): number => (screen.width / guidelineBaseWidth) * size;
const verticalScale = (size: number): number => (screen.height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5): number => size + (horizontalScale(size) - size) * factor;
const responsiveFontSize = (size: number): number => moderateScale(size, Platform.OS === "ios" ? 0.45 : 0.5);
const vw = (percentage: number): number => (screen.width * percentage) / 100;
const vh = (screenPercentage: number): number => (screen.height * screenPercentage) / 100;

export { horizontalScale as scale, verticalScale, moderateScale, responsiveFontSize, vw, vh };
