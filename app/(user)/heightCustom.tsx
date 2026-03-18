import MultipleChoices from '@/Features/User/components/MultipleChoices';
import { HEIGHT_RANGES } from '@/Features/User/constants/UserExtraInfo';
import { useOnboardingStore } from '@/Features/User/store/useOnBoardingStore';
import { SelectSchema } from '@/Features/User/util/Schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';


type HeightValue = {
  selectedItem: string
}

const weightCustom = () => {
  const router = useRouter();

  const form = useForm<HeightValue>({
    resolver: yupResolver(SelectSchema),
    defaultValues: {
      selectedItem: ""
    }
  });

    const setFields = useOnboardingStore((state) => state.setField )

  // 2. Wrap your navigation in handleSubmit to benefit from Yup validation
  const onSubmit = (data: HeightValue) => {
           setFields("height" , data.selectedItem)
           router.push("/(user)/weightCustom");

  };
  return (

    <MultipleChoices
      control={form.control}
      name='selectedItem'
      title={`What is your${"\n"}height stature?`}
      imagePath={require("@/assets/images/HomePage.jpg")}
      choices={HEIGHT_RANGES}
      onPress={form.handleSubmit(onSubmit)}
      selectedItem={form.watch("selectedItem")}
    />
  )
}

export default weightCustom