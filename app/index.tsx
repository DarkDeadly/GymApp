import { useCurrentUser } from "@/Features/Authentication/api/useAuthentication";
import { useConvexAuth } from "convex/react";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

 const Index = () => {
  //const { isLoaded, isSignedIn } = useAuth();
  const {isAuthenticated , isLoading : authLoading} = useConvexAuth()
  const { currentUser , isLoading } = useCurrentUser();

  if (authLoading || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#ADFF2F" /> 
      </View>
    );
  }

  // If NOT signed in, go to Auth
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/main" />;
  }
  if (isAuthenticated && currentUser?.role === "admin") {
    return <Redirect href={'/(admin)'} />
  }
   if (isAuthenticated && currentUser?.role === "user") {
    return <Redirect href={"/(user)/WelcomeScreen"} />
  }
   if (isAuthenticated &&currentUser?.role === "subscriber") {
    return <Redirect href={'/(subscriber)'} />
  }



};

export default Index