import { object, ref, string } from "yup";

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;
export const LoginSchema = object({
    email : string().email().required("Email is required"),
    password : string().required("the password is required")

})
export const RegisterSchema = object({
    EmailAddress : string().email().required("Email is required"),
    Password : string().min(8 , "the password must have at least 8 characters")
    .matches(passwordRegex , "Password must contain at least one uppercase letter and one special character")
    .required("the password is required"),
    confirmPassword : string().required("this field is required")
    .oneOf([ref("Password")],"Passwords must match")
})

export const EmailVerifCodeSchema = object({
    code : string().required("the code is required")
})

export const EmailPasswordResetSchema = object({
    email : string().required("Email is required")
})
export const PasswordResetSchema = object({
    code : string().required("the code is required"),
    newPassword : string().min(8 , "the password must have at least 8 characters")
    .matches(passwordRegex , "Password must contain at least one uppercase letter and one special character")
    .required("the password is required"),
})