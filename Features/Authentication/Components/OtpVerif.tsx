import React from 'react';
import { Control, Controller } from "react-hook-form";
import { TextInput } from 'react-native';

interface OtpInputProps {
  control: Control<any>;
  error?: boolean;
}

export const OtpInput = ({ control, error }: OtpInputProps) => {
  return (
    <Controller
      name="code"
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          value={value}
          onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ''))}
          onBlur={onBlur}
          maxLength={6}
          keyboardType="number-pad"
          placeholder="000000"
          placeholderTextColor="#404040"
          className={`w-full h-16 text-center text-4xl font-bold tracking-[15px] rounded-2xl bg-neutral-900 border-2 mb-2
            ${error ? 'border-red-500 text-red-500' : 'border-neutral-800 text-white'}`}
          // Ensure cursor stays centered despite tracking
          style={{ paddingLeft: 15 }} 
          accessible={true}
          accessibilityLabel='Verify code'
          accessibilityHint='Verify Code Input'
          
        />
      )}
    />
  );
};