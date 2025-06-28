import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from './components/Footer';

import HomeScreen from './pages/Home/HomeScreen';
import MyPage from './pages/MyPage/MyPage';
import ProductUploadScreen from './pages/Register2/ProductUploadScreen';
import OrderList from './pages/Order/Orderlist';

const Stack = createNativeStackNavigator();
export type AppNavigatorParamList = {
    Home: undefined; 
    My: undefined;
    ProductUploadScreen: undefined;
    OrderList: undefined;
};
const AppNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="My" component={MyPage} />
    <Stack.Screen name="ProductUploadScreen" component={ProductUploadScreen} />
    <Stack.Screen name="OrderList" component={OrderList} />
  </Stack.Navigator>
);

export default function MainTabs() {
  return (
    <View style={styles.container}>
      <AppNavigator />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
