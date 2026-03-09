import ConvexClientProvider from "@/Features/Authentication/util/ConvexClientProvider";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Oswald_700Bold } from "@expo-google-fonts/oswald";
import { ConvexReactClient } from "convex/react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "../global.css";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL);

const Root = () => {
  const [fontsLoaded] = useFonts({ "adver-title": Oswald_700Bold });

  // ONLY show loader if things are still initializing
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size={"large"} color="#fff" />
      </View>
    );
  }
  

  return (
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen name="index" />    
        <Stack.Screen name="(auth)/main" />  
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="(user)" />
        <Stack.Screen name="(subscriber)" />
    </Stack>
  );
};
export default function RootLayout() {
  return (
    <ClerkProvider 
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} 
      tokenCache={tokenCache}
    >
      <ConvexClientProvider >
          <Root />
      </ConvexClientProvider>
    </ClerkProvider>
  );
}