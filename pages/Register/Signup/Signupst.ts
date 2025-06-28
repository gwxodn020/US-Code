import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1,
        backgroundColor: '#f8faf9',
    },
    
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 200,
        paddingBottom: 40,
    },
    
    headerSection: {
        alignItems: 'center',
        marginBottom: 40,
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
        lineHeight: 22,
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
    
    requiredMark: {
        color: '#ff4444',
        fontSize: 14,
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
        shadowRadius: 12,
        elevation: 4,
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
        fontWeight: '500',
    },
    
    agreementSection: {
        marginTop: 10,
        marginBottom: 30,
    },
    
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        paddingHorizontal: 4,
    },
    
    checkbox: {
        width: 22,
        height: 22,
        borderWidth: 2,
        borderColor: '#e8f5e8',
        borderRadius: 6,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    
    checkboxChecked: {
        backgroundColor: '#4a7c59',
        borderColor: '#4a7c59',
        shadowColor: '#4a7c59',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    
    checkboxMark: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    
    checkboxText: {
        fontSize: 14,
        color: '#6b7c6b',
        flex: 1,
        lineHeight: 20,
    },
    
    primaryButton: {
        width: '100%',
        paddingVertical: 18,
        borderRadius: 16,
        backgroundColor: '#4a7c59',
        marginBottom: 24,
        alignItems: 'center',
        shadowColor: '#4a7c59',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
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
        alignItems: 'center',
        paddingVertical: 10,
    },
    
    textLinkText: {
        fontSize: 16,
        color: '#6b7c6b',
        textAlign: 'center',
    },
    
    textLinkHighlight: {
        color: '#4a7c59',
        fontWeight: '600',
    },
    
    linkText: {
        color: '#4a7c59',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#e8f5e8',
        marginVertical: 24,
    },
    
    socialButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e8f5e8',
        marginBottom: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    
    socialButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2d5a3d',
        marginLeft: 8,
    },
    
    passwordStrengthContainer: {
        marginTop: 8,
        paddingHorizontal: 4,
    },
    
    passwordStrengthText: {
        fontSize: 12,
        color: '#6b7c6b',
        marginBottom: 4,
    },
    
    strengthIndicator: {
        height: 4,
        borderRadius: 2,
        backgroundColor: '#e8f5e8',
        overflow: 'hidden',
    },
    
    strengthBar: {
        height: '100%',
        borderRadius: 2,
    },
    
    strengthWeak: {
        backgroundColor: '#ff4444',
        width: '33%',
    },
    
    strengthMedium: {
        backgroundColor: '#ffaa00',
        width: '66%',
    },
    
    strengthStrong: {
        backgroundColor: '#4a7c59',
        width: '100%',
    },
    
    helperText: {
        fontSize: 12,
        color: '#6b7c6b',
        marginTop: 4,
        marginLeft: 4,
        lineHeight: 16,
    },
    
    successText: {
        fontSize: 12,
        color: '#4a7c59',
        marginTop: 4,
        marginLeft: 4,
        fontWeight: '500',
    },
});