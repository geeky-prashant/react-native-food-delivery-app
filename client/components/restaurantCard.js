import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Restaurant", { ...item })}
    >
      <View
        style={{
          elevation: 1.5,
        }}
        className="mr-6 mb-1 bg-white rounded-3xl shadow-lg shadow-black"
      >
        <Image className="h-36 w-64 rounded-t-3xl" source={item.image} />
        <View className="px-3 pb-4 space-y-2">
          <Text className="text-lg font-bold pt-2">{item.name}</Text>
          <View className="flex-row items-center space-x-0.5">
            <Image
              source={require("../assets/star.png")}
              className="h-3.5 w-3.5"
            />
            <Text className="text-green-700">{item.stars}</Text>
            <Text className="text-gray-700">
              ({item.reviews} reviews){" "}
              <Text className="font-semibold">{item.category}</Text>
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Icon.MapPin color="gray" width="15" height="15" />
            <Text className="text-gray-700 text-xs">Nearby {item.address}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
