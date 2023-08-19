import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectRestaurant } from "../features/restaurant/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basket/basketSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import { formatCurrency } from "../lib/helper";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const [groupedItemsBasket, setGroupedItemsBasket] = useState({});
  const total = useSelector(selectBasketTotal);

  // Nếu items không thay đổi, hàm reducer sẽ không tính toán lại
  // acc trả về là object gồm key là id của item, value là aray chứa các item cùng id
  useMemo(() => {
    const groupItems = items.reduce((acc, cur) => {
      (acc[cur.id] = acc[cur.id] || []).push(cur);
      return acc;
    }, {});

    setGroupedItemsBasket(groupItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        {/* Header */}
        <View className="p-5 border-b border-[#00BBCC] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-gray-400 text-center">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-full bg-gray-100 absolute top-4 right-5"
          >
            <XCircleIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>

        {/* Deliver in 50-75 */}
        <View className="flex-row items-center space-x-4 py-3 px-4 bg-white my-5">
          <Image
            source={{ uri: "https://links.papareact.com/wru" }}
            className="w-7 h-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.keys(groupedItemsBasket).map((key) => {
            const item = groupedItemsBasket[key][0];
            return (
              <View
                key={key}
                className="flex-row items-center space-x-3 bg-white py-2 px-4"
              >
                <Text className="text-[#00CCBB]">
                  {groupedItemsBasket[key].length} x
                </Text>
                <Image
                  source={{
                    uri: urlFor(item.image).url(),
                  }}
                  className="h-12 w-12 rounded-full"
                />
                <Text className="flex-1">
                  {item.name.length > 20
                    ? item.name.substring(0, 20) + "..."
                    : item.name}
                </Text>

                <Text className="text-gray-600">
                  {formatCurrency(item.price)}
                </Text>

                <TouchableOpacity>
                  <Text
                    className="text-[#00CCBB] text=xs"
                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          {/* Subtotal */}
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">{formatCurrency(total)}</Text>
          </View>

          {/* Delivery fee */}
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">{formatCurrency(5.99)}</Text>
          </View>

          {/* Order total */}
          <View className="flex-row justify-between mb-2">
            <Text className="font-extrabold">Order Total</Text>
            <Text className="font-extrabold">
              {formatCurrency(total + 5.99)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            className="rounded-lg bg-[#00CCBB] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
