import { useCurrentUser } from "@/Features/Authentication/api/useAuthentication";
import ConvexClientProvider from "@/Features/Authentication/util/ConvexClientProvider";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { Oswald_700Bold } from "@expo-google-fonts/oswald";
import { ConvexReactClient, useConvexAuth } from "convex/react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import "../global.css";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL);

const Root = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [fontsLoaded] = useFonts({ "adver-title": Oswald_700Bold });
  const {currentUser , isLoading : userLoading} = useCurrentUser()

  // ONLY show loader if things are still initializing
  if (!fontsLoaded || isLoading || userLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size={"large"} color="#fff" />
      </View>
    );
  }
  

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />    
      <Stack.Protected guard= {!isAuthenticated || !currentUser} >
        <Stack.Screen name="(auth)" />  
      </Stack.Protected>
      <Stack.Protected guard = {isAuthenticated && currentUser?.role === "admin"}>
        <Stack.Screen name="(admin)" />
      </Stack.Protected>
      <Stack.Protected guard = {isAuthenticated && currentUser?.role === "user"}>
        <Stack.Screen name="(user)" />
      </Stack.Protected>
      <Stack.Protected guard = {isAuthenticated && currentUser?.role === "subscriber"}>
        <Stack.Screen name="(subscriber)" />
      </Stack.Protected>
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