import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text } from 'react-native';
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';

 const ServerErrorMessage = ({ message }: { message: string }) => {
  if (!message) return null;

  return (
    <Animated.View 
      entering={FadeInLeft.duration(400)} 
      exiting={FadeOutRight.duration(400)}
      className="bg-red-500/10 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl flex-row items-center"
    >
      <Ionicons name="alert-circle" size={20} color="#ef4444" />
      <Text className="text-red-500 ml-3 font-medium text-sm flex-1">
        {message}
      </Text>
    </Animated.View>
  );
};

export default ServerErrorMessage