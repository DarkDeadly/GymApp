import { useCurrentUser } from '@/Features/Authentication/api/useAuthentication'
import { useClerk } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'

const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter()
  const { isLoading } = useCurrentUser()

  const handleSignOut = async () => {
    try {
      await signOut()
      // Best Practice: replace to root to trigger app/index.tsx logic
      router.replace('/') 
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color="#ADFF2F" />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={handleSignOut}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,               // Takes full height
    justifyContent: 'center', // Centers vertically
    alignItems: 'center',     // Centers horizontally
    backgroundColor: '#000',  // Matches your app theme
  },
  button: {
    backgroundColor: '#FF3366', // Switched to an "alert" color for Sign Out
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }], // Added a small "pro" touch for feedback
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
})

export default SignOutButton