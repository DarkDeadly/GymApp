import MultipleChoices from '@/Features/User/components/MultipleChoices';
import { WEIGHT_FOUNDATIONS } from '@/Features/User/constants/UserExtraInfo';
import { SelectSchema } from '@/Features/User/util/Schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';


type WeightValue = {
  selectedItem: string
}

const weightCustom = () => {
      const router = useRouter();
    
      const form = useForm<WeightValue>({
        resolver: yupResolver(SelectSchema),
        defaultValues: {
          selectedItem: ""
        }
      });
    
    
      // 2. Wrap your navigation in handleSubmit to benefit from Yup validation
      const onSubmit = (data: WeightValue) => {
        console.log("Saving selection:", data.selectedItem);
        router.push("/(user)/(tabs)/Home");
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
      />
  )
}

export default weightCustom