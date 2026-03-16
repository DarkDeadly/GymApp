import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { ImageBackground, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    FadeInDown,
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    withTiming
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#A0DB50', // main-yellowGreen
  overlayStart: 'rgba(0, 0, 0, 0.6)',
  overlayEnd: 'rgba(0, 0, 0, 0.85)',
};

interface choicesOption {
  value: string;
  desc?: string;
  label: string;
}

interface multipleChoiceProps {
  title: string;
  imagePath: ImageSourcePropType;
  control: Control<any>;
  name: string;
  onPress?: () => void;
  selectedItem: string | undefined;
  choices: choicesOption[];
}

const MultipleChoices = ({ title, imagePath, control, choices, onPress, selectedItem, name }: multipleChoiceProps) => {
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground source={imagePath} className="flex-1" resizeMode="cover">
      <LinearGradient colors={[COLORS.overlayStart, COLORS.overlayEnd]} className="flex-1">
        <SafeAreaView className="flex-1">
          {/* Top Spacer */}
          <View className="flex-1" />

          <View className="px-6 pb-10 gap-y-8" style={{ marginBottom: insets.bottom }}>
            {/* Title Animation */}
            <Animated.View entering={FadeInDown.duration(600).springify()}>
              <Text className="text-4xl font-bold text-white tracking-tight">
                {title}
              </Text>
            </Animated.View>

            <View className="gap-y-4">
              <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <View className="gap-y-4">
                    {choices.map((option, index) => (
                      <ChoiceCard
                        key={option.value}
                        option={option}
                        isSelected={value === option.value}
                        index={index}
                        onPress={() => onChange(option.value)}
                      />
                    ))}
                    {error && (
                      <Animated.Text 
                        entering={FadeInDown}
                        className="text-red-500 text-center mt-2"
                      >
                        {error.message}
                      </Animated.Text>
                    )}
                  </View>
                )}
              />
            </View>

            {/* Button Animation */}
            <Animated.View entering={FadeInDown.delay(400).duration(600)}>
              <TouchableOpacity
                onPress={onPress}
                disabled={!selectedItem}
                activeOpacity={0.8}
                className={`w-full py-5 rounded-2xl items-center ${
                  selectedItem ? 'bg-main-yellowGreen' : 'bg-gray-600 opacity-50'
                }`}
              >
                <Text className={`text-xl font-bold ${selectedItem ? 'text-black' : 'text-gray-300'}`}>
                  {selectedItem ? 'Continue' : 'Select an option'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
};

/**
 * ChoiceCard Component
 * Separates Entrance Animation (Outer View) from Selection Styles (Inner View)
 */
const ChoiceCard = ({ option, isSelected, index, onPress }: any) => {
  const progress = useDerivedValue(() => {
    return withTiming(isSelected ? 1 : 0, { duration: 300 });
  });

  const animatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      ['transparent', '#A0DB50'] 
    );

    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(30, 30, 46, 0.75)', 'rgba(30, 30, 46, 0.95)']
    );

    return {
      borderColor,
      backgroundColor,
      transform: [{ scale: withTiming(isSelected ? 1.02 : 1, { duration: 400 }) }]
    };
  });

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).springify()}
    >
      <Animated.View 
        style={[animatedStyle, { borderRadius: 16, borderWidth: 2 }]}
      >
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.9}
          className="p-5 rounded-2xl"
        >
          <Text className="text-xl font-bold text-white">{option.label}</Text>
          {option.desc && (
            <Text className="text-sm text-gray-400 mt-1">{option.desc}</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default MultipleChoices;