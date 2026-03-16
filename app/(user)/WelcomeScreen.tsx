// screens/OnboardingWelcome.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// You can later extract this to a constants file or theme
const COLORS = {
  primary: '#00D4FF',      // electric cyan – very popular in fitness apps 2025+
  primaryDark: '#00A3CC',
  accent: '#FF3366',        // vibrant pink/magenta accent
  text: '#FFFFFF',
  textSecondary: '#E0E0E0',
  overlayStart: 'rgba(0, 0, 0, 0.65)',
  overlayEnd: 'rgba(0, 0, 0, 1)',
};

export default function OnboardingWelcome() {
  const insets = useSafeAreaInsets();
  const router = useRouter()

  return (
    <ImageBackground
      source={require("@/assets/images/HomePage.jpg")}
      className="flex-1"
      resizeMode="cover"
    >
      <LinearGradient
        // Dark overlay – stronger at bottom (more readable button area)
        colors={[COLORS.overlayStart, COLORS.overlayEnd]}
        className="flex-1"
      >
          <View
            className="flex-1 px-6 pb-12"
            style={{ paddingTop: insets.top + 20 }}
          >
            {/* Top / Center content */}
            <View className="flex-1 justify-end mb-5">
              <Text
                className="text-4xl font-bold text-white tracking-tight  mb-3"
                style={{ fontFamily: 'Inter_700Bold' }} // or Manrope, Roboto-Bold, etc.
              >
                Customize Your Journey
              </Text>

              <Text className="text-lg text-gray-200  max-w-[320px] leading-6">
                Set your goals, training style  so we can build the perfect plan for you
              </Text>
            </View>

            {/* Bottom CTA area */}
            <View className="items-center">
              <TouchableOpacity
                onPress={() => router.push("/(user)/ageCustom")}
                activeOpacity={0.8}
                className="w-full max-w-[340px] bg-main-yellowGreen py-5 rounded-2xl items-center shadow-2xl "
              >
              
                  <Text className="text-black text-xl font-semibold tracking-wide">
                    Get Started
                  </Text>
              </TouchableOpacity>

              {/* Optional tiny legal / skip link */}
              <Text className="text-gray-400 text-sm mt-6 opacity-80">
                We'll guide you step by step
              </Text>
            </View>
          </View>
      </LinearGradient>
     
    </ImageBackground>
    
  );
}