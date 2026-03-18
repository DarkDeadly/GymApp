import { api } from "@/convex/_generated/api"
import { useAuth, useClerk, useSignIn, useSignUp } from "@clerk/expo"
import { useMutation, useQuery } from "convex/react"
import { useRouter } from "expo-router"
import { useState } from "react"



export const useRegisterUser = () => {
    const [ServerError, setServerError] = useState("")
    const { signUp, fetchStatus } = useSignUp()
    const router = useRouter()
    const handleRegister = async ({ email, password }: { email: string, password: string }) => {
        if (!signUp) return
        setServerError("")
        try {
            const { error } = await signUp.password({
                emailAddress: email,
                password: password,
                firstName: email.split("@")[0]
            })
            if (error) {
                if (error.message === "That email address is taken. Please try another.") {
                    setServerError("This email is already used, please login.");
                }
                return;
            }
            if (!error) {
                const { error: codeSentError } = await signUp.verifications.sendEmailCode();
                if (codeSentError) {
                    console.log("Code Sent Error:", codeSentError.message);
                }
                router.push("/(auth)/verify");
            }
        } catch (er: any) {
            setServerError("An unexpected error occurred.");
        }
    }
    return { handleRegister, ServerError, fetchStatus }
}

export const useVerifyCode = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState('');
    const { signUp, fetchStatus } = useSignUp()
    const userSync = useMutation(api.users.syncUserCreation)

    const handleVerifyCode = async ({ code }: { code: string }) => {

        if (!signUp) return
        setServerError("");
        const { error } = await signUp.verifications.verifyEmailCode({
            code: code
        })
        if (error) {
            console.log("the error is : ", error.message)
            if (error.message === "Incorrect code") {
                setServerError("The code you provided is incorrect please see your inbox !")
            }
            return
        }
        if (!error) {
            await signUp.finalize({
                navigate: async ({ session, decorateUrl }) => {
                    if (session?.currentTask) return;

                    //here where the useMutation will happen right ?
                    await userSync({
                        email: signUp.emailAddress!,
                        clerkId: signUp.createdUserId!,
                        fullName: signUp.firstName!
                    })
                    const url = decorateUrl("/")
                    router.push(url as any);
                }
            })
        }
    }
    return { fetchStatus, handleVerifyCode, serverError }
}

export const useSignInUser = () => {
    const router = useRouter();
    const [serverError, setServerError] = useState('');
    const { fetchStatus, signIn } = useSignIn()

    const handleLogin = async ({ email, password }: { email: string, password: string }) => {
        if (!signIn) return
        const { error } = await signIn.password({
            emailAddress: email,
            password: password
        })
        if (error) {
            console.log("the error is : ", error.message)
            if (error.message === "Couldn't find your account.") {
                setServerError("the email you entered in not register please Signup")
            }
            if (error.message === "Password is incorrect. Try again, or use another method.") {
                setServerError("Check your password please")
            }
            return
        }
        if (!error) {

            if (signIn.status === "complete") {
                await signIn.finalize({
                    navigate: ({ session, decorateUrl }) => {
                        if (session?.currentTask) return;
                        const url = decorateUrl("/")
                        router.replace(url as any);
                    }
                })
            }
        }
    }

    return { handleLogin, serverError, fetchStatus }
}


export const useCurrentUser = () => {
    const { isLoaded } = useAuth()
    const currentUser = useQuery(api.users.getCurrentUser)
    const isLoading = !isLoaded ||                              // Clerk not ready
        currentUser === undefined             // Convex still fetching


    return { isLoading, currentUser }
}

export const useSendPasswordResetCode = () => {
    const { fetchStatus, signIn } = useSignIn()
    const [serverError, setServerError] = useState('');

    const router = useRouter()


    const handleSendCode = async ({ email }: { email: string }) => {

        if (!signIn) return
        const { error: emailError } = await signIn.create({
            identifier: email
        })
        if (emailError) {
            if (emailError.message === "Couldn't find your account.") {
                setServerError("The email you used is not in the database")
                return
            }
        }
        else {
            const { error: sendCodeError } = await signIn.resetPasswordEmailCode.sendCode()
            if (sendCodeError) {
                console.log('the code error is : ', sendCodeError.code, "and the message is ", sendCodeError.message)
                return
            }
            router.push("/(auth)/PasswordReset")
        }

    }
    return { handleSendCode, fetchStatus, serverError }
}

export const useResetPassword = () => {
    const [serverError, setServerError] = useState('');
    const { fetchStatus, signIn } = useSignIn()
    const router = useRouter()

    const handlePasswordReset = async ({ code, newPassword }: { code: string, newPassword: string }) => {
        const { error: codeError } = await signIn.resetPasswordEmailCode.verifyCode({
            code: code
        })
        if (codeError) {
            console.log("the code error is : ", codeError.message)
            if (codeError.message ==="Incorrect code") {
                setServerError("The code is invalid check your inbox")
            }
            return
        }
        else {
            const { error: passwordError } = await signIn.resetPasswordEmailCode.submitPassword({
                password: newPassword
            })
            if (passwordError) {
                console.log(passwordError.message)
            }
            else {
                if (signIn.status === "complete") {
                    await signIn.finalize({
                        navigate: async ({ session, decorateUrl }) => {
                            if (session?.currentTask) return;
                            const url = decorateUrl("/")
                            router.push(url as any);

                        }
                    })
                }
            }
        }
    }

    return {handlePasswordReset , fetchStatus , serverError}

}


 export const handleSignOut = async () => {
      const { signOut } = useClerk()
      const router = useRouter()

    try {
      await signOut()
      // Best Practice: replace to root to trigger app/index.tsx logic
      router.replace('/') 
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }