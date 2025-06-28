'use client';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Footer from '../../components/Footer';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type RouteProp = import('@react-navigation/native').RouteProp<RootStackParamList, 'ProductDetail'>;
type NavProp = StackNavigationProp<RootStackParamList>;

export default function ProductDetailScreen() {
  const { params } = useRoute<RouteProp>();
  const nav = useNavigation<NavProp>();
  const { product, userName, userPhone, userAddress } = params;
  
  const [detail, setDetail] = useState<{ imgUrl: string; name: string; sellerName: string; price: number; description: string; grade: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://34.64.226.141/api/products/${product.id}`)
      .then(r => r.json())
      .then(j => setDetail({ ...j, imgUrl: `http://34.64.226.141${j.imgUrl}` }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [product.id]);

  const onBuy = () => {
    nav.navigate('PaymentScreen', {
      selectedProduct: product,
      totalAmount: product.price,
      userName,
      userPhone,
      userAddress,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a7c59" />
        <Text style={styles.loadingText}>상품 정보를 불러오는 중...</Text>
      </View>
    );
  }

  if (!detail) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>상품 정보를 찾을 수 없습니다</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: detail.imgUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.name}>{detail.name}</Text>
          
          <View style={styles.sellerContainer}>
            <Text style={styles.sellerLabel}>판매자</Text>
            <Text style={styles.seller}>{detail.sellerName}</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{detail.price.toLocaleString()}원</Text>
          </View>
        </View>

        <View style={styles.descCard}>
          <Text style={styles.descTitle}>상품 설명</Text>
          <Text style={styles.desc}>품질 등급:{detail.grade}</Text>
          <Text style={styles.desc}>{detail.description}</Text>
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buyBtn} onPress={onBuy}>
          <Text style={styles.buyText}>바로 구매하기</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf9',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#f8faf9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7c6b',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#f8faf9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#6b7c6b',
    textAlign: 'center',
  },
  imageContainer: {
    padding: 16,
    paddingBottom: 12,
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 16,
    backgroundColor: '#e8f5e8',
    shadowColor: '#4a7c59',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoCard: {
    margin: 16,
    marginTop: 8,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e8f5e8',
    shadowColor: '#4a7c59',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d5a3d',
    marginBottom: 16,
    lineHeight: 32,
  },
  sellerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e8f5e8',
  },
  sellerLabel: {
    fontSize: 16,
    color: '#6b7c6b',
    marginRight: 8,
    fontWeight: '500',
  },
  seller: {
    fontSize: 16,
    color: '#4a7c59',
    fontWeight: '600',
  },
  priceContainer: {
    backgroundColor: '#f0f8f0',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8f5e8',
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#4a7c59',
    textAlign: 'center',
  },
  descCard: {
    margin: 16,
    marginTop: 8,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e8f5e8',
    shadowColor: '#4a7c59',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  descTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d5a3d',
    marginBottom: 16,
  },
  desc: {
    fontSize: 17,
    color: '#2d5a3d',
    lineHeight: 26,
  },
  bottomSpacing: {
    height: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8faf9',
    borderTopWidth: 1,
    borderTopColor: '#e8f5e8',
  },
  buyBtn: {
    backgroundColor: '#4a7c59',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#4a7c59',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buyText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});