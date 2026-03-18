import { api } from '@/convex/_generated/api';
import MultipleChoices from '@/Features/User/components/MultipleChoices';
import { WEIGHT_FOUNDATIONS } from '@/Features/User/constants/UserExtraInfo';
import { useOnboardingStore } from '@/Features/User/store/useOnBoardingStore';
import { SelectSchema } from '@/Features/User/util/Schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'convex/react';
import { useRouter } from 'expo-router';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';


type WeightValue = {
  selectedItem: string
}

const weightCustom = () => {
      const router = useRouter();
      const [isPending , startTransition] = useTransition()
      const form = useForm<WeightValue>({
        resolver: yupResolver(SelectSchema),
        defaultValues: {
          selectedItem: ""
        }
      });
      const mutation = useMutation(api.users.editUserField)
      const onboardingData = useOnboardingStore();
    
      // 2. Wrap your navigation in handleSubmit to benefit from Yup validation
      const onSubmit = (data: WeightValue) => {
          startTransition(async() => {
            try {
              await mutation({
                weight : data.selectedItem,
                height : onboardingData.height,
                age : onboardingData.age,
                gender : onboardingData.gender,
                firstTime : false
              
              })
              onboardingData.reset()
              router.push("/(user)/(tabs)/Home")
            } catch (error) {
              console.log(error)
            }
          })
      };
  return (
   
      <MultipleChoices  
      control={form.control}
      name='selectedItem'
      title={`What is your${"\n"}Starting Base?`}
      imagePath={require("@/assets/images/HomePage.jpg")}
      choices={WEIGHT_FOUNDATIONS}
      onPress={form.handleSubmit(onSubmit)}
      selectedItem={form.watch("selectedItem")}
      isPending={isPending}
      />
  )
}

export default weightCustom