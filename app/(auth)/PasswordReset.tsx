import { useResetPassword } from "@/Features/Authentication/api/useAuthentication";
import AuthInputs from '@/Features/Authentication/Components/AuthForm';
import { OtpInput } from '@/Features/Authentication/Components/OtpVerif';
import ServerErrorMessage from "@/Features/Authentication/Components/ServerError";
import { PasswordResetSchema } from '@/Features/Authentication/util/schema';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

type resetPasswordData = {
  code : string , 
  newPassword: string
}

export default function ResetPassword() {
    const form = useForm<resetPasswordData>({
        resolver : yupResolver(PasswordResetSchema),
        defaultValues : {
            code : "",
            newPassword:""
        }
    })
  const {fetchStatus , handlePasswordReset , serverError} = useResetPassword()
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleUpdatePassword =  (data : resetPasswordData) => {
    handlePasswordReset({
      code : data.code , 
      newPassword : data.newPassword
    })
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-main-primaryBg px-6 pt-20"
    >
      <TouchableOpacity 
        onPress={() => router.back()} 
        className="mb-8 w-10 h-10 items-center justify-center rounded-full bg-main-customGray"
      >
        <Ionicons name="arrow-back" size={20} color="white" />
      </TouchableOpacity>

      <Animated.View entering={FadeInDown.duration(600).delay(200)}>
        <Text className="text-4xl font-bold text-white tracking-tight" style={{ fontFamily: 'adver-title' }}>
          Reset Password
        </Text>
        <Text className="text-zinc-400 mt-2 text-lg">
          Enter the 6-digit code sent to your email and choose a secure new password.
        </Text>
      </Animated.View>

      {serverError && <ServerErrorMessage message={serverError} />}

      <View className="mb-5 mt-2 space-y-4">
        {/* 6-Digit Code Input */}
        <Animated.View entering={FadeInDown.duration(600).delay(400)} className="mb-5">
          <Text className="text-gray-400 font-semibold mb-2 ml-1">Verification Code</Text>
    
          <OtpInput 
          control={form.control}
          error={!!form.formState.errors.code}
          
          />
            {form.formState.errors.code && (
                              <Text className="text-red-500 text-xs mt-1 ml-2 font-medium">
                                  {form.formState.errors.code.message}
                              </Text>
                          )}
        </Animated.View>

        {/* New Password Input */}
        <Animated.View entering={FadeInDown.duration(600).delay(600)} className="mb-5">
            <Text className="text-gray-400 font-semibold mb-2 ml-1">New Password</Text>
            <AuthInputs
            control={form.control}
            isPassword = {true}
            name='newPassword'
            iconName="lock-closed-sharp"
            keyboardType='default'
            placeholder='••••••••'
            iconVar={showPassword}
            onPress={() => setShowPassword(!showPassword)}
            />
              {form.formState.errors.newPassword && (
                                <Text className="text-red-500 text-xs mt-1 ml-2 font-medium">
                                    {form.formState.errors.newPassword.message}
                                </Text>
                            )}
         
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(800)}>
          <TouchableOpacity 
            onPress={form.handleSubmit(handleUpdatePassword)}
            disabled={fetchStatus == 'fetching'}
            className={`mt-6 h-14 rounded-2xl items-center justify-center bg-main-yellowGreen `}
          >
            {fetchStatus =="fetching" ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text className="text-black font-bold text-lg">Update Password</Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}


/*
 */