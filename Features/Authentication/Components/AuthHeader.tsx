import React from 'react'
import { Text } from 'react-native'
import Animated, { BounceIn, FadeInUp } from 'react-native-reanimated'

interface AuthHeaderInterface {
    headerTitle : string , 
    headerDescription : string
}

const AuthHeader = ({headerTitle , headerDescription}:AuthHeaderInterface) => {
  return (
          <>
            <Animated.View
                entering={BounceIn.duration(1000)}
                className="items-center mb-8"
              >
                <Text className="text-5xl font-extrabold text-white tracking-tighter">
                  GRIND<Text className="text-blue-600">.</Text><Text className='text-main-yellowGreen'>FLOW</Text>
                </Text>
              </Animated.View>
    
              {/* Header Text */}
              <Animated.View entering={FadeInUp.delay(200).duration(800)} className={"gap-4"}>
                <Text className="text-3xl font-bold text-center text-white mb-2">
                  {headerTitle}
                </Text>
                <Text className="text-gray-400 text-center mb-10 text-xl">
                  {headerDescription}
                </Text>
              </Animated.View>
          </>  
  )
}

export default AuthHeader