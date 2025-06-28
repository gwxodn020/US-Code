import React, { useState } from 'react';
import { styles } from './Signupst';
import { Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const API_BASE_URL = 'http://34.64.226.141';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigation = useNavigation<NavigationProp<{ Login: undefined; SignUp: undefined }>>();
    const [focusedFields, setFocusedFields] = useState<FocusedFields>({});
    const [errors, setErrors] = useState<Errors>({});
    const validateEmail = (email: string): boolean => {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    interface FormData {
        name: string;
        email: string;
        password: string;
    }
    interface Errors {
        [key: string]: string;
    }
    interface FocusedFields {
        [key: string]: boolean;
    }
    const handleFocus = (field: keyof FormData): void => {
        setFocusedFields((prev: FocusedFields) => ({ ...prev, [field]: true }));
    };
    const handleBlur = (field: keyof FormData): void => {
        setFocusedFields((prev: FocusedFields) => ({ ...prev, [field]: false }));
    };
    const validateForm = () => {
        const newErrors: Errors = {};
        if (!formData.email) {
            newErrors.email = '이메일을 입력해주세요.';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = '올바른 이메일 형식을 입력해주세요.';
        }
        if (!formData.password) {
            newErrors.password = '비밀번호를 입력해주세요.';
        } else if (formData.password.length < 8) {
            newErrors.password = '비밀번호는 8자 이상 입력해주세요.';
        } else if (!/(?=.*[a-z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = '영문 소문자, 숫자를 포함해야 합니다.';
        }

        if (!formData.name) {
            newErrors.name = '이름을 입력해주세요.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignup = async () => {
        if (!validateForm()) return;
    
        const requestBody = {
            email: formData.email,
            name: formData.name,
            password: formData.password,
        };
        try {
            const response = await fetch(`${API_BASE_URL}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     Accept: 'application/json'
                },
                body: JSON.stringify(requestBody),
            });
    
            const text = await response.text();
            if (!response.ok) {
                throw new Error(text || '회원가입 실패');
            }
    
            const result = JSON.parse(text);
            console.log('회원가입 성공:', result);
    
            Alert.alert('회원가입 완료', `${result.name}님, 환영합니다!`);
            navigation.navigate('Login');
        } catch (error) {
            console.error('Signup error:', error);
            const errorMessage = error instanceof Error ? error.message : '회원가입 중 문제가 발생했습니다.';
            Alert.alert('회원가입 실패', errorMessage);
        }
    };
    const handleLogin = () => {
        navigation.navigate('Login');
    };

    const handleInputChange = (field: keyof FormData, value: string): void => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        if (errors[field]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: '',
            }));
        }
    };

    return (
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <View style={styles.headerSection}>
                    <Text style={styles.formTitle}>회원가입</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>
                        이메일 주소 <Text style={styles.requiredMark}>*</Text>
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            focusedFields.email && styles.inputFocused,
                            errors.email && styles.inputError
                        ]}
                        placeholder="example@email.com"
                        placeholderTextColor="#aaa"
                        value={formData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                    />
                    {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>
                        이름 <Text style={styles.requiredMark}>*</Text>
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            focusedFields.name && styles.inputFocused,
                            errors.name && styles.inputError
                        ]}
                        placeholder="이름을 입력하세요"
                        placeholderTextColor="#aaa"
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        onFocus={() => handleFocus('name')}
                        onBlur={() => handleBlur('name')}
                    />
                    {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>
                        비밀번호 <Text style={styles.requiredMark}>*</Text>
                    </Text>
                    <TextInput
                        style={[
                            styles.input,
                            focusedFields.password && styles.inputFocused,
                            errors.password && styles.inputError
                        ]}
                        placeholder="영문 대소문자, 숫자 포함 8자 이상"
                        placeholderTextColor="#aaa"
                        value={formData.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                        onFocus={() => handleFocus('password')}
                        onBlur={() => handleBlur('password')}
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />
                    {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                </View>

                <TouchableOpacity 
                    style={styles.primaryButton} 
                    onPress={handleSignup}
                    activeOpacity={0.8}
                >
                    <Text style={styles.primaryButtonText}>회원가입</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.textLink}
                    onPress={handleLogin}
                    activeOpacity={0.7}
                >
                    <Text style={styles.textLinkText}>
                        이미 계정이 있으신가요?{' '}
                        <Text style={styles.textLinkHighlight}>로그인</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Signup;

