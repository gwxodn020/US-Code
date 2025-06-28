'use client';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Footer from '../../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Order = {
  orderId: number;
  productName: string;
  quantity: number;
  username: string;
  number: string;
  address: string;
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const sellerId = await AsyncStorage.getItem('sellerId');
        if (!sellerId) throw new Error('판매자 정보 없음');
        const res = await fetch(`http://34.64.226.141/api/orders/seller/${sellerId}`);
        const data = await res.json();
        setOrders(data.orderList || []);
      } catch (e) {
        Alert.alert('오류', '주문 정보를 불러오지 못했습니다.');
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleAccept = async (orderId: number) => {
    try {
      const res = await fetch(`http://34.64.226.141/api/orders/${orderId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: 'PAID' }),
      });
      if (!res.ok) throw new Error();
      Alert.alert('수락', `${orderId}번 주문을 수락했습니다.`);
      setOrders(prev => prev.filter(o => o.orderId !== orderId));
    } catch (e) {
      Alert.alert('오류', '주문 수락에 실패했습니다.');
    }
  };

  const handleRefund = (orderId: number) => {
    Alert.alert(
      '경고',
      '정말 이 주문을 취소하시겠습니까?',
      [
        { text: '아니요' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => setOrders((prev) => prev.filter((o) => o.orderId !== orderId)),
        },
      ],
      { cancelable: true }
    );
  };
  const handleRefundAll = () => {
    Alert.alert(
      '경고',
      '정말 모든 주문을 취소 하시겠습니까?',
      [
        { text: '아니요' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => setOrders([]),
        },
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }: { item: Order }) => (
    <View style={styles.card}>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleAccept(item.orderId)}
        >
          <Text style={styles.acceptButtonText}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.refundButton}
          onPress={() => handleRefund(item.orderId)}
        >
          <Text style={styles.refundButtonText}>환불</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.product}>{item.productName} x {item.quantity}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.label}>받는 분:</Text>
        <Text style={styles.value}>{item.username}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>연락처:</Text>
        <Text style={styles.value}>{item.number}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.label}>주소:</Text>
        <Text style={styles.value}>{item.address}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>주문 데이터</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#4a7c59" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
      {orders.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.refundAllBtn}
            onPress={handleRefundAll}
          >
            <Text style={styles.refundAllText}>전체 환불하기</Text>
          </TouchableOpacity>
        </View>
      )}
        <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8faf9' 
  },
  header: {
    paddingVertical: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8f5e8',
    backgroundColor: '#fff',
  },
  headerText: { 
    fontSize: 28, 
    fontWeight: '600',
    color: '#2d5a3d'
  },

  card: {
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8f5e8',
    position: 'relative',
    shadowColor: '#4a7c59',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonRow: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#4a7c59',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  acceptButtonText: { 
    color: '#fff', 
    fontWeight: '500',
    fontSize: 13
  },
  refundButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#a8c4a2',
  },
  refundButtonText: { 
    color: '#4a7c59', 
    fontWeight: '500',
    fontSize: 13
  },

  product: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 12,
    color: '#2d5a3d',
    paddingRight: 120
  },
  infoRow: { 
    flexDirection: 'row', 
    marginBottom: 6,
    alignItems: 'flex-start'
  },
  label: { 
    width: 70, 
    color: '#6b7c6b',
    fontSize: 14
  },
  value: { 
    flex: 1, 
    color: '#2d5a3d',
    fontSize: 14,
    lineHeight: 20
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e8f5e8',
  },
  refundAllBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4a7c59',
  },
  refundAllText: { 
    color: '#4a7c59', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});
