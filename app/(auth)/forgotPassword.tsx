import AuthInputs from '@/Features/Authentication/Components/AuthForm';
import { EmailPasswordResetSchema } from '@/Features/Authentication/util/schema';
import { Ionicons } from '@expo/vector-icons'; // Assuming you have Expo Vector Icons
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function ForgotPassword() {
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: yupResolver(EmailPasswordResetSchema),
        defaultValues: {
            email: ""
        }
    })

    const router = useRouter();

    const handleReset =  () => {
       startTransition(async() => {
         router.push("/PasswordReset")
       })
    };

    return (
        <View className="flex-1 bg-main-primaryBg px-6 pt-20 ">
            {/* Back Button */}
            <TouchableOpacity
                onPress={() => router.back()}
                className="mb-8 w-10 h-10 items-center justify-center rounded-full bg-zinc-900"
            >
                <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>

            <Animated.View entering={FadeInDown.duration(600).delay(200)}>
                <Text className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: 'adver-title' }}>
                    Forgot Password
                </Text>
                <Text className="text-zinc-400 mt-2 text-lg leading-6">
                    Enter your email address and we'll send you a link to reset your password.
                </Text>
            </Animated.View>

            <Animated.View
                entering={FadeInDown.duration(600).delay(400)}
                className="mt-10"
            >
                <Text className="text-zinc-500 text-xs font-bold uppercase mb-2">Email Address</Text>

                <AuthInputs
                    placeholder='example@email.com'
                    control={form.control}
                    name='email'
                    iconName="mail-unread-sharp"
                    isPassword={false}
                    keyboardType="email-address"

                />


                <TouchableOpacity
                    onPress={form.handleSubmit(handleReset)}
                    disabled={isPending}
                    className="mt-6 h-14 rounded-2xl items-center justify-center bg-main-yellowGreen"
                        
                >
                    {isPending ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text className="text-black font-bold text-lg">Send Reset Code</Text>
                    )}
                </TouchableOpacity>
            </Animated.View>

            <Animated.View
                entering={FadeInUp.duration(600).delay(600)}
                className="mt-auto mb-10 items-center"
            >
                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                    <Text className="text-zinc-500">
                        Remember it? <Text className="text-white font-bold" >Back to Login</Text>
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}