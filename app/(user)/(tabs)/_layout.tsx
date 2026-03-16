import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
        headerShown : false ,  
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#9CA3AF',}}>

        <Tabs.Screen name='Home' 
        options={{tabBarIcon : ({color , size }) => (
            <Ionicons name= "home" color={color} size={size} />
        )}}/>
        <Tabs.Screen name='Profile' 
        options={{tabBarIcon : ({color , size}) => (
            <Ionicons name="person" color={color} size={size} />
        )}}/>

    </Tabs>
  )
}

export default TabsLayout