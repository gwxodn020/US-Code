'use client';

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from './types';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeNavProp = StackNavigationProp<RootStackParamList, 'Home'>;

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();

  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<RootStackParamList['PaymentScreen']['selectedProduct'][]>([]);
  const [filtered, setFiltered] = useState(products);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const bannerImages = [
    require('../../assets/banner1.png'),
    require('../../assets/banner2.png'),
    require('../../assets/banner3.png'),
  ];
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    AsyncStorage.multiGet(['userName', 'userPhone', 'userAddress'])
      .then(pairs => {
        const data = Object.fromEntries(pairs as [string, string][]);
        setUserName(data.userName || '');
        setUserPhone(data.userPhone || '');
        setUserAddress(data.userAddress || '');
      });

    fetch('http://34.64.226.141/api/products')
      .then(res => res.json())
      .then(json => {
        const list = json.productList.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: `${p.price.toLocaleString()}원`,
          seller: p.sellerName,
          description: p.description || '',
          image: { uri: `http://34.64.226.141${p.imgUrl}` },
          grade: p.grade || '', 
        }));
        setProducts(list);
        setFiltered(list);
      })
      .catch(err => {
        console.error(err);
        Alert.alert('상품 조회 오류', '상품을 불러오지 못했습니다.');
      });
  }, [bannerImages.length]);

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    setFiltered(
      q
        ? products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.seller.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
          )
        : products
    );
  }, [searchQuery, products]);

  useEffect(() => {
    const id = setInterval(() => {
      setBannerIndex(i => (i + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [bannerImages.length]);

  const onProductClick = (item: typeof products[0]) => {
    navigation.navigate('ProductDetail', {
          product: {
            id: item.id,
            name: item.name,
            price: item.price,
            seller: item.seller,
            description: item.description,
            image: item.image,
            grade: item.grade
          },
          userName,
          userPhone,
          userAddress,
        });
  };

  return (
    <View style={styles.container}>
        <View style={styles.headerSection}>
        <Text style={styles.pageTitle}>상품 목록</Text>
        </View>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="상품명을 검색해보세요"
          placeholderTextColor="#6b7c6b"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        <Ionicons name="search" size={22} color="#4a7c59" />
      </View>

      {searchQuery.trim() === '' && (
        <View style={styles.bannerContainer}>
          <Image
            source={bannerImages[bannerIndex]}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerIndicator}>
            {bannerImages.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.indicatorDot,
                  i === bannerIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => onProductClick(item)}
          >
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.cardSeller} numberOfLines={1}>
                {item.seller}
              </Text>
              <Text style={styles.cardPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8faf9' 
  },
    maintitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 0,
        paddingVertical: 30,
        backgroundColor: '#4a7c59',
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
  searchBar: {
    flexDirection: 'row',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#e8f5e8',
  },
  searchInput: { 
    flex: 1, 
    marginRight: 12, 
    fontSize: 16,
    color: '#2d5a3d',
    fontWeight: '400',
  },
  bannerContainer: {
    height: 180,
    marginBottom: 20,
    marginHorizontal: 16,
    width: width - 32,
    alignSelf: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerIndicator: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e8f5e8',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#4a7c59',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8f5e8',
  },
  cardImage: {
    width: '100%',
    height: 130,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardContent: {
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d5a3d',
    lineHeight: 20,
    marginBottom: 4,
  },
  cardSeller: {
    fontSize: 13,
    color: '#6b7c6b',
    marginBottom: 6,
  },
  cardPrice: {
    fontSize: 16,
    color: '#4a7c59',
    fontWeight: '700',
  },
});