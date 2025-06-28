import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPage from '../pages/MyPage/MyPage';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyMain" component={MyPage} />
    </Stack.Navigator>
  );
}
