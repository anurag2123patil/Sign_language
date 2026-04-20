import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getImageSource } from '../../assets/imageMapping';

const { width } = Dimensions.get('window');

const NumbersModule = ({ navigation }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [showImage, setShowImage] = useState(false);

  // Devanagari numbers — targetLetter uses the Devanagari form so the
  // camera screen sends the right key to the backend.
  const devanagariNumbers = [
    { number: '१', english: '1', pronunciation: 'Ek',   marathi: 'एक',   signDescription: 'Index finger pointing up ☝️',              gesture: [0, 1, 0, 0, 0] },
    { number: '२', english: '2', pronunciation: 'Don',  marathi: 'दोन',  signDescription: 'Index and middle finger extended ✌️',        gesture: [0, 1, 1, 0, 0] },
    { number: '३', english: '3', pronunciation: 'Teen', marathi: 'तीन',  signDescription: 'Thumb + index + middle fingers extended',    gesture: [1, 1, 1, 0, 0] },
    { number: '४', english: '4', pronunciation: 'Char', marathi: 'चार',  signDescription: 'All four fingers extended, thumb down',      gesture: [0, 1, 1, 1, 1] },
    { number: '५', english: '5', pronunciation: 'Pach', marathi: 'पाच',  signDescription: 'Open palm with all five fingers ✋',         gesture: [1, 1, 1, 1, 1] },
    { number: '६', english: '6', pronunciation: 'Saha', marathi: 'सहा',  signDescription: 'Index + middle + ring fingers extended',     gesture: [0, 1, 1, 1, 0] },
    { number: '७', english: '7', pronunciation: 'Sat',  marathi: 'सात',  signDescription: 'Index + middle fingers + pinky extended',   gesture: [0, 1, 1, 0, 1] },
    { number: '८', english: '8', pronunciation: 'Aath', marathi: 'आठ',   signDescription: 'Index + ring + pinky fingers extended',     gesture: [0, 1, 0, 1, 1] },
    { number: '९', english: '9', pronunciation: 'Nau',  marathi: 'नऊ',   signDescription: 'Middle + ring + pinky fingers extended',    gesture: [0, 0, 1, 1, 1] },
    { number: '१०', english: '10', pronunciation: 'Daha', marathi: 'दहा', signDescription: 'Only thumb extended 👍',                   gesture: [1, 0, 0, 0, 0] },
  ];

  const handleNumberPress = (index) => {
    setCurrentNumber(index);
    setShowImage(true);
  };

  const handleTryNow = () => {
    const number = devanagariNumbers[currentNumber];
    setShowImage(false);
    navigation.navigate('Cameranumberscreen', {
      targetLetter: number.number,  // send Devanagari so backend key matches
      type: 'number',
    });
  };

  const renderNumberItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.numberCard}
      activeOpacity={0.7}
      onPress={() => handleNumberPress(index)}
    >
      <Text style={styles.numberDisplay}>{item.number}</Text>
      <Text style={styles.englishNumber}>{item.english}</Text>
    </TouchableOpacity>
  );

  const renderImageModal = () => {
    const number = devanagariNumbers[currentNumber];
    const source = getImageSource(number.english);

    return (
      <Modal visible={showImage} animationType="slide" onRequestClose={() => setShowImage(false)}>
        <LinearGradient colors={['#667EEA', '#764BA2']} style={styles.modalContainer}>

          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowImage(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.imageContainer}>
            {/* Number badge */}
            <View style={styles.letterBadge}>
              <Text style={styles.imageLetter}>{number.number}</Text>
            </View>

            {/* Sign Language Image */}
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

            {/* Info badges — same as AlphabetsModule */}
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionTitle}>How to Sign:</Text>
              <Text style={styles.descriptionText}>{number.signDescription}</Text>
              <Text style={styles.descriptionSub}>
                {number.pronunciation}  •  {number.marathi}
              </Text>
            </View>

            {/* Practice button */}
            <TouchableOpacity style={styles.tryNowButton} onPress={handleTryNow}>
              <Text style={styles.tryNowButtonText}>Practice with Camera</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  return (
    <LinearGradient colors={['#667EEA', '#f5f5f5']} style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Numbers</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Numbers Grid — 5 columns, same cards as alphabets */}
      <FlatList
        data={devanagariNumbers}
        numColumns={5}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderNumberItem}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      />

      {renderImageModal()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: { padding: 8 },
  backButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  headerTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  headerSpacer: { width: 40 },

  // Grid
  gridContainer: { paddingHorizontal: 8, paddingBottom: 30 },
  numberCard: {
    flex: 1,
    aspectRatio: 1,
    margin: 6,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  numberDisplay: { fontSize: 28, fontWeight: 'bold', color: '#667EEA', marginBottom: 2 },
  englishNumber: { fontSize: 11, color: '#666', fontWeight: '600' },

  // Modal — identical structure to AlphabetsModule
  modalContainer: { flex: 1 },
  modalHeader: { padding: 20, alignItems: 'flex-end', paddingTop: 50 },
  closeButton: { backgroundColor: 'rgba(0,0,0,0.2)', padding: 10, borderRadius: 20 },
  closeButtonText: { color: 'white', fontSize: 20 },

  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  letterBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 100,
    marginBottom: 20,
  },
  imageLetter: { fontSize: 52, fontWeight: 'bold', color: 'white' },

  imageCard: {
    width: width * 0.85,
    height: width * 0.65,
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

  descriptionBox: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    marginBottom: 24,
  },
  descriptionTitle: { fontWeight: 'bold', color: '#667EEA', marginBottom: 5 },
  descriptionText: { color: '#34495e', fontSize: 15, marginBottom: 6 },
  descriptionSub: { color: '#7f8c8d', fontSize: 13, fontStyle: 'italic' },

  tryNowButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  tryNowButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
});

export default NumbersModule;