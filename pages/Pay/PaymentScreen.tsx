import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Product {
  id: number;
  name: string;
  price: string;
  seller: string;
  description: string;
  image: { uri: string };
}

interface PaymentScreenParams {
  selectedProduct: Product;
  totalAmount: string;
  userName: string;
  userPhone: string;
  userAddress: string;
}

export default function PaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    selectedProduct,
    totalAmount,
    userName,
    userPhone,
    userAddress,
  } = route.params as PaymentScreenParams;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  if (!selectedProduct || !selectedProduct.id) {
    Alert.alert('오류', '상품 정보가 유효하지 않습니다.');
    navigation.goBack();
    return null;
  }

  const handlePaymentPress = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleFinalPayment = () => {
    if (selectedPaymentMethod) {
      placeOrder();
    } else {
      Alert.alert('안내', '결제 방식을 선택해 주세요.');
    }
  };

  const placeOrder = async () => {
    try {
      const orderData = {
        productId: selectedProduct.id,
        quantity: 1,
        totalPrice: parseInt(totalAmount.replace(/[^0-9]/g, ''), 10),
        username: userName,
        number: userPhone,
        address: userAddress,
      };

      const res = await fetch('http://34.64.226.141/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) throw new Error(await res.text());

      Alert.alert('성공', '주문이 완료되었습니다.');
      navigation.goBack();
    } catch (err: any) {
      console.error('주문 실패:', err.message);
      Alert.alert('오류', err.message);
    }
  };

  const paymentMethods = [
    { name: '신용카드', icon: 'card' },
    { name: '네이버페이', icon: 'logo-buffer' },
    { name: '카카오페이', icon: 'chatbubble' },
    { name: '토스 페이', icon: 'wallet' },
    { name: '애플 페이', icon: 'logo-apple' },
    { name: '페이코', icon: 'phone-portrait' },
  ];

  return (
    <Modal visible={true} animationType="slide" presentationStyle="fullScreen">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Ionicons name="chevron-back" size={28} color="#2d5a3d" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>결제하기</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="receipt" size={24} color="#4a7c59" />
              <Text style={styles.sectionTitle}>주문 금액</Text>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>상품 금액</Text>
                <Text style={styles.infoValue}>{totalAmount}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>배송비</Text>
                <Text style={styles.infoValue}>3,000원</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>배송비 할인</Text>
                <Text style={[styles.infoValue, styles.discountText]}>-3,000원</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>총 결제 금액</Text>
                <Text style={styles.totalValue}>{totalAmount}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="location" size={24} color="#4a7c59" />
              <Text style={styles.sectionTitle}>배송 정보</Text>
            </View>
            
            <View style={styles.infoCard}>
              <View style={styles.addressRow}>
                <Text style={styles.addressLabel}>받는 분</Text>
                <Text style={styles.addressValue}>{userName}</Text>
              </View>
              <View style={styles.addressRow}>
                <Text style={styles.addressLabel}>연락처</Text>
                <Text style={styles.addressValue}>{userPhone}</Text>
              </View>
              <View style={styles.addressRow}>
                <Text style={styles.addressLabel}>배송 주소</Text>
                <Text style={[styles.addressValue, styles.addressText]}>{userAddress}</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="card" size={24} color="#4a7c59" />
              <Text style={styles.sectionTitle}>결제 수단 선택</Text>
            </View>
            
            <View style={styles.paymentGrid}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.name}
                  style={[
                    styles.paymentButton,
                    selectedPaymentMethod === method.name && styles.paymentButtonSelected,
                  ]}
                  onPress={() => handlePaymentPress(method.name)}
                  activeOpacity={0.7}
                >
                  <View style={styles.paymentButtonContent}>
                    <Ionicons 
                      name={method.icon as any} 
                      size={28} 
                      color={selectedPaymentMethod === method.name ? '#4a7c59' : '#6b7c6b'} 
                      style={styles.paymentIcon}
                    />
                    <Text
                      style={[
                        styles.paymentButtonText,
                        selectedPaymentMethod === method.name && styles.paymentButtonTextSelected,
                      ]}
                    >
                      {method.name}
                    </Text>
                  </View>
                  {selectedPaymentMethod === method.name && (
                    <View style={styles.selectedIndicator}>
                      <Ionicons name="checkmark-circle" size={24} color="#4a7c59" />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.bottomSpacing} />
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={[
              styles.payButton,
              !selectedPaymentMethod && styles.payButtonDisabled
            ]} 
            activeOpacity={0.8} 
            onPress={handleFinalPayment}
          >
            <View style={styles.payButtonContent}>
              <Ionicons name="card" size={24} color="#ffffff" />
              <Text style={styles.payButtonText}>
                {totalAmount} 결제하기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8faf9' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8f5e8',
    shadowColor: '#4a7c59',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  closeButton: { 
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#2d5a3d' 
  },
  placeholder: { 
    width: 44 
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#2d5a3d',
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e8f5e8',
    shadowColor: '#4a7c59',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: { 
    fontSize: 16, 
    color: '#6b7c6b',
    fontWeight: '500',
  },
  infoValue: { 
    fontSize: 16, 
    color: '#2d5a3d', 
    fontWeight: '600' 
  },
  discountText: {
    color: '#4a7c59',
  },
  divider: {
    height: 1,
    backgroundColor: '#e8f5e8',
    marginVertical: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f8f0',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  totalLabel: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#2d5a3d' 
  },
  totalValue: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#4a7c59' 
  },
  addressRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  addressLabel: {
    fontSize: 16,
    color: '#6b7c6b',
    fontWeight: '500',
    width: 80,
    marginRight: 12,
  },
  addressValue: {
    fontSize: 16,
    color: '#2d5a3d',
    fontWeight: '600',
    flex: 1,
  },
  addressText: {
    lineHeight: 24,
  },
  paymentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  paymentButton: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e8f5e8',
    minHeight: 100,
    position: 'relative',
    shadowColor: '#4a7c59',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  paymentButtonSelected: {
    backgroundColor: '#f0f8f0',
    borderColor: '#4a7c59',
    shadowOpacity: 0.15,
  },
  paymentButtonContent: {
    alignItems: 'center',
  },
  paymentIcon: {
    marginBottom: 8,
  },
  paymentButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6b7c6b',
    textAlign: 'center',
  },
  paymentButtonTextSelected: {
    color: '#4a7c59',
    fontWeight: '700',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  bottomSpacing: {
    height: 100,
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e8f5e8',
    paddingBottom: 34,
  },
  payButton: {
    backgroundColor: '#4a7c59',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4a7c59',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  payButtonDisabled: {
    backgroundColor: '#6b7c6b',
    shadowOpacity: 0.1,
  },
  payButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
});