import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { featured } from "../constants";
import { themeColors } from "../theme";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../slices/restaurantSlice";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../slices/cartSlice";

export default function CartScreen() {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [groupedItems, setGroupedItems] = useState([]);
  const deliveryFee = 50;
  const dispatch = useDispatch();

  useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      if (group[item.id]) {
        group[item.id].push(item);
      } else {
        group[item.id] = [item];
      }
      return group;
    }, {});
    setGroupedItems(items);
  }, [cartItems]);

  return (
    <>
      <View className="bg-white flex-1">
        {/* Back Button  */}
        <View className="relative pt-12 pb-8 shadow-sm">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="absolute z-10 rounded-full p-1 shadow top-12 left-4"
          >
            <Icon.ArrowLeft strokeWidth={3} stroke="white" />
          </TouchableOpacity>
          <View>
            <Text className="text-center font-bold text-xl">Your Cart</Text>
            <Text className="text-center text-gray-500">
              {restaurant.title}
            </Text>
          </View>
        </View>

        {/* Delivery Time  */}
        <View
          style={{ backgroundColor: themeColors.bgColor(0.1) }}
          className="flex-row px-4 py-4 items-center"
        >
          <Image
            source={require("../assets/delivery-boy.png")}
            className="h-14 w-14"
          />
          <Text className="flex-1 pl-2 font-bold">Deliver in 5-10 minutes</Text>
          <TouchableOpacity>
            <Text className="font-bold" style={{ color: themeColors.text }}>
              Change
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dishes  */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          className="bg-white pt-5"
        >
          {Object.entries(groupedItems).map(([key, items]) => {
            return (
              <View
                key={key}
                className="flex-row items-center space-x-3 py-3 px-4 bg-white rounded-3xl mx-4 mb-3 shadow-md shadow-black"
                style={{
                  elevation: 1.5,
                }}
              >
                <Text className="font-bold" style={{ color: themeColors.text }}>
                  {items.length} x
                </Text>
                <Image
                  className="h-14 w-14 rounded-full"
                  source={items[0]?.image}
                />
                <Text className="flex-1 font-bold text-gray-700">
                  {items[0]?.name}
                </Text>
                <Text className="font-semibold text-base">
                  ₹{items[0]?.price}
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromCart({ id: items[0]?.id }))}
                  className="p-1 rounded-full"
                  style={{ backgroundColor: themeColors.bgColor(1) }}
                >
                  <Icon.Minus
                    strokeWidth={2}
                    height={20}
                    width={20}
                    stroke="white"
                  />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* Totals  */}
        <View
          style={{ backgroundColor: themeColors.bgColor(0.1) }}
          className="p-6 px-8 rounded-t-3xl space-y-4"
        >
          <View className="flex-row justify-between">
            <Text className="text-gray-700">Subtotal</Text>
            <Text className="text-gray-700">₹{cartTotal}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-700">Delivery Fee</Text>
            <Text className="text-gray-700">₹{deliveryFee}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-700 font-extrabold">Order Total</Text>
            <Text className="text-gray-700 font-extrabold">
              ₹{deliveryFee + cartTotal}
            </Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("OrderPreparing")}
              style={{ backgroundColor: themeColors.bgColor(1) }}
              className="p-3 rounded-full"
            >
              <Text className="text-white text-center font-bold text-lg">
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
