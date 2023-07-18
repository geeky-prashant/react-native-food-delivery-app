import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Icon from "react-native-feather";
import { themeColors } from "./../theme/index";
import DishRow from "../components/dishRow";
import CartIcon from "../components/cartIcon";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../slices/restaurantSlice";

export default RestaurantScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  let item = params;
  const dispatch = useDispatch();

  useEffect(() => {
    if (item && item.id) {
      dispatch(setRestaurant({ ...item }));
    }
  }, []);

  return (
    <>
      <View>
        <CartIcon />
        <ScrollView>
          <View className="relative">
            <Image style={{ height: 300, width: "100%" }} source={item.image} />
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="absolute top-14 left-4 bg-gray-50 p-2 rounded-full shadow"
            >
              <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
            </TouchableOpacity>
          </View>
          <View
            style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
            className="bg-white -mt-12 pt-6"
          >
            <View className="px-5">
              <Text className="text-3xl font-bold">{item.title}</Text>
              <View className="flex-row items-center">
                <View className="pt-3 pb-5 space-y-2">
                  <View className="flex-row items-center space-x-0.5">
                    <Image
                      source={require("../assets/star.png")}
                      className="h-5 w-5"
                    />
                    <Text className="text-green-700">{item.stars}</Text>
                    <Text className="text-gray-700 -mt-0.5">
                      ({item.reviews} reviews){" "}
                      <Text className="font-semibold text-[16px]">
                        {item.category}
                      </Text>
                    </Text>
                  </View>
                  <View className="flex-row items-center space-x-1">
                    <Icon.MapPin color="gray" width="15" height="15" />
                    <Text className="text-gray-700 text-xs">
                      Nearby {item.address}
                    </Text>
                  </View>
                </View>
              </View>
              <Text className="text-gray-500">{item.description}</Text>
            </View>
          </View>
          <View className="pb-24 bg-white">
            <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>

            {/* Dishes  */}
            {item.dishes.map((dish, index) => (
              <DishRow item={{ ...dish }} key={index} />
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};
