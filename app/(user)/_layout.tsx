import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown : false}}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='WelcomeScreen' />
        <Stack.Screen name='ageCustom'/>
        <Stack.Screen name='genderSelection'/>
        <Stack.Screen name='heightCustom' />
        <Stack.Screen name='weightCustom'/>
    </Stack>
  )
}

export default _layout