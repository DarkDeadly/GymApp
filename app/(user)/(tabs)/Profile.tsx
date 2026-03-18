import { useCurrentUser } from '@/Features/Authentication/api/useAuthentication';
import { useClerk, useUser } from '@clerk/expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';


const ProfileScreen = () => {
  const {isLoading , currentUser} = useCurrentUser()
  const { signOut } = useClerk()
  const router = useRouter()
  const auth = useUser()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Best Practice: replace to root to trigger app/index.tsx logic
      router.replace("/(auth)/main") 
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (isLoading || !auth.isLoaded) {
     return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
            <ActivityIndicator size="large" color="#ADFF2F" /> 
          </View>
        );
  }

  return (
    <SafeAreaView className="flex-1 bg-main-primaryBg">
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 py-4">
          <TouchableOpacity className="p-2 bg-main-customGray rounded-full">
            <Ionicons name="arrow-back" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Profile</Text>
          <View style={{ width: 40 }} /> 
        </View>

        {/* Profile Image with Gradient Ring */}
        <View className="items-center mt-4">
          <View className="relative">
            
              <View className="bg-white p-1 rounded-full">
                <Image
                  source={{ uri: auth.user?.imageUrl }} // Replace with user image
                  className="w-32 h-32 rounded-full"
                />
              </View>
           
          </View>

          <Text className="text-2xl font-bold mt-6 text-white">{currentUser?.fullName}</Text>
          <Text className="text-gray-400 text-sm">{currentUser?.email}</Text>
        </View>

        {/* Metrics Grid */}
        <View className="flex-row flex-wrap px-6 mt-8 justify-between">
          <MetricCard 
            label="Gender" 
            value={currentUser?.gender} 
            icon="gender-male" 
            delay={100} 
          />
          <MetricCard 
            label="Age" 
            value={currentUser?.age} 
            icon="calendar-month" 
            delay={200} 
          />
          <MetricCard 
            label="Weight" 
            value={currentUser?.weight} 
            icon="weight-kilogram" 
            delay={300} 
          />
          <MetricCard 
            label="Height" 
            value={currentUser?.height} 
            icon="human-male-height" 
            delay={400} 
          />
        </View>

        {/* Action List */}
        <View className="px-6 mt-8 gap-y-4">
          <ActionItem icon="settings" title="Modify Profile" delay={500} bgColor='bg-main-yellowGreen' 
          onPress = {() => console.log("hello everyone")}
          />
          <ActionItem icon="exit-outline" title="LogOut" delay={500} bgColor='bg-main-yellowGreen' 
          onPress = {handleSignOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper Component for the 4 small cards
const MetricCard = ({ label, value, icon, delay }: any) => (
  <Animated.View 
    entering={FadeInDown.delay(delay).springify()}
    className="w-[47%] bg-main-customGray p-4 rounded-3xl mb-4 border border-gray-100 shadow-sm"
  >
    <View className="flex-row items-center mb-1">
      <View className="bg-main-customGray p-2 rounded-xl mr-2 shadow-sm">
        <MaterialCommunityIcons name={icon} size={18} color="white" />
      </View>
      <Text className="text-white text-xs font-medium">{label}</Text>
    </View>
    <Text className="text-lg font-bold ml-1 text-white">{value}</Text>
  </Animated.View>
);

// Helper Component for the list items
const ActionItem = ({ icon, title, delay , bgColor , onPress}: any) => (
  <Animated.View entering={FadeInRight.delay(delay).duration(500)}>
    <TouchableOpacity 
    className={`flex-row items-center ${bgColor} p-5 rounded-3xl border ${bgColor}`}
    onPress={onPress}
    >
      <View className={`${bgColor} p-2 rounded-xl mr-4`}>
        <Ionicons name={icon} size={22} color="black" />
      </View>
      <Text className="flex-1 text-base font-semibold">{title}</Text>
      <Ionicons name="chevron-forward" size={20} color="#black" />
    </TouchableOpacity>
  </Animated.View>
);

export default ProfileScreen;
