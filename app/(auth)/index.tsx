import Onboarding from "@/Features/Onboarding";
import { FlashList } from "@shopify/flash-list";
import { Dimensions, View } from "react-native";

  const { width } = Dimensions.get("window");

export default function Index() {
  

  const onBoardingResource = [
    {
      id:"1",
      title : "Built Different Starts Here.",
      description : "This isn’t just a gym. It’s where limits get crushed, confidence gets built, and strength becomes a lifestyle.",
      imagepath :require("@/assets/images/Onboarding1.jpg"),
      lastPage : false
    },
    {
      id:"2",
      title : "Earn Your Next Level.",
      description :"Exclusive rewards, special perks, and member-only benefits are waiting. Your progress deserves recognition." ,
      imagepath : require("@/assets/images/onboarding3.jpg"),
      lastPage: false
    },
    {
      id:"3",
      title : "Train Smart. Live Strong.",
      description :"Expert coaching, world-class equipment, and a community built for progress. Everything you need to become your strongest self." ,
      imagepath : require("@/assets/images/onboarding2.jpg"),
      lastPage: true
    }
  ]
  return (
     <View className="flex-1 items-center justify-center bg-white">
        <FlashList
        data={onBoardingResource}
        horizontal ={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => 
        <View style={{ width }}>
            <Onboarding 
                title={item.title} 
                description={item.description} 
                imagepath={item.imagepath} 
                lastPage={item.lastPage}
            />
          </View>
        }
        keyExtractor={(item) => item.id}
        />
    </View>
  );
}
