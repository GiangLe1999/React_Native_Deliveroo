import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animate from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#00CCBB] justify-center items-center">
      <Animate.Image
        source={require("../assets/order-loading.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="w-96 h-96"
      />

      <Animate.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-;g my-10 text-white font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animate.Text>

      <Progress.Bar size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
