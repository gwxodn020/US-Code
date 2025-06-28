#  uscode – (팀명:처음처럼) 농산물 직거래/주문 React Native 앱

## 소개
지역 농산물 생산자와 소비자를 연결하는 모바일 직거래 플랫폼입니다
판매자는 상품을 등록하고, 소비자는 손쉽게 주문/결제할 수 있습니다.

---

## 기술 스택

|      분류      |          사용 기술/도구         | 설명                                    |
| :----------: | :-----------------------: | :------------------------------------ |
|    **언어**    |  JavaScript / TypeScript  | RN 기반 개발, 타입 안정성/생산성 강화               |
|   **프레임워크**  |        React Native       | 크로스플랫폼 모바일 앱(안드로이드/iOS) 개발            |
|   **상태 관리**  | React State, AsyncStorage | 간단한 상태/토큰, 사용자 정보 로컬 저장               |
| **UI 라이브러리** | React Native Vector Icons | 아이콘 등 시각적 요소                          |
|   **네비게이션**  |      React Navigation     | 화면(페이지) 전환, 탭/스택 구조                   |
| **네이티브 API** | ImagePicker, SafeAreaView | 이미지 업로드/미리보기, 화면 안전 영역 지원             |
|    **통신**    |    Fetch API (RESTful)    | 상품/주문/회원 관련 서버와 통신 (GET, POST 등)      |
|    **디자인**   |    StyleSheet, 커스텀 스타일    | 모바일 최적화 맞춤 스타일                        |

---

## 폴더 구조 및 주요 파일 역할
```
    uscode/
    ├── App.tsx                     # 앱 시작점, 네비게이션 구성
    ├── package.json                # 의존성, 스크립트
    ├── android/                    # 안드로이드 네이티브 코드
    ├── ios/                        # iOS 네이티브 코드
    ├── assets/                     # 배너/썸네일 등 이미지 리소스
    │   └── banner1.jpg, ...
    ├── components/                 # 공통 UI 컴포넌트
    │   └── Footer.tsx              # 하단 탭(권한별 메뉴 분기)
    ├── screens/                    # 주요 화면/기능별 코드
    │   ├── HomeScreen.tsx          # 상품 목록/검색/상세/결제 연결
    │   ├── ProductUploadScreen.tsx # 판매자 상품 등록 (이미지, 입력폼)
    │   ├── OrderListScreen.tsx     # 판매자 주문 관리/수락/환불
    │   ├── LoginScreen.tsx         # 로그인/인증, 토큰/권한 저장
    │   └── SignUpScreen.tsx        # 회원가입
    ├── Pay/
    │   └── PaymentScreen.tsx       # 결제(주문 생성, 완료 표시)
    ├── styles/                     # (선택) 각 화면별 스타일 분리
    ├── utils/                      # (선택) API, 공통 유틸
    │   └── api.ts                  # fetch 등 서버통신 함수
```

---

## 주요 파일별 역할
`App.tsx`
전체 앱의 시작, 네비게이션(페이지 이동) 세팅

`Footer.tsx`
하단 탭바 유저 권한(구매자/판매자)에 따라 버튼 노출 다르게 분기

`HomeScreen.tsx`
상품 목록/검색 상세모달 결제 연결 등 메인 홈화면

`ProductUploadScreen.tsx`
판매자 상품 등록(이미지 업로드 입력폼 FormData API 전송)

`OrderListScreen.tsx`
판매자 주문 목록 불러오기 주문 수락/환불(POST 등 API)

`LoginScreen.tsx`
이메일/비번 로그인 → 토큰 userId userRole 등 AsyncStorage 저장

`PaymentScreen.tsx`
결제/주문 생성 결제 완료 화면

---

## API 사용
+ 상품 목록 조회: GET /api/products

+ 상품 상세 조회: GET /api/products/{productId}

+ 상품 등록: POST /api/products (FormData)

+ 주문 목록(판매자): GET /api/orders/seller/{sellerId}

+ 주문 수락: POST /api/orders/{orderId} (status: PAID)

+ 주문 생성: POST /api/orders (구매 시)


