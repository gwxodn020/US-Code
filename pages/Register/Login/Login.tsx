import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { styles } from './Loginst';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Login: undefined;
    SignUp: undefined;
    Home: undefined;
};

const roleMap: Record<string, string> = {
    ROLE_SELLER: 'seller',
    ROLE_USER: 'user',
};

const Login: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async () => {
        let hasError = false;
      
        if (!email) {
          setEmailError('이메일을 입력해주세요.');
          hasError = true;
          console.warn('로그인 실패: 이메일 입력 안됨');
        } else {
          setEmailError('');
        }
      
        if (!password) {
          setPasswordError('비밀번호를 입력해주세요.');
          hasError = true;
          console.warn('로그인 실패: 비밀번호 입력 안됨');
        } else if (password.length < 3) {
          setPasswordError('비밀번호는 3자 이상 입력해주세요.');
          hasError = true;
          console.warn('로그인 실패: 비밀번호 너무 짧음');
        } else {
          setPasswordError('');
        }
      
        if (hasError) return;
        if (email === 'test@example.com' && password === 'password123') {
          console.log('임시 로그인 (일반 사용자)');
          await AsyncStorage.multiSet([
            ['accessToken', 'TEMP_USER_TOKEN'],
            ['userRole', 'user'],
          ]);
          Alert.alert('로그인 성공', '일반 사용자로 임시 로그인되었습니다.');
          navigation.navigate('Home');
          return;
        } else if (email === 'seller@example.com' && password === 'seller123') {
          console.log('임시 로그인 (판매자)');
          await AsyncStorage.multiSet([
            ['accessToken', 'TEMP_SELLER_TOKEN'],
            ['userRole', 'seller'],
          ]);
          Alert.alert('로그인 성공', '판매자로 임시 로그인되었습니다.');
          navigation.navigate('Home');
          return;
        }
      
        try {
          console.log('로그인 요청 중...');
          const response = await fetch('http://34.64.226.141/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          const status = response.status;
          console.log('응답 코드:', status);
      
          if (status !== 200) {
            const errorPayload = await response.json().catch(() => ({}));
            const message = errorPayload.message || `로그인 실패 (status ${status})`;
            console.error('로그인 실패:', message);
            throw new Error(message);
          }
      
          const { token, role, userId } = await response.json();
      
          console.log('로그인 성공:', { token, role, userId });
      
          await AsyncStorage.multiSet([
            ['accessToken', token],
            ['userRole', roleMap[role] || 'unknown'],
            ['userId', String(userId)],
            ...(role === 'ROLE_SELLER' ? [['sellerId', String(userId)] as [string, string]] : []),
          ]);          
      
          Alert.alert('로그인 성공', '정상적으로 로그인되었습니다.');
          navigation.navigate('Home');
        } catch (err) {
          console.error('로그인 오류:', err);
          Alert.alert(
            '로그인 실패',
            err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
          );
        }
      };
      

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 40 }}>
                <Text style={styles.formTitle}>로그인</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>이메일</Text>
                <TextInput
                    style={[
                        styles.input,
                        emailFocused && styles.inputFocused,
                        emailError && styles.inputError,
                    ]}
                    placeholder="이메일"
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                        if (emailError) setEmailError('');
                    }}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>비밀번호</Text>
                <TextInput
                    style={[
                        styles.input,
                        passwordFocused && styles.inputFocused,
                        passwordError && styles.inputError,
                    ]}
                    placeholder="비밀번호를 입력하세요"
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        if (passwordError) setPasswordError('');
                    }}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                />
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
            <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleLogin}
                activeOpacity={0.8}
            >
                <Text style={styles.primaryButtonText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.textLink}
                onPress={handleSignUp}
                activeOpacity={0.7}
            >
                <Text style={styles.textLinkText}>
                    아직 계정이 없으신가요? <Text style={styles.textLinkHighlight}>회원가입</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
