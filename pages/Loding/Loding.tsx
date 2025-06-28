'use client';
import React from 'react';
import { View, Text, TouchableOpacity,Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { styles } from './Lodingcss';

const logo = require('../../assets/logo.png');

type AuthWelcomeScreenProps = {};

const AuthWelcomeScreen: React.FC<AuthWelcomeScreenProps> = () => {
  const navigation = useNavigation<NavigationProp<{ Login: undefined; SignUp: undefined }>>();

  const handleLogin = () => {
    console.log('로그인 버튼 눌림');
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    console.log('회원가입 버튼 눌림'); 
    navigation.navigate('SignUp');
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.logo}>
          <Image source={logo} style={styles.logoImage} resizeMode="contain" />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={handleLogin} 
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={handleSignUp} 
          
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>회원가입</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>

      <View style={styles.footerSection}>
        <Text style={styles.termsText}>
          가입 시 <Text style={styles.linkText}>이용약관</Text> 및{' '}
          <Text style={styles.linkText}>개인정보처리방침</Text>에 동의하게 됩니다.
        </Text>
      </View>
    </View>
  );
};

export default AuthWelcomeScreen;