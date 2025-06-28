'use client';

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';

export default function MyPage() {
  const navigation = useNavigation();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      // 1) 유저 정보
      const userId = await AsyncStorage.getItem('userId');
      const role = await AsyncStorage.getItem('userRole');  // 'seller' or 'user'
      if (!userId) {
        Alert.alert('오류', '로그인이 필요합니다.');
        navigation.navigate('Login' as never);
        return;
      }

      try {
        const res = await fetch(`http://34.64.226.141/api/users/${userId}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setName(data.name ?? '');
        setPhone(data.number ?? '');
        setAddress(data.address ?? '');
      } catch (err: any) {
        console.error(err);
        Alert.alert('불러오기 실패', '유저 정보를 가져오지 못했습니다.');
      }
      try {
        let url: string;
        if (role === 'seller') {
          const sellerId = await AsyncStorage.getItem('sellerId');
          if (!sellerId) throw new Error('판매자 정보가 없습니다.');
          url = `http://34.64.226.141/api/orders/seller/${sellerId}`;
        } else {
          url = `http://34.64.226.141/api/orders/buyer/${userId}`;
        }

        const res2 = await fetch(url);
        if (!res2.ok) throw new Error(await res2.text());
        const json2 = await res2.json();
        setOrders(Array.isArray(json2.orderList) ? json2.orderList : []);
      } catch (err: any) {
        console.error(err);
      }
    })();
  }, [navigation]);

  const save = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      Alert.alert('오류', '로그인이 필요합니다.');
      return;
    }
    try {
      const res = await fetch(`http://34.64.226.141/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, number: phone, address }),
      });
      if (!res.ok) throw new Error(await res.text());
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userPhone', phone);
      await AsyncStorage.setItem('userAddress', address);
      Alert.alert('저장 완료', '정보가 업데이트되었습니다.');
      setEditing(false);
    } catch (err: any) {
      console.error(err);
      Alert.alert('저장 실패', '정보를 저장하지 못했습니다.');
    }
  };

  const renderOrder = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>주문 #{item.orderId}</Text>
        {'status' in item && (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        )}
      </View>
      <Text style={styles.productName}>{item.productName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>마이페이지</Text>
          <Text style={styles.pageSubtitle}>내 정보를 확인하고 관리해보세요</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>개인정보</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>이름</Text>
            <TextInput 
              style={[styles.input, !editing && styles.inputDisabled]} 
              value={name} 
              editable={editing} 
              onChangeText={setName}
              placeholder="이름을 입력해주세요"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>연락처</Text>
            <TextInput
              style={[styles.input, !editing && styles.inputDisabled]}
              value={phone}
              editable={editing}
              keyboardType="phone-pad"
              onChangeText={setPhone}
              placeholder="연락처를 입력해주세요"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>주소</Text>
            <TextInput 
              style={[styles.input, !editing && styles.inputDisabled]} 
              value={address} 
              editable={editing} 
              onChangeText={setAddress}
              placeholder="주소를 입력해주세요"
              placeholderTextColor="#999"
              multiline
            />
          </View>

          <TouchableOpacity 
            style={[styles.primaryButton, editing && styles.saveButton]} 
            onPress={editing ? save : () => setEditing(true)}
          >
            <Text style={styles.primaryButtonText}>
              {editing ? '저장하기' : '정보 수정'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>주문 내역</Text>
          {orders.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>아직 주문 내역이 없습니다</Text>
              <Text style={styles.emptyStateSubtext}>첫 주문을 해보세요!</Text>
            </View>
          ) : (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.orderId.toString()}
              renderItem={renderOrder}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={async () => {
              Alert.alert(
                '로그아웃', 
                '정말 로그아웃 하시겠습니까?',
                [
                  { text: '취소', style: 'cancel' },
                  { 
                    text: '확인', 
                    onPress: async () => {
                      await AsyncStorage.clear();
                      Alert.alert('로그아웃', '정상적으로 로그아웃되었습니다.');
                      navigation.navigate('Login' as never);
                    }
                  }
                ]
              );
            }}
          >
            <Text style={styles.logoutButtonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf9',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  
  headerSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#e8f5e8',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2d5a3d',
    textAlign: 'center',
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#6b7c6b',
    textAlign: 'center',
    lineHeight: 22,
  },

  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d5a3d',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8f5e8',
  },

  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a7c59',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e8f5e8',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2d5a3d',
    backgroundColor: '#fff',
    minHeight: 50,
  },
  inputDisabled: {
    backgroundColor: '#f8faf9',
    color: '#6b7c6b',
  },
  primaryButton: {
    backgroundColor: '#4a7c59',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#4a7c59',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButton: {
    backgroundColor: '#2d5a3d',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e8f5e8',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#6b7c6b',
    fontSize: 16,
    fontWeight: '600',
  },

  orderCard: {
    backgroundColor: '#f8faf9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8f5e8',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7c6b',
  },
  statusBadge: {
    backgroundColor: '#4a7c59',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d5a3d',
    lineHeight: 22,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7c6b',
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
  },
});