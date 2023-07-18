import { TextInput, View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import { themeColors } from "../theme";
import Categories from "../components/categories";
import { featured } from "../constants";
import FeaturedRow from "../components/featuredRow";
import { useState } from "react";

const HomeScreen = () => {
  const [search, setSearch] = useState("");

  const filteredRestaurants = featured.filter(
    (item) =>
      item.restaurants.filter(
        (res) => res.name.toUpperCase().indexOf(search.toUpperCase()) > -1
      ).length > 0
  );

  return (
    <SafeAreaView className="bg-white">

      {/* Search Bar  */}
      <View className="flex-row items-center space-x-2 p-4">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={(text) => setSearch(text)}
            className="ml-2 flex-1"
          />
          <View className="flex-row items-center space-x-1 border-x-1 border-0 border-l-2 pl-2 border-l-gray-300">
            <Icon.MapPin height="20" width="20" stroke="gray" />
            <Text className="text-gray-600">Gurgaon</Text>
          </View>
        </View>
        <View
          style={{ backgroundColor: themeColors.bgColor(1) }}
          className="p-3 bg-gray-300 rounded-full"
        >
          <Icon.Sliders
            height="20"
            width="20"
            strokeWidth={2.5}
            stroke="#ffffff"
          />
        </View>
      </View>

      {/* Main Area  */}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        {/* Categories Section */}
        <Categories />

        {/* Featured Section  */}
        <View className="mt-5 mb-20">
          {filteredRestaurants.map((item, index) => {
            return (
              <FeaturedRow
                key={index}
                title={item.title}
                description={item.description}
                restaurants={item.restaurants}
                search={search}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
