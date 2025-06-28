import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8faf9',
        paddingHorizontal: 24,
    },
    
    formTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#2d5a3d',
        marginBottom: 8,
        textAlign: 'center',
    },
    
    formSubtitle: {
        fontSize: 16,
        color: '#6b7c6b',
        textAlign: 'center',
        marginBottom: 40,
    },
    
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6b7c6b',
        marginBottom: 8,
        marginLeft: 4,
    },
    
    input: {
        width: '100%',
        height: 56,
        borderWidth: 2,
        borderColor: '#e8f5e8',
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#2d5a3d',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    
    inputFocused: {
        borderColor: '#4a7c59',
        shadowColor: '#4a7c59',
        shadowOpacity: 0.15,
    },
    
    inputError: {
        borderColor: '#ff4444',
        shadowColor: '#ff4444',
        shadowOpacity: 0.2,
    },
    
    errorText: {
        fontSize: 12,
        color: '#ff4444',
        marginTop: 4,
        marginLeft: 4,
    },
    
    primaryButton: {
        width: '100%',
        paddingVertical: 18,
        borderRadius: 16,
        backgroundColor: '#4a7c59',
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#4a7c59',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    
    primaryButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ffffff',
        letterSpacing: 0.5,
    },
    
    secondaryButton: {
        width: '100%',
        paddingVertical: 18,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#4a7c59',
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    
    secondaryButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#4a7c59',
        letterSpacing: 0.5,
    },
    
    textLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    
    textLinkText: {
        fontSize: 16,
        color: '#6b7c6b',
    },
    
    textLinkHighlight: {
        color: '#4a7c59',
        fontWeight: '600',
    },
    
    forgotPasswordLink: {
        alignSelf: 'flex-end',
        marginTop: 8,
        marginBottom: 30,
    },
    
    forgotPasswordText: {
        fontSize: 14,
        color: '#4a7c59',
        fontWeight: '600',
    },
});