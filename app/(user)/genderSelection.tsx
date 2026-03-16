import MultipleChoices from '@/Features/User/components/MultipleChoices'
import { GENDER_CHOICES } from '@/Features/User/constants/UserExtraInfo'
import { SelectSchema } from '@/Features/User/util/Schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'expo-router'
import React from 'react'
import { useForm } from 'react-hook-form'

type SelectedGender = {
    selectedItem: string
}



const genderSelection = () => {
    const form = useForm<SelectedGender>({
        resolver: yupResolver(SelectSchema),
        defaultValues: {
            selectedItem: ""
        }
    })
    const router = useRouter()

    const onSubmit = (data: SelectedGender) => {
        console.log("Saving selection:", data.selectedItem);
        router.push("/(user)/heightCustom")
    };
    return (
       <MultipleChoices
       choices={GENDER_CHOICES}
       name='selectedItem'
       control={form.control}
       title='What is your gender?'
       selectedItem={form.watch("selectedItem")}
       onPress={form.handleSubmit(onSubmit)}
       imagePath={require("@/assets/images/HomePage.jpg")}
       />
    )
}

export default genderSelection