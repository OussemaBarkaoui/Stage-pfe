import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgotPassword" options={{ presentation: "modal" }} />
      <Stack.Screen name="otpVerification" />
      <Stack.Screen name="changePassword" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="product/[id]"
        options={{
          presentation: "transparentModal",
          animation: "slide_from_bottom",
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: false,
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </Stack>
  );
}