// screens/OnboardingAge.tsx
import MultipleChoices from '@/Features/User/components/MultipleChoices';
import { ageOptions } from '@/Features/User/constants/UserExtraInfo';
import { SelectSchema } from '@/Features/User/util/Schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';


type AgeValue = {
  selectedItem: string
}



export default function OnboardingAge() {
  const router = useRouter();

  const form = useForm<AgeValue>({
    resolver: yupResolver(SelectSchema),
    defaultValues: {
      selectedItem: ""
    }
  });


  // 2. Wrap your navigation in handleSubmit to benefit from Yup validation
  const onSubmit = (data: AgeValue) => {
    console.log("Saving selection:", data.selectedItem);
    router.push("/(user)/genderSelection");
  };

  return (
   
      <MultipleChoices  
      control={form.control}
      name='selectedItem'
      title={`Tell Us Your${"\n"}Age Group`}
      imagePath={require("@/assets/images/HomePage.jpg")}
      choices={ageOptions}
      onPress={form.handleSubmit(onSubmit)}
      selectedItem={form.watch("selectedItem")}
      />
    
  );
}