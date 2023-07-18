import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("screen");

const DATA = [
  {
    key: 1,
    title: "🌟 Discover",
    description:
      "Browse through an extensive menu featuring mouthwatering dishes from local restaurants. From Italian classics to exotic Asian flavors, we have something for everyone's taste buds. Let's get started!",
    image: require("../assets/landingPage/burger.png"),
    style: {
      width: width,
      height: height,
      resizeMode: "contain",
    },
  },
  {
    key: 2,
    title: "📝 Easy Ordering",
    description:
      "Customizing your order is a breeze. Add extra toppings, make special requests, and choose your preferred delivery time. Our app ensures your meal is prepared just the way you like it.",
    image: require("../assets/landingPage/order.png"),
    style: {
      width: width,
      height: height,
      resizeMode: "contain",
    },
  },
  {
    key: 3,
    title: "🚀 Fast Delivery",
    description:
      "Hungry? No worries! We pride ourselves on swift and reliable delivery. Track your order in real-time and get updates every step of the way, so you know exactly when your food will arrive.",
    image: require("../assets/landingPage/chad.png"),
    style: {
      width: width,
      height: height,
      resizeMode: "contain",
    },
  },
];

const bgs = ["#F9A825", "#e2dfd8", "#87CEEB"];

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ flexDirection: "row", bottom: 100, position: "absolute" }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 7,
              width: 7,
              backgroundColor: "#333",
              borderRadius: 5,
              margin: 10,
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const BackDrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((_, i) => _),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

function LandingScreen({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <BackDrop scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, alignItems: "center", padding: 20 }}>
              <View style={{ flex: 0.7, justifyContent: "center" }}>
                <Image source={item.image} style={item.style} />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{ fontWeight: "800", fontSize: 28, paddingBottom: 10 }}
                >
                  {item.title}
                </Text>
                <Text style={{ fontWeight: "400" }}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />

      <TouchableOpacity
        style={{
          backgroundColor: "white",
          height: 50,
          width: 300,
          borderRadius: 10,
          bottom: 25,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={{ fontWeight: "600" }}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LandingScreen;
