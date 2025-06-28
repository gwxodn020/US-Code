// navigation/types.ts
export type RootStackParamList = {
    Home: undefined;
    ProductDetail: {
      product: {
        id: number;
        name: string;
        price: string;
        seller: string;
        description: string;
        image: { uri: string };
        grade: string;
      };
      userName: string;
      userPhone: string;
      userAddress: string;
    };

    PaymentScreen: {
      selectedProduct: {
        id: number;
        name: string;
        price: string;
        seller: string;
        description: string;
        image: { uri: string };
        grade: string;
      };
      totalAmount: string;
      userName: string;
      userPhone: string;
      userAddress: string;
    };
  };
  