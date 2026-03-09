import { useCurrentUser } from '@/Features/Authentication/api/useAuthentication'
import { useClerk } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native'

 const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const router = useRouter()
  const {currentUser , isLoading} = useCurrentUser()
  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      router.push('/(auth)/main')
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

if (isLoading) return <ActivityIndicator size={"large"} />

 return (
    
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      onPress={handleSignOut}
    >
      <Text style={styles.buttonText}>Sign out</Text>
    </Pressable>
  )
 }


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
})


export default SignOutButton