'use client';
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import Footer from '../../components/Footer';

type Message = { id: string; text: string; from: 'user' | 'bot' };

const API_KEY = 'API_KEY_HERE';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

const SYSTEM_PROMPT = `
[GCA AI 상담 매뉴얼 요약]  ───────────────────────────────
• 역할 : 24시간 고객센터 상담사. 문의 유형(상품 등급, 결제, 배송, 환불, 불편사항 등)을 파악해 친절히 해결한다.  
• 어투 : 정중한 존댓말 + '회원님' 호칭 + 핵심▶세부 순서. 한 단락 2~3문장으로 유지.
• 상품 등급 : A,B,C,D 등급으로 구분. A는 최고급, B는 일반, C는 가성비, D는 품질 미달.
• 결제 : 카드‧토스‧카카오‧네이버‧애플 Pay 지원, 무통장·가상계좌 불가. 
• 배송 : 기본 1~2일, 도서산간 +2일/3,000원, 3만 원 이상 무료·친환경 포장.
• 금지 : 의료·법률·투자 조언, 개인정보 요청, 욕설·혐오. 위반 질문엔 "전문가 상담 권장/답변 거부"로 대응.  
• 응답 템플릿 예시  
안녕하세요, 회원님! 😊  
—  
1. 상세 안내 …  
2. …  
—  
더 궁금한 점이 있으면 말씀해 주세요!  
────────────────────────────────────────────────────────
`.trim();

export default function ChatbotScreen() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: '0', text: '안녕하세요! 궁금한 점을 물어보세요.', from: 'bot' },
    ]);
    const [loading, setLoading] = useState(false);
    const flatRef = useRef<FlatList>(null);
    const validateInput = (text: string): boolean => {
        if (!text || text.trim().length === 0) return false;
        if (text.trim().length > 2000) return false; 
        return true;
    };
    const sanitizeText = (text: string): string => {
        return text
            .trim()
            .replace(/[\x00-\x1F\x7F]/g, '') 
            .substring(0, 2000);
    };

    async function getBotReply(question: string) {
        try {
            setLoading(true);
            if (!validateInput(question)) {
                throw new Error('유효하지 않은 입력입니다.');
            }

            const sanitizedQuestion = sanitizeText(question);
            const payload = {
                contents: [
                    {
                        parts: [
                            {
                                text: sanitizedQuestion
                            }
                        ]
                    }
                ],
                systemInstruction: {
                    parts: [
                        {
                            text: SYSTEM_PROMPT
                        }
                    ]
                },
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 512,
                    topP: 0.9,
                    topK: 40
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            };

            console.log('API 요청 페이로드:', JSON.stringify(payload, null, 2));

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            console.log('API 응답 상태:', res.status);

            if (!res.ok) {
                const errorText = await res.text();
                console.error('API 오류 응답:', errorText);
                
                let errorMessage = '죄송합니다. 일시적인 오류가 발생했습니다.';
                
                switch (res.status) {
                    case 400:
                        errorMessage = '요청 형식에 문제가 있습니다. 다시 시도해 주세요.';
                        break;
                    case 401:
                        errorMessage = 'API 키 인증에 실패했습니다.';
                        break;
                    case 403:
                        errorMessage = 'API 접근 권한이 없습니다.';
                        break;
                    case 404:
                        errorMessage = 'API 엔드포인트를 찾을 수 없습니다.';
                        break;
                    case 429:
                        errorMessage = '요청 한도를 초과했습니다. 잠시 후 다시 시도해 주세요.';
                        break;
                    case 500:
                    case 502:
                    case 503:
                        errorMessage = '서버에 일시적인 문제가 있습니다. 잠시 후 다시 시도해 주세요.';
                        break;
                }
                
                throw new Error(errorMessage);
            }

            const data = await res.json();
            console.log('API 응답 데이터:', JSON.stringify(data, null, 2));

            if (!data || !data.candidates || data.candidates.length === 0) {
                throw new Error('API로부터 유효한 응답을 받지 못했습니다.');
            }

            const candidate = data.candidates[0];
            
            if (candidate.finishReason === 'SAFETY') {
                return '죄송합니다. 해당 질문에 대해서는 답변을 드릴 수 없습니다. 다른 질문을 해주세요.';
            }

            const content = candidate.content;
            if (!content || !content.parts || content.parts.length === 0) {
                throw new Error('응답 콘텐츠가 비어있습니다.');
            }

            const botText = content.parts[0].text;
            if (!botText || typeof botText !== 'string') {
                throw new Error('응답 텍스트를 찾을 수 없습니다.');
            }

            return sanitizeText(botText);

        } catch (error: any) {
            console.error('getBotReply 오류:', error);
            
            if (error.name === 'AbortError') {
                return '요청 시간이 초과되었습니다. 다시 시도해 주세요.';
            }
            
            if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
                return '네트워크 연결을 확인하고 다시 시도해 주세요.';
            }

            return error.message || '알 수 없는 오류가 발생했습니다. 다시 시도해 주세요.';
        } finally {
            setLoading(false);
        }
    }

    const handleSend = async () => {
        const trimmedInput = input.trim();
        
        if (!trimmedInput || loading) {
            return;
        }

        if (!validateInput(trimmedInput)) {
            Alert.alert('입력 오류', '메시지가 너무 길거나 유효하지 않습니다.');
            return;
        }

        const userMsg: Message = { 
            id: Date.now().toString(), 
            text: trimmedInput, 
            from: 'user' 
        };
        
        setMessages((prev) => [...prev, userMsg]);
        setInput('');

        try {
            const botText = await getBotReply(trimmedInput);
            const botMsg: Message = { 
                id: `${Date.now()}b`, 
                text: botText, 
                from: 'bot' 
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error('메시지 전송 오류:', error);
            const errorMsg: Message = {
                id: `${Date.now()}e`,
                text: '죄송합니다. 메시지를 처리하는 중 오류가 발생했습니다.',
                from: 'bot'
            };
            setMessages((prev) => [...prev, errorMsg]);
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                flatRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages]);

    const renderItem = ({ item }: { item: Message }) => (
        <View style={[styles.row, item.from === 'user' ? styles.right : styles.left]}>
            <View style={[
                styles.bubble,
                item.from === 'user' ? styles.userBubble : styles.botBubble,
            ]}>
                <Text style={[
                    styles.txt,
                    item.from === 'user' ? styles.userTxt : styles.botTxt,
                ]}>{item.text}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.h1}>AI 상담</Text>
                <Text style={styles.h2}>궁금한 것을 물어보세요</Text>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <FlatList
                    ref={flatRef}
                    data={messages}
                    keyExtractor={(i) => i.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    maintainVisibleContentPosition={{
                        minIndexForVisible: 0,
                        autoscrollToTopThreshold: 10,
                    }}
                />

                <View style={styles.inputBar}>
                    <TextInput
                        value={input}
                        onChangeText={setInput}
                        placeholder="메시지를 입력해주세요 (최대 2000자)"
                        placeholderTextColor="#6b7c6b"
                        style={styles.input}
                        multiline
                        maxLength={2000}
                        editable={!loading}
                        returnKeyType="send"
                        onSubmitEditing={handleSend}
                        blurOnSubmit={false}
                    />
                    <TouchableOpacity
                        style={[
                            styles.sendBtn,
                            (loading || !input.trim()) && styles.sendBtnDisable,
                        ]}
                        onPress={handleSend}
                        disabled={loading || !input.trim()}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.sendTxt}>전송</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8faf9' },
    header: { 
        paddingTop: 54, 
        paddingBottom: 20, 
        backgroundColor: '#4a7c59', 
        alignItems: 'center' 
    },
    h1: { 
        fontSize: 22, 
        fontWeight: '700', 
        color: '#fff' 
    },
    h2: { 
        fontSize: 14, 
        color: 'rgba(255,255,255,.9)' 
    },
    list: { 
        padding: 16, 
        paddingBottom: 20 
    },
    row: { 
        flexDirection: 'row', 
        marginVertical: 8 
    },
    left: { 
        justifyContent: 'flex-start' 
    },
    right: { 
        justifyContent: 'flex-end' 
    },
    bubble: { 
        maxWidth: '85%', 
        borderRadius: 16, 
        padding: 12 
    },
    userBubble: { 
        backgroundColor: '#4a7c59', 
        borderBottomRightRadius: 6 
    },
    botBubble: { 
        backgroundColor: '#fff', 
        borderWidth: 1, 
        borderColor: '#e8f5e8', 
        borderBottomLeftRadius: 6 
    },
    txt: { 
        fontSize: 16, 
        lineHeight: 22 
    },
    userTxt: { 
        color: '#fff' 
    },
    botTxt: { 
        color: '#2d5a3d' 
    },
    inputBar: { 
        flexDirection: 'row', 
        padding: 16, 
        borderTopWidth: 1, 
        borderTopColor: '#e8f5e8', 
        backgroundColor: '#fff' 
    },
    input: { 
        flex: 1, 
        fontSize: 16, 
        backgroundColor: '#f8faf9', 
        borderRadius: 12, 
        padding: 12, 
        borderWidth: 1, 
        borderColor: '#e8f5e8',
        maxHeight: 100
    },
    sendBtn: { 
        marginLeft: 12, 
        paddingHorizontal: 20, 
        paddingVertical: 12, 
        borderRadius: 12, 
        backgroundColor: '#4a7c59',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendBtnDisable: { 
        backgroundColor: '#6b7c6b' 
    },
    sendTxt: { 
        color: '#fff', 
        fontSize: 16, 
        fontWeight: '600' 
    },
});