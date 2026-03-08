import { Ionicons, } from '@expo/vector-icons';
import React from 'react';
import { Control, Controller } from "react-hook-form";
import {
  KeyboardTypeOptions,
  TextInput as RNTextInput,
  TouchableOpacity,
  View
} from 'react-native';




interface AuthInputProps {
  control: Control<any>;
  name: string;
  isPassword?: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  onPress?: () => void; // Function to toggle eye icon
  iconVar?: boolean;    // The boolean state of the eye
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;

}

const AuthInputs = ({
  control,
  name,
  isPassword = false,
  iconName,
  onPress,
  iconVar,
  placeholder,
  keyboardType = "default",

}: AuthInputProps) => {
  const inputColor = "#9ca3af"
  return (
    <View className="flex-row items-center bg-main-customGray border border-neutral-800 rounded-2xl px-4 h-14">
      <Controller
        name={name}
        control={control}
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <Ionicons name={iconName} size={20} color={inputColor} />
            <RNTextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={inputColor}
              keyboardType={keyboardType}
              secureTextEntry={isPassword && iconVar} // THE KEY FIX
              autoCapitalize="none"
              className="flex-1 ml-3 text-white text-base h-full"
              accessible={true}
              accessibilityLabel={name} // e.g., "email" or "password"
              accessibilityHint={`Enter your ${name} here`}
              accessibilityRole={"text"}
            />
            {isPassword && (
              <TouchableOpacity onPress={onPress}
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={iconVar ? "Show password" : "Hide password"}
                accessibilityHint="Toggles the visibility of the password text"
              >
                <Ionicons
                  name={iconVar ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={inputColor}
                />
              </TouchableOpacity>
            )}

          </>
        )}
      />

    </View>

  )
}

export default AuthInputs