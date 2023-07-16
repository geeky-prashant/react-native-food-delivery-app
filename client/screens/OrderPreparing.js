import { useEffect } from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function OrderPreparing() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      //Move To Delivery Screen
      navigation.navigate("Delivery");
    }, 3000);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-[#f8faf7]">
      <Image source={require("../assets/check.gif")} className="h-28 w-28" />
    </View>
  );
}
