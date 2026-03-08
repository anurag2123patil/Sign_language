import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { getImageSource } from '../../assets/imageMapping';

const { width } = Dimensions.get('window');

const AlphabetsModule = ({ navigation }) => {
  const [currentAlphabet, setCurrentAlphabet] = useState(0);
  const [showImage, setShowImage] = useState(false);
  // Marathi alphabets (अ to ह)
  const marathiAlphabets = [
    { letter: 'अ', pronunciation: 'a', meaning: 'First letter', signDescription: 'Open palm facing forward' },
    { letter: 'आ', pronunciation: 'aa', meaning: 'Long A', signDescription: 'Two fingers extended upward' },
    { letter: 'इ', pronunciation: 'i', meaning: 'Short I', signDescription: 'Index finger pointing up' },
    { letter: 'ई', pronunciation: 'ii', meaning: 'Long I', signDescription: 'Two fingers pointing up' },
    { letter: 'उ', pronunciation: 'u', meaning: 'Short U', signDescription: 'Closed fist with thumb up' },
    { letter: 'ऊ', pronunciation: 'uu', meaning: 'Long U', signDescription: 'Two thumbs up' },
    { letter: 'ए', pronunciation: 'e', meaning: 'E sound', signDescription: 'Open hand with fingers spread' },
    { letter: 'ऐ', pronunciation: 'ai', meaning: 'AI sound', signDescription: 'Two hands forming circle' },
    { letter: 'ओ', pronunciation: 'o', meaning: 'O sound', signDescription: 'Hand forming O shape' },
    { letter: 'औ', pronunciation: 'au', meaning: 'AU sound', signDescription: 'Two hands forming larger circle' },
    { letter: 'क', pronunciation: 'ka', meaning: 'K sound', signDescription: 'Index finger pointing forward' },
    { letter: 'ख', pronunciation: 'kha', meaning: 'KH sound', signDescription: 'Two fingers pointing forward' },
    { letter: 'ग', pronunciation: 'ga', meaning: 'G sound', signDescription: 'Three fingers pointing forward' },
    { letter: 'घ', pronunciation: 'gha', meaning: 'GH sound', signDescription: 'Four fingers pointing forward' },
    { letter: 'च', pronunciation: 'cha', meaning: 'CH sound', signDescription: 'Thumb and index finger together' },
    { letter: 'छ', pronunciation: 'chha', meaning: 'CHH sound', signDescription: 'Thumb and two fingers together' },
    { letter: 'ज', pronunciation: 'ja', meaning: 'J sound', signDescription: 'Thumb and three fingers together' },
    { letter: 'झ', pronunciation: 'jha', meaning: 'JH sound', signDescription: 'All fingers together' },
    { letter: 'ट', pronunciation: 'ta', meaning: 'T sound', signDescription: 'Index finger bent' },
    { letter: 'ठ', pronunciation: 'tha', meaning: 'TH sound', signDescription: 'Two fingers bent' },
    { letter: 'ड', pronunciation: 'da', meaning: 'D sound', signDescription: 'Three fingers bent' },
    { letter: 'ढ', pronunciation: 'dha', meaning: 'DH sound', signDescription: 'Four fingers bent' },
    { letter: 'त', pronunciation: 'ta', meaning: 'T sound', signDescription: 'Index finger straight' },
    { letter: 'थ', pronunciation: 'tha', meaning: 'TH sound', signDescription: 'Two fingers straight' },
    { letter: 'द', pronunciation: 'da', meaning: 'D sound', signDescription: 'Three fingers straight' },
    { letter: 'ध', pronunciation: 'dha', meaning: 'DH sound', signDescription: 'Four fingers straight' },
    { letter: 'न', pronunciation: 'na', meaning: 'N sound', signDescription: 'Thumb touching middle finger' },
    { letter: 'प', pronunciation: 'pa', meaning: 'P sound', signDescription: 'All fingers closed' },
    { letter: 'फ', pronunciation: 'pha', meaning: 'PH sound', signDescription: 'All fingers slightly open' },
    { letter: 'ब', pronunciation: 'ba', meaning: 'B sound', signDescription: 'Thumb and little finger up' },
    { letter: 'भ', pronunciation: 'bha', meaning: 'BH sound', signDescription: 'Thumb and ring finger up' },
    { letter: 'म', pronunciation: 'ma', meaning: 'M sound', signDescription: 'Thumb and middle finger up' },
    { letter: 'य', pronunciation: 'ya', meaning: 'Y sound', signDescription: 'Thumb and index finger up' },
    { letter: 'र', pronunciation: 'ra', meaning: 'R sound', signDescription: 'Index and middle finger crossed' },
    { letter: 'ल', pronunciation: 'la', meaning: 'L sound', signDescription: 'Thumb and index finger forming L' },
    { letter: 'व', pronunciation: 'va', meaning: 'V sound', signDescription: 'Index and middle finger up, spread' },
    { letter: 'श', pronunciation: 'sha', meaning: 'SH sound', signDescription: 'Hand in peace sign' },
    { letter: 'ष', pronunciation: 'sha', meaning: 'SH sound', signDescription: 'Hand in peace sign, different' },
    { letter: 'स', pronunciation: 'sa', meaning: 'S sound', signDescription: 'Closed fist' },
    { letter: 'ह', pronunciation: 'ha', meaning: 'H sound', signDescription: 'Open hand waving' },
  ];

  const handleAlphabetPress = (index) => {
    setCurrentAlphabet(index);
    setShowImage(true);
  };

  const handleTryNow = () => {
    const alphabet = marathiAlphabets[currentAlphabet];
    setShowImage(false);
    navigation.navigate('CameraGesture', { targetLetter: alphabet.letter });
  };
  // 1. FIXED: Extracting the item renderer for better performance
  const renderAlphabetItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.alphabetCard}
      activeOpacity={0.7}
      onPress={() => handleAlphabetPress(index)}
    >
      <Text style={styles.alphabetLetter}>{item.letter}</Text>
      <Text style={styles.pronunciationText}>{item.pronunciation}</Text>
    </TouchableOpacity>
  );

  const renderImageModal = () => {
    const alphabet = marathiAlphabets[currentAlphabet];
    const source = getImageSource(alphabet.letter);

    return (
      <Modal visible={showImage} animationType="slide" onRequestClose={() => setShowImage(false)}>
        <LinearGradient colors={['#3498db', '#2980b9']} style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowImage(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            <View style={styles.letterBadge}>
              <Text style={styles.imageLetter}>{alphabet.letter}</Text>
            </View>

            <View style={styles.imageCard}>
              {source ? (
                <Image source={source} style={styles.signLanguageImage} resizeMode="contain" />
              ) : (
                <View style={styles.errorPlaceholder}>
                  <Text style={styles.errorEmoji}>🤟</Text>
                  <Text style={styles.errorText}>Image Coming Soon</Text>
                </View>
              )}
            </View>

            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionTitle}>How to Sign:</Text>
              <Text style={styles.descriptionText}>{alphabet.signDescription}</Text>
            </View>

            <TouchableOpacity style={styles.tryNowButton} onPress={handleTryNow}>
              <Text style={styles.tryNowButtonText}>Practice with Camera</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  return (
    <LinearGradient colors={['#3498db', '#f5f5f5']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Marathi Signs</Text>
        <View style={styles.headerSpacer} />
      </View>

      <FlatList
        data={marathiAlphabets}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderAlphabetItem}
        contentContainerStyle={styles.gridContainer}
      />

      {renderImageModal()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  headerSpacer: { width: 40 },
  gridContainer: { paddingHorizontal: 10, paddingBottom: 30 },
  alphabetCard: {
    flex: 1,
    aspectRatio: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  alphabetLetter: { fontSize: 28, fontWeight: 'bold', color: '#2c3e50' },
  pronunciationText: { fontSize: 12, color: '#7f8c8d' },

  // MODAL STYLES (The Missing Pieces)
  modalContainer: { flex: 1 },
  modalHeader: { padding: 20, alignItems: 'flex-end', paddingTop: 50 },
  closeButton: { backgroundColor: 'rgba(0,0,0,0.2)', padding: 10, borderRadius: 20 },
  closeButtonText: { color: 'white', fontSize: 20 },
  imageContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  letterBadge: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 20, borderRadius: 100, marginBottom: 20 },
  imageLetter: { fontSize: 60, fontWeight: 'bold', color: 'white' },
  imageCard: {
    width: width * 0.85,
    height: width * 0.7,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signLanguageImage: { width: '90%', height: '90%' },
  errorPlaceholder: { alignItems: 'center' },
  errorEmoji: { fontSize: 50 },
  errorText: { color: '#7f8c8d', marginTop: 10 },
  descriptionBox: { backgroundColor: 'rgba(255,255,255,0.9)', padding: 20, borderRadius: 15, width: '100%', marginBottom: 30 },
  descriptionTitle: { fontWeight: 'bold', color: '#2980b9', marginBottom: 5 },
  descriptionText: { color: '#34495e', fontSize: 16 },
  tryNowButton: {
    backgroundColor: '#2ecc71', // Fallback color if Colors.primary fails
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  tryNowButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});

export default AlphabetsModule;
