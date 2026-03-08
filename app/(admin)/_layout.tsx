import { Stack } from 'expo-router'
import React from 'react'

const AdminLayout = () => {
  return (
     <Stack>
        <Stack.Screen name='index' />
    </Stack>
  )
}

export default AdminLayout