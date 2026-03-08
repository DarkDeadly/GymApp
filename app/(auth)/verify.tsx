import { useVerifyCode } from "@/Features/Authentication/api/useAuthentication";
import { OtpInput } from '@/Features/Authentication/Components/OtpVerif';
import ServerErrorMessage from '@/Features/Authentication/Components/ServerError';
import { EmailVerifCodeSchema } from '@/Features/Authentication/util/schema';
import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
type codeInsertType = {
  code: string;
};

export default function VerifyCodeScreen() {
  const router = useRouter();
  const form = useForm<codeInsertType>({
    resolver: yupResolver(EmailVerifCodeSchema),
    defaultValues: { code: "" }
  });
  const {fetchStatus , handleVerifyCode , serverError} = useVerifyCode()

  // Handle Verification
  const onVerifyPress = form.handleSubmit(async (data) => {
      handleVerifyCode({code : data.code})
  })



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-main-primaryBg px-6 pt-12"
    >
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-neutral-800 items-center justify-center mb-8"
        accessible={true}
        accessibilityHint='Icon to go back'
        accessibilityLabel='back Link'
        accessibilityRole='link'
      >
        <Ionicons name="arrow-back" size={20} color="white" />
      </TouchableOpacity>

      <Text className="text-3xl font-bold text-white mb-2">Verify Your Email</Text>
      <Text className="text-gray-400 mb-10">We sent a 6-digit code to your inbox.</Text>
      {serverError && <ServerErrorMessage message={serverError} />}

      {/* Controller-based OTP Input */}
      <OtpInput
        control={form.control}
        error={!!form.formState.errors.code}
      />





      {/* Submit Button */}
      <TouchableOpacity
        onPress={onVerifyPress}
        accessible={true}
        accessibilityLabel='Verify Code button'
        accessibilityRole="button"
        accessibilityHint='Verify Code Button'
        accessibilityState={{ disabled: fetchStatus === "fetching" }}
        disabled={fetchStatus === "fetching" || form.watch("code").length !== 6}
        className={`py-4 rounded-2xl items-center ${form.watch("code").length === 6 ? 'bg-main-yellowGreen' : 'bg-neutral-800'
          }`}
      >
        {fetchStatus === "fetching" ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text className="text-black text-lg font-bold">Verify & Finish</Text>
        )}
      </TouchableOpacity>

      {/* Required for Clerk Bot Protection */}
      <View nativeID="clerk-captcha" />
    </KeyboardAvoidingView>
  );
}