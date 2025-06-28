import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8faf9',
    paddingHorizontal: 24,
    paddingTop: 5,
  },
  
  headerSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  
  logo: {
    width: 190,
    height: 190,
    marginBottom: 24,
    borderRadius: 90,
    backgroundColor: '#4a7c59',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4a7c59',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
    overflow: 'hidden',
  },
  
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 90,
    backgroundColor: '#4a7c59',
    color: '#fff',
  },
  
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2d5a3d',
    marginBottom: 8,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 16,
    color: '#6b7c6b',
    textAlign: 'center',
    lineHeight: 22,
  },
  
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
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
  
  secondaryButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#4a7c59',
    marginBottom: 16,
    alignItems: 'center',
  },
  
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4a7c59',
    letterSpacing: 0.5,
  },
  
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d5a3d',
    marginLeft: 8,
  },
  
  socialIcon: {
    width: 24,
    height: 24,
  },
  
  footerSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  
  termsText: {
    fontSize: 14,
    color: '#6b7c6b',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  
  linkText: {
    color: '#4a7c59',
    fontWeight: '600',
  },
  
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#e8f5e8',
    marginVertical: 24,
    marginTop: 40,
    marginBottom: -20,
  },
  
  quickActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  
  quickActionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e8f5e8',
  },
  
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7c6b',
    marginTop: 4,
  },
  
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#4a7c59',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  
  gradientButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#4a7c59',
    shadowColor: '#4a7c59',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
});