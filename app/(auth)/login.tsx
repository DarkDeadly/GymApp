import { useSignInUser } from '@/Features/Authentication/api/useAuthentication';
import AuthInputs from '@/Features/Authentication/Components/AuthForm';
import AuthHeader from '@/Features/Authentication/Components/AuthHeader';
import ServerErrorMessage from '@/Features/Authentication/Components/ServerError';
import { LoginSchema } from '@/Features/Authentication/util/schema';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInLeft
} from 'react-native-reanimated';

const SocialAuth =
  [
    { name: 'logo-google', color: '#ea4335' },
    { name: 'logo-apple', color: '#000' },
    { name: 'logo-facebook', color: '#1877f2' },
  ]

type LoginFormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const form = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const [secureText, setSecureText] = useState(true);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const {handleLogin , serverError , fetchStatus} = useSignInUser()
  const router = useRouter()

  const submitForm = (data: LoginFormData) => {
    handleLogin({
      email : data.email ,
      password : data.password
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="px-6 bg-main-primaryBg"
      >
        <View className="flex-1 justify-center py-10">
          <AuthHeader
            headerTitle='Welcome Back!'
            headerDescription='Back to the grind. Back to greatness.'
          />
          {serverError && <ServerErrorMessage message={serverError}/>}
          {/* Email Input Field */}
          <Animated.View entering={FadeInUp.delay(400).duration(800)} className="mb-5">
            <Text className="text-gray-400 font-semibold mb-2 ml-1">Email Address</Text>

            <AuthInputs
              control={form.control}
              name={"email"}
              placeholder='example@email.com'
              iconName='mail-outline'
              keyboardType="email-address"
            />
            {form.formState.errors.email && (
              <Text className="text-red-500 text-xs mt-1 ml-2 font-medium">
                {form.formState.errors.email.message}
              </Text>
            )}

          </Animated.View>

          {/* Password Input Field */}
          <Animated.View entering={FadeInUp.delay(500).duration(800)} className="mb-5">
            <Text className="text-gray-400 font-semibold mb-2 ml-1">Password</Text>

            <AuthInputs
              name='password'
              control={form.control}
              isPassword={true}
              iconName='lock-closed-outline'
              iconVar={secureText}
              placeholder='******'
              onPress={() => setSecureText(!secureText)}
              keyboardType='default'
            />
            {form.formState.errors.password && (
              <Text className="text-red-500 text-xs mt-1 ml-2 font-medium">
                {form.formState.errors.password.message}
              </Text>
            )}
          </Animated.View>

          {/* Options Row */}
          <Animated.View
            entering={FadeInUp.delay(600).duration(800)}
            className="flex-row items-center justify-between mb-4"
          >
            <TouchableOpacity
              onPress={() => setStaySignedIn(!staySignedIn)}
              className="flex-row items-center"
              accessible={true}
              accessibilityRole="checkbox" //readability
              accessibilityState={{ checked: staySignedIn }}//maintainability
              accessibilityLabel="Stay signed in"//maintainability
            >
              <View className={`w-5 h-5 rounded border items-center justify-center ${staySignedIn ? 'bg-main-yellowGreen border-main-yellowGreen' : 'border-[#212121]'}`}>
                {staySignedIn && <Ionicons name="checkmark" size={14} color="white" />}
              </View>
              <Text className="text-gray-600 ml-2">Stay signed in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              accessible={true}
              accessibilityRole='link'
              accessibilityLabel="Forgot Password?"
              accessibilityHint="Opens the password reset form"
              onPress={() =>  router.push("/forgotPassword")}
            >
              <Text className="text-main-yellowGreen font-semibold">Forgot Password?</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Login Button */}
          <Animated.View entering={FadeInUp.delay(700).duration(800)}>
            <TouchableOpacity
              onPress={form.handleSubmit(submitForm)}
              activeOpacity={0.8}
              disabled={fetchStatus==="fetching"}
              accessibilityRole="button"
              accessibilityState={{ disabled: fetchStatus==="fetching" }}
              className={`${staySignedIn ? "bg-main-yellowGreen" : "bg-[#212121]"} py-4 rounded-2xl shadow-lg shadow-white items-center my-4`}
            >
              {fetchStatus==="fetching" ? <ActivityIndicator /> : <Text className={`${staySignedIn ? "text-black" : "text-white"} text-lg font-bold uppercase tracking-wider`}>
                Sign In
              </Text>}

            </TouchableOpacity>
          </Animated.View>

          {/* Divider */}
          <Animated.View entering={FadeInDown.delay(800).duration(800)} className="flex-row items-center mt-4 mb-8">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-gray-400 font-medium text-xs">OR CONTINUE WITH</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </Animated.View>

          {/* Social Auth Buttons */}
          <Animated.View
            entering={SlideInLeft.delay(900).duration(800)}
            className="flex-row justify-center gap-6 "
          >
            {SocialAuth.map((icon, index) => (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                className="w-16 h-16 rounded-2xl bg-[#212121] items-center justify-center border border-[#212121] shadow-sm active:scale-95 "
              >
                <Ionicons name={icon.name as any} size={28} color={icon.color} />
              </TouchableOpacity>
            ))}
          </Animated.View>
          <Text className='text-center mt-10 text-white text-base'>Dont you have an Account ?
            <Text className='underline text-main-yellowGreen active:text-green-500'
              onPress={() => router.push('/(auth)/register')}>
              Sign Up
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginScreen