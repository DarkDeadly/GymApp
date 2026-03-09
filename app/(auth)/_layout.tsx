import { Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='main' />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name='verify' />
      <Stack.Screen name = "forgotPassword"/>
      <Stack.Screen name = "PasswordReset"/>

    </Stack>
  )
}

export default AuthLayout