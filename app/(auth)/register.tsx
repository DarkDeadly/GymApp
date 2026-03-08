import { useRegisterUser } from "@/Features/Authentication/api/useAuthentication";
import AuthInputs from '@/Features/Authentication/Components/AuthForm';
import AuthHeader from '@/Features/Authentication/Components/AuthHeader';
import ErrorMessage from "@/Features/Authentication/Components/ErrorMessage";
import ServerErrorMessage from "@/Features/Authentication/Components/ServerError";
import { RegisterSchema } from '@/Features/Authentication/util/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
type RegisterFormData = {
  EmailAddress: string,
  Password: string,
  confirmPassword: string
}

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  console.log(process.env.CLERK_FRONTEND_API_URL)
  const [secureText, setSecureText] = useState(true);
  const [securePassText, setsecurePassText] = useState(true);
  const form = useForm<RegisterFormData>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: {
      EmailAddress: "",
      Password: "",
      confirmPassword: ""
    }
  });

  const {handleRegister , fetchStatus , ServerError} = useRegisterUser()

  const handleSignup =  (data: RegisterFormData) => {
    handleRegister({
      email : data.EmailAddress ,
      password : data.Password
    })
  };

  return (
    // 1. SafeAreaView wraps the background and handles the notch
    <SafeAreaView style={{ flex: 1 }} className="bg-main-primaryBg" edges={['top', 'bottom']}>
      
      {/* 2. KeyboardAvoidingView with dynamic offset for iOS */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top + 40 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ 
            flexGrow: 1,
            paddingBottom: insets.bottom + 40 // Extra space so bottom inputs aren't tight
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          className="px-6"
        >
          <View className="flex-1 justify-center py-6">
            <AuthHeader
              headerTitle='Join the Grind'
              headerDescription='Rather than one day, let’s go with day one.'
            />

            {ServerError && <ServerErrorMessage message={ServerError} />}

            {/* Email Input */}
            <Animated.View entering={FadeInUp.delay(400).duration(800)} className="mb-5">
              <Text className="text-gray-400 font-semibold mb-2 ml-1">Email Address</Text>
              <AuthInputs
                keyboardType="email-address"
                control={form.control}
                isPassword={false}
                iconName='mail-outline'
                placeholder='name@example.com'
                name="EmailAddress"
              />
              {form.formState.errors.EmailAddress && (
                <ErrorMessage errorMessage={form.formState.errors.EmailAddress?.message} />
              )}
            </Animated.View>

            {/* Password Input */}
            <Animated.View entering={FadeInUp.delay(500).duration(800)} className="mb-5">
              <Text className="text-gray-400 font-semibold mb-2 ml-1">Password</Text>
              <AuthInputs
                name='Password'
                control={form.control}
                isPassword={true}
                iconName='lock-closed-outline'
                onPress={() => setSecureText(!secureText)}
                iconVar={secureText}
                placeholder='*******'
              />
              {form.formState.errors.Password && (
                <ErrorMessage errorMessage={form.formState.errors.Password?.message} />
              )}
            </Animated.View>

            {/* Confirm Password Input */}
            <Animated.View entering={FadeInUp.delay(600).duration(800)} className="mb-8">
              <Text className="text-gray-400 font-semibold mb-2 ml-1">Confirm Password</Text>
              <AuthInputs
                name='confirmPassword'
                isPassword={true}
                onPress={() => setsecurePassText(!securePassText)}
                iconVar={securePassText}
                placeholder='*******'
                control={form.control}
                iconName='lock-closed-outline'
              />
              {form.formState.errors.confirmPassword && (
                <ErrorMessage errorMessage={form.formState.errors.confirmPassword?.message} />
              )}
            </Animated.View>

            {/* Signup Button */}
            <Animated.View entering={FadeInUp.delay(700).duration(800)}>
              <TouchableOpacity
                onPress={form.handleSubmit(handleSignup)}
                disabled={fetchStatus === "fetching"}
                activeOpacity={0.8}
                className="bg-main-yellowGreen py-4 rounded-2xl shadow-lg shadow-white items-center mb-6"
              >
                {fetchStatus === "fetching" ? (
                  <ActivityIndicator size="small" color="black" />
                ) : (
                  <Text className="text-black text-lg font-bold uppercase tracking-wider">Sign Up</Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            <Text className='text-center text-white text-base'>
              You have an account?{' '}
              <Text 
                className='underline text-main-yellowGreen font-bold'
                onPress={() => router.push("/(auth)/login")}
              >
                Return back to the Grind
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;