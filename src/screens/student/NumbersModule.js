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

const { width } = Dimensions.get('window');

const NumbersModule = ({ navigation }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [showImage, setShowImage] = useState(false);

  // Devanagari numbers with sign language descriptions
  const devanagariNumbers = [
    {
      number: '१',
      english: '1',
      pronunciation: 'Ek',
      marathi: 'एक',
      signDescription: 'Index finger pointing up',
      gesture: [0, 1, 0, 0, 0]
    },
    {
      number: '२',
      english: '2',
      pronunciation: 'Don',
      marathi: 'दोन',
      signDescription: 'Index and middle finger extended',
      gesture: [0, 1, 1, 0, 0]
    },
    {
      number: '३',
      english: '3',
      pronunciation: 'Teen',
      marathi: 'तीन',
      signDescription: 'Three fingers extended',
      gesture: [0, 1, 1, 1, 0]
    },
    {
      number: '४',
      english: '4',
      pronunciation: 'Char',
      marathi: 'चार',
      signDescription: 'Four fingers extended',
      gesture: [0, 1, 1, 1, 1]
    },
    {
      number: '५',
      english: '5',
      pronunciation: 'Pach',
      marathi: 'पाच',
      signDescription: 'Open palm with all fingers',
      gesture: [1, 1, 1, 1, 1]
    },
    {
      number: '६',
      english: '6',
      pronunciation: 'Saha',
      marathi: 'सहा',
      signDescription: 'Thumb and four fingers extended',
      gesture: [1, 1, 1, 1, 1]
    },
    {
      number: '७',
      english: '7',
      pronunciation: 'Sat',
      marathi: 'सात',
      signDescription: 'All fingers with wrist bend',
      gesture: [1, 1, 1, 1, 1]
    },
    {
      number: '८',
      english: '8',
      pronunciation: 'Aath',
      marathi: 'आठ',
      signDescription: 'Both hands showing gesture',
      gesture: [1, 1, 1, 1, 1]
    },
    {
      number: '९',
      english: '9',
      pronunciation: 'Nau',
      marathi: 'नऊ',
      signDescription: 'Special hand formation',
      gesture: [1, 1, 1, 1, 1]
    },
    {
      number: '१०',
      english: '10',
      pronunciation: 'Daha',
      marathi: 'दहा',
      signDescription: 'Two open palms',
      gesture: [1, 1, 1, 1, 1]
    },
  ];

  const handleNumberPress = (index) => {
    setCurrentNumber(index);
    setShowImage(true);
  };

  const handleTryNow = () => {
    const number = devanagariNumbers[currentNumber];
    setShowImage(false);
    navigation.navigate('Cameranumberscreen', {
      targetLetter: number.number,
      type: 'number'
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

    return (
      <Modal visible={showImage} animationType="slide" onRequestClose={() => setShowImage(false)}>
        <LinearGradient
          colors={['#667EEA', '#764BA2']}
          style={styles.modalContainer}
        >
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowImage(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Number {number.english}</Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Content */}
          <View style={styles.imageContainer}>
            {/* Number Badge */}
            <View style={styles.numberBadge}>
              <Text style={styles.badgeNumber}>{number.number}</Text>
            </View>

            {/* Info Cards */}
            <View style={styles.infoCardsContainer}>
              <View style={styles.infoBadge}>
                <Text style={styles.infoBadgeLabel}>Pronunciation</Text>
                <Text style={styles.infoBadgeValue}>{number.pronunciation}</Text>
              </View>
              <View style={styles.infoBadge}>
                <Text style={styles.infoBadgeLabel}>Marathi</Text>
                <Text style={styles.infoBadgeValue}>{number.marathi}</Text>
              </View>
            </View>

            {/* Gesture Visualization */}
            <View style={styles.gestureBox}>
              <Text style={styles.gestureTitle}>Finger Position</Text>
              <View style={styles.fingerDisplay}>
                {['T', 'I', 'M', 'R', 'P'].map((finger, idx) => (
                  <View key={idx} style={styles.fingerIndicator}>
                    <View
                      style={[
                        styles.fingerCircle,
                        number.gesture[idx] === 1
                          ? styles.fingerUp
                          : styles.fingerDown
                      ]}
                    >
                      <Text style={styles.fingerLabel}>{finger}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionBox}>
              <Text style={styles.descriptionTitle}>🤚 Sign Language Gesture</Text>
              <Text style={styles.descriptionText}>{number.signDescription}</Text>
            </View>

            {/* Try Now Button */}
            <TouchableOpacity
              style={styles.tryNowButton}
              onPress={handleTryNow}
            >
              <Text style={styles.tryNowButtonText}>🎯 Practice with Camera</Text>
            </TouchableOpacity>
          </View>

          {/* Number Navigation */}
          <View style={styles.numberNavigation}>
            {devanagariNumbers.map((_, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.navDot,
                  idx === currentNumber && styles.navDotActive
                ]}
                onPress={() => setCurrentNumber(idx)}
              >
                <Text style={[
                  styles.navDotText,
                  idx === currentNumber && styles.navDotTextActive
                ]}>
                  {devanagariNumbers[idx].number}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  return (
    <LinearGradient
      colors={['#667EEA', '#f5f5f5']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Numbers</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Numbers Grid */}
      <FlatList
        data={devanagariNumbers}
        numColumns={5}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNumberItem}
        contentContainerStyle={styles.gridContainer}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal */}
      {renderImageModal()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // ════════════════════════════════════════════════════════════════
  // MAIN CONTAINER
  // ════════════════════════════════════════════════════════════════
  container: {
    flex: 1,
  },

  // ════════════════════════════════════════════════════════════════
  // HEADER
  // ════════════════════════════════════════════════════════════════
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 40,
  },

  // ════════════════════════════════════════════════════════════════
  // GRID LAYOUT
  // ════════════════════════════════════════════════════════════════
  gridContainer: {
    paddingHorizontal: 8,
    paddingBottom: 30,
  },
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
  numberDisplay: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667EEA',
    marginBottom: 4,
  },
  englishNumber: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },

  // ════════════════════════════════════════════════════════════════
  // MODAL STYLES
  // ════════════════════════════════════════════════════════════════
  modalContainer: {
    flex: 1,
    paddingBottom: 80,
  },

  // Modal Header
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Image Container
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // Number Badge
  numberBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  badgeNumber: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
  },

  // Info Cards Container
  infoCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    gap: 10,
  },
  infoBadge: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  infoBadgeLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  infoBadgeValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

  // Gesture Box
  gestureBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 20,
  },
  gestureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  fingerDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  fingerIndicator: {
    alignItems: 'center',
  },
  fingerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fingerUp: {
    backgroundColor: '#2ECC71',
  },
  fingerDown: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  fingerLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },

  // Description Box
  descriptionBox: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667EEA',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },

  // Try Now Button
  tryNowButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  tryNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Number Navigation (at bottom)
  numberNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexWrap: 'wrap',
  },
  navDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  navDotActive: {
    backgroundColor: 'white',
  },
  navDotText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  navDotTextActive: {
    color: '#667EEA',
  },
});

export default NumbersModule;