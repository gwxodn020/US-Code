import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../pages/Home/HomeScreen';
import ProductUploadScreen from '../pages/Register2/ProductUploadScreen';
import OrderList from '../pages/Order/Orderlist';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProductUploadScreen" component={ProductUploadScreen} />
      <Stack.Screen name="OrderList" component={OrderList} />
    </Stack.Navigator>
  );
}
