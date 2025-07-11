import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8faf9',
    padding: 0,
    marginTop: 0,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: '#f8faf9',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: '#4a7c59',
    paddingVertical: 45,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7c6b',
    textAlign: 'center',
    marginTop: 8,
  },
  imageSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d5a3d',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageBox: {
    height: 180,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e8f5e8',
    borderStyle: 'dashed',
    shadowColor: '#2d5a3d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageText: {
    color: '#4a7c59',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  imageIcon: {
    fontSize: 36,
    color: '#e8f5e8',
    marginBottom: 8,
  },
  
  formSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: '#e8f5e8',
    shadowColor: '#2d5a3d',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d5a3d',
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: '#f8faf9',
    borderWidth: 1.5,
    borderColor: '#e8f5e8',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    color: '#2d5a3d',
    fontWeight: '500',
    minHeight: 50,
  },
  inputFocused: {
    borderColor: '#4a7c59',
    backgroundColor: '#ffffff',
    shadowColor: '#4a7c59',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // 설명 입력 섹션
  descriptionContainer: {
    position: 'relative',
  },
  description: {
    backgroundColor: '#f8faf9',
    borderWidth: 1.5,
    borderColor: '#e8f5e8',
    borderRadius: 10,
    padding: 16,
    paddingRight: 16,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    color: '#2d5a3d',
    fontWeight: '500',
    lineHeight: 22,
  },
  geminiBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 40,
    height: 40,
    backgroundColor: '#4a7c59',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2d5a3d',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  geminiIcon: {
    fontSize: 18,
    color: '#ffffff',
  },
  
  // 액션 버튼 섹션
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#f8faf9',
  },
  uploadBtn: {
    backgroundColor: '#4a7c59',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2d5a3d',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  uploadBtnPressed: {
    backgroundColor: '#3d6b4a',
    transform: [{ scale: 0.98 }],
  },
  uploadText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  progressStep: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: '#e8f5e8',
  },
  progressStepActive: {
    backgroundColor: '#4a7c59',
    borderColor: '#4a7c59',
  },
  progressStepComplete: {
    backgroundColor: '#4a7c59',
    borderColor: '#4a7c59',
  },
  progressLine: {
    width: 40,
    height: 3,
    backgroundColor: '#e8f5e8',
    borderRadius: 2,
  },
  progressLineActive: {
    backgroundColor: '#4a7c59',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  progressTextInactive: {
    color: '#6b7c6b',
  },
  
  // 추가 스타일
  removeImageBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(45, 90, 61, 0.8)',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  characterCount: {
    fontSize: 13,
    color: '#6b7c6b',
    textAlign: 'right',
    marginTop: 6,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8faf9',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7c6b',
    fontWeight: '500',
  },
});