import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  Easing,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native';

const { height } = Dimensions.get('window');

type RootStackParamList = {
  AuthWelcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
  My: undefined;
  ProductUploadScreen: undefined;
  OrderList: undefined;
  Loding: undefined;
  ChatbotScreen: undefined;
};

const Footer = React.memo(() => {
  const [isSeller, setIsSeller] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(height));
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fetchRole = useCallback(async () => {
    try {
      const role = await AsyncStorage.getItem('userRole');
      setIsSeller(role === 'seller');
    } catch (error) {
      console.error('Role fetch error:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchRole();
    }, [fetchRole])
  );

  
  const closeMenu = useCallback(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMenuVisible(false);
    });
  }, [fadeAnim, slideAnim]);

  const navigateToHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const navigateToMy = useCallback(() => {
    navigation.navigate('My');
  }, [navigation]);

  const navigateToChatbot = useCallback(() => {
    navigation.navigate('ChatbotScreen');
  }, [navigation]);

  const openMenu = useCallback(() => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  
  const navigateToUpload = useCallback(() => {
    closeMenu();
    navigation.navigate('ProductUploadScreen');
  }, [navigation, closeMenu]);

  const navigateToOrderList = useCallback(() => {
    closeMenu();
    navigation.navigate('OrderList');
  }, [navigation, closeMenu]);

  const firstTab = useMemo(() => {
    if (isSeller) {
      return (
        <TouchableOpacity
          style={styles.tab}
          onPress={openMenu}
          activeOpacity={0.7}
        >
          <Ionicons name="menu-outline" size={24} color="#4a7c59" />
          <Text style={styles.label}>메뉴</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.tab}
          onPress={navigateToChatbot}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#4a7c59" />
          <Text style={styles.label}>상담</Text>
        </TouchableOpacity>
      );
    }
  }, [isSeller, openMenu, navigateToChatbot]);

  const MenuModal = () => (
    <Modal
      visible={menuVisible}
      transparent
      animationType="none"
      onRequestClose={closeMenu}
    >
      <TouchableWithoutFeedback onPress={closeMenu}>
        <Animated.View 
          style={[
            styles.modalOverlay,
            { opacity: fadeAnim }
          ]}
        >
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.menuContainer,
                { transform: [{ translateY: slideAnim }] }
              ]}
            >
              {/* 상단 핸들 */}
              <View style={styles.handle} />
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>판매자 메뉴</Text>
                <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#6b7c6b" />
                </TouchableOpacity>
              </View>
              <View style={styles.menuOptions}>
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={navigateToUpload}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuOptionIcon}>
                    <Ionicons name="add-circle-outline" size={28} color="#4a7c59" />
                  </View>
                  <View style={styles.menuOptionContent}>
                    <Text style={styles.menuOptionTitle}>상품 등록</Text>
                    <Text style={styles.menuOptionSubtitle}>새로운 상품을 등록하세요</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#6b7c6b" />
                </TouchableOpacity>
                <View style={styles.menuDivider} />
                <TouchableOpacity
                  style={styles.menuOption}
                  onPress={navigateToOrderList}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuOptionIcon}>
                    <Ionicons name="receipt-outline" size={28} color="#4a7c59" />
                  </View>
                  <View style={styles.menuOptionContent}>
                    <Text style={styles.menuOptionTitle}>주문 관리</Text>
                    <Text style={styles.menuOptionSubtitle}>주문 현황을 확인하고 관리하세요</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#6b7c6b" />
                </TouchableOpacity>
              </View>
              <View style={styles.menuFooter}>
                <Text style={styles.menuFooterText}>판매자 전용 기능</Text>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <>
      <View style={styles.container}>
        {firstTab}
        <TouchableOpacity
          style={styles.tab}
          onPress={navigateToHome}
          activeOpacity={0.7}
        >
          <Ionicons name="home-outline" size={24} color="#4a7c59" />
          <Text style={styles.label}>홈</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={navigateToMy}
          activeOpacity={0.7}
        >
          <Ionicons name="person-outline" size={24} color="#4a7c59" />
          <Text style={styles.label}>마이</Text>
        </TouchableOpacity>
      </View>
      <MenuModal />
    </>
  );
});

Footer.displayName = 'Footer';

export default Footer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e8f5e8',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    elevation: 4,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    minWidth: 70,
    borderRadius: 8,
  },
  label: {
    fontSize: 13,
    marginTop: 4,
    color: '#4a7c59', 
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: height * 0.35,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 8,
    elevation: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#e8f5e8',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#e8f5e8',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e8f5e8',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d5a3d',
  },
  closeButton: {
    padding: 6,
    borderRadius: 12,
  },
  menuOptions: {
    paddingTop: 12,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    backgroundColor: '#fff',
  },
  menuOptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f8f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuOptionContent: {
    flex: 1,
  },
  menuOptionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2d5a3d',
    marginBottom: 3,
  },
  menuOptionSubtitle: {
    fontSize: 14,
    color: '#6b7c6b',
    lineHeight: 18,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#e8f5e8',
    marginHorizontal: 24,
    marginVertical: 4,
  },
  menuFooter: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e8f5e8',
    alignItems: 'center',
    marginTop: 8,
  },
  menuFooterText: {
    fontSize: 13,
    color: '#6b7c6b',
    fontWeight: '500',
  },
});