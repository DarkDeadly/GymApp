import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

const Index = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="#ADFF2F" /> 
      </View>
    );
  }

  // If NOT signed in, go to Auth
  if (!isSignedIn) {
    return <Redirect href="/(auth)" />;
  }


};