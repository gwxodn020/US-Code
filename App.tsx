import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatbotScreen from './pages/Chatbot/ChatbotScreen';
enableScreens();

import LodingScreen from './pages/Loding/Loding';
import AuthWelcomeScreen from './pages/Loding/Loding';
import LoginScreen from './pages/Register/Login/Login';
import SignUpScreen from './pages/Register/Signup/Signup';
import HomeScreen from './pages/Home/HomeScreen';
import MyPage from './pages/MyPage/MyPage';
import ProductUploadScreen from './pages/Register2/ProductUploadScreen';
import OrderList from './pages/Order/Orderlist';
import PaymentScreen from './pages/Pay/PaymentScreen';
import ProductDetailScreen from './pages/Home/ProductDetailScreen';
export type RootStackParamList = {
  AuthWelcome: undefined;
  Login: undefined;
  SignUp: undefined;
  MainTabs: undefined;
  Home: undefined;
  My: undefined;
  Cart: undefined;
  Register: undefined;
  ProductUploadScreen: undefined;
  OrderList: undefined;
  Loding: undefined;
  ChatbotScreen: undefined;
  PaymentScreen: {
    selectedProduct: {
      id: number;
      name: string;
      price: string;
      seller: string;
      description: string;
      image: { uri: string };
    };
    userName: string;
    userPhone: string;
    userAddress: string;
    totalAmount: string;
  };
  ProductDetail: {
    product: {
      id: number;
      name: string;
      price: string;
      seller: string;
      description: string;
      image: { uri: string };
    };
    userName: string;
    userPhone: string;
    userAddress: string;
  };
};

export type TabParamList = {
  Home: undefined;
  Cart: undefined;
  Register: undefined;
  My: undefined;
  ProductUploadScreen: undefined;
  OrderList: undefined;
  ChatbotScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const getTabBarIcon = (routeName: string, color: string, size: number) => {
  let iconName: string;

  if (routeName === 'Home') iconName = 'home-outline';
  else if (routeName === 'Cart') iconName = 'bag-outline';
  else if (routeName === 'ProductUploadScreen') iconName = 'add-circle-outline';
  else if (routeName === 'My') iconName = 'person-outline';
  else if (routeName === 'ChatbotScreen') iconName = 'chatbubble-ellipses-outline';
  else iconName = 'home-outline';


  return <Ionicons name={iconName} size={size} color={color} />;
};

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: '#80a329',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderColor: '#d0d0d0',
          paddingVertical: 4,
          height: 60,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: '홈' }} />
      <Tab.Screen name="Cart" component={HomeScreen} options={{ tabBarLabel: '장바구니' }} />
      <Tab.Screen name="Register" component={HomeScreen} options={{ tabBarLabel: '등록' }} />
      <Tab.Screen name="My" component={MyPage} options={{ tabBarLabel: '마이' }} />
      <Tab.Screen name="ProductUploadScreen" component={ProductUploadScreen} options={{ tabBarLabel: '상품 등록' }} />
      <Tab.Screen name="OrderList" component={OrderList} options={{ tabBarLabel: '주문 목록' }} />
      <Tab.Screen name="ChatbotScreen" component={ChatbotScreen} options={{ tabBarLabel: '챗봇' }} />
    </Tab.Navigator>
  );
};

const App: React.FC = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AuthWelcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          statusBarStyle: 'auto',
          freezeOnBlur: true,
        }}
      >
        <Stack.Screen name="AuthWelcome" component={AuthWelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="My" component={MyPage} />
        <Stack.Screen name="ProductUploadScreen" component={ProductUploadScreen} />
        <Stack.Screen name="OrderList" component={OrderList} />
        <Stack.Screen name="Loding" component={LodingScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default App;
