import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from "react-native-reanimated";

interface onBoardingProps {
    title: string,
    description: string,
    imagepath: ImageSourcePropType,
    lastPage: boolean
}

const Onboarding = ({ title, description, imagepath, lastPage }: onBoardingProps) => {
    const router = useRouter()
    return (
        <ImageBackground
            source={imagepath}
            className="flex-1 w-full h-full"
            resizeMode="cover"
        >
            {/* Dark overlay + gradient */}
            <LinearGradient
                colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.65)', 'rgba(0,0,0,0.95)']}
                locations={[0, 0.6, 1]}
                className="flex-1 justify-end"
            >
                {/* Content container */}
                <Animated.View entering={FadeInDown.delay(900)} className="px-6 pb-12 pt-20">
                    {/* Title */}
                    <Animated.Text className="text-white text-5xl  mb-4 leading-tight"
                        style={{ fontFamily: "adver-title" }}>
                        {title}
                    </Animated.Text>

                    {/* Description */}
                    <Animated.Text className="text-gray-300 text-lg mb-10 leading-relaxed">
                        {description}
                    </Animated.Text>
                    {
                        lastPage && (
                            <View className="gap-4">
                                <TouchableOpacity className="bg-white py-4 rounded-2xl items-center"
                                onPress={() => router.push("/(auth)/register")}
                                >
                                    <Text className="text-black font-semibold text-lg">Get Started</Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="py-4 rounded-2xl items-center border border-white/30"
                                onPress={() => router.push("/(auth)/login")}
                                >
                                    <Text className="text-white font-semibold text-lg">Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }

                </Animated.View>
            </LinearGradient>
        </ImageBackground>
    )
}

export default Onboarding

/*
          <View className="gap-4">
            <TouchableOpacity className="bg-white py-4 rounded-2xl items-center">
              <Text className="text-black font-semibold text-lg">Get Started</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="py-4 rounded-2xl items-center border border-white/30">
              <Text className="text-white font-semibold text-lg">Sign In</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row justify-center gap-2 mt-8">
            <View className="w-8 h-1 bg-white rounded-full" />
            <View className="w-2 h-1 bg-white/40 rounded-full" />
            <View className="w-2 h-1 bg-white/40 rounded-full" />
          </View>
*/