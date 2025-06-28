"use client"

import { useState, useEffect } from "react"
import { View, Text, TextInput, Image, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from "react-native"
import { launchImageLibrary, type Asset } from "react-native-image-picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { styles } from "./ProductUploadScreenst"

export default function ProductUploadScreen() {
    const [userId, setUserId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    useEffect(() => {
        const fetchUserId = async () => {
            setIsLoading(true)
            try {
                const storedUserId = await AsyncStorage.getItem("userId")
                if (storedUserId) {
                    setUserId(storedUserId)
                } else {
                    console.log("저장된 userId가 없습니다.")
                }
            } catch (error) {
                console.error("userId 가져오기 오류:", error)
                Alert.alert("오류", "사용자 정보를 불러오는데 실패했습니다.")
            } finally {
                setIsLoading(false)
            }
        }
        fetchUserId()
    }, [])

    const [image, setImage] = useState<Asset | null>(null)
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setdescription] = useState("")
    const [focusedInput, setFocusedInput] = useState<string | null>(null)

    const pickImage = async () => {
        launchImageLibrary(
            {
                mediaType: "photo",
                quality: 0.8,
                maxWidth: 1024,
                maxHeight: 1024,
            },
            async (response) => {
                if (response.didCancel) return
                if (response.errorMessage) {
                    Alert.alert("오류", response.errorMessage)
                    return
                }

                if (response.assets && response.assets.length > 0) {
                    const selectedImage = response.assets[0]
                    setImage(selectedImage)
                }
            },
        )
    }

    const removeImage = () => {
        setImage(null)
    }

    const validateForm = () => {
        if (!image) {
            Alert.alert("알림", "상품 이미지를 선택해주세요.")
            return false
        }
        if (!name.trim()) {
            Alert.alert("알림", "상품명을 입력해주세요.")
            return false
        }
        if (!price.trim()) {
            Alert.alert("알림", "가격을 입력해주세요.")
            return false
        }
        if (isNaN(Number(price)) || Number(price) <= 0) {
            Alert.alert("알림", "올바른 가격을 입력해주세요.")
            return false
        }
        if (!description.trim()) {
            Alert.alert("알림", "상품 설명을 입력해주세요.")
            return false
        }
        return true
    }
    const uploadProduct = async () => {
        if (!validateForm()) return;
        if (!userId) {
          return Alert.alert('로그인이 필요합니다.');
        }
      
        setIsUploading(true);
        try {
          const formData = new FormData();
          if (image?.uri) {
            formData.append('image', {
              uri: image.uri.startsWith('file://') ? image.uri : `file://${image.uri}`,
              type: image.type ?? 'image/jpeg',
              name: image.fileName ?? `upload_${Date.now()}.jpg`,
            } as any);
          }
          formData.append('userId',  userId);
          formData.append('name',    name.trim());
          formData.append('price',   price.trim());        // 또는 Number(price)
          formData.append('description', description.trim());
      
          /* ⚠️ 헤더 생략! RN이 multipart/form-data + boundary 자동 추가 */
          const res = await fetch('http://34.64.226.141/api/products', {
            method: 'POST',
            body: formData,
          });
      
          /* ─── 빈 바디 대비 안전 파싱 ─── */
          const raw = await res.text();
          const result = raw ? JSON.parse(raw) : {};
      
          if (!res.ok) throw new Error(result.message ?? `업로드 실패 (${res.status})`);
      
          Alert.alert('등록 성공', '상품이 등록되었습니다!', [
            { text: '확인', onPress: () => {
                setImage(null); setName(''); setPrice(''); setdescription('');
            }},
          ]);
        } catch (err: any) {
          console.error('업로드 오류:', err);
          Alert.alert('업로드 실패', err.message ?? '알 수 없는 오류가 발생했습니다.');
        } finally {
          setIsUploading(false);
        }
      };      
    if (isLoading && !userId) {
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 10 }}>사용자 정보를 불러오는 중...</Text>
            </View>
        )
    }

    return (
        <>
            <View style={styles.headerSection}>
                <Text style={styles.header}>상품 등록</Text>
            </View>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.scroll}>
                    <View style={styles.imageSection}>
                        <Text style={styles.sectionTitle}>상품 이미지</Text>
                        <TouchableOpacity style={styles.imageBox} onPress={pickImage} activeOpacity={0.7}>
                            {image ? (
                                <View style={{ position: "relative" }}>
                                    <Image source={{ uri: image.uri }} style={styles.image} />
                                    <TouchableOpacity
                                        style={{
                                            position: "absolute",
                                            top: 10,
                                            right: 10,
                                            backgroundColor: "rgba(0,0,0,0.6)",
                                            borderRadius: 15,
                                            width: 30,
                                            height: 30,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                        onPress={removeImage}
                                    >
                                        <Text style={{ color: "white", fontSize: 18 }}>×</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={{ alignItems: "center" }}>
                                    <Text style={styles.imageText}>사진을 선택해주세요</Text>
                                    {isLoading && <ActivityIndicator style={{ marginTop: 10 }} />}
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.formSection}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>상품명 *</Text>
                            <TextInput
                                style={[styles.input, focusedInput === "name" && styles.inputFocused]}
                                placeholder="예: 유기농 사과"
                                placeholderTextColor="#aaa"
                                value={name}
                                onChangeText={setName}
                                onFocus={() => setFocusedInput("name")}
                                onBlur={() => setFocusedInput(null)}
                                maxLength={50}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>가격 (원) *</Text>
                            <TextInput
                                style={[styles.input, focusedInput === "price" && styles.inputFocused]}
                                placeholder="예: 10000"
                                placeholderTextColor="#aaa"
                                keyboardType="numeric"
                                value={price}
                                onChangeText={(text) => {
                                    const numericText = text.replace(/[^0-9]/g, "")
                                    setPrice(numericText)
                                }}
                                onFocus={() => setFocusedInput("price")}
                                onBlur={() => setFocusedInput(null)}
                                maxLength={10}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>설명 *</Text>
                            <TextInput
                                style={[styles.description, focusedInput === "description" && styles.inputFocused]}
                                placeholder="상품에 대한 자세한 설명을 입력해주세요"
                                placeholderTextColor="#aaa"
                                multiline
                                value={description}
                                onChangeText={setdescription}
                                onFocus={() => setFocusedInput("description")}
                                onBlur={() => setFocusedInput(null)}
                                maxLength={500}
                            />
                            <Text style={{ fontSize: 12, color: "#666", textAlign: "right", marginTop: 5 }}>
                                {description.length}/500
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.actionSection}>
                    <TouchableOpacity
                        style={[
                            styles.uploadBtn,
                            (isUploading || !image || !name || !price || !description) && { opacity: 0.6 },
                        ]}
                        onPress={uploadProduct}
                        activeOpacity={0.8}
                        disabled={isUploading || !image || !name || !price || !description}
                    >
                        {isUploading ? (
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <ActivityIndicator color="white" style={{ marginRight: 10 }} />
                                <Text style={styles.uploadText}>등록 중...</Text>
                            </View>
                        ) : (
                            <Text style={styles.uploadText}>상품 등록하기</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}