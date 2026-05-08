import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const WritingPracticeScreen = ({ navigation }) => {
  const [currentPath, setCurrentPath] = useState('');
  const [paths, setPaths] = useState([]);
  const [detectedShape, setDetectedShape] = useState('Draw something on the pad!');
  
  const points = useRef([]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        points.current = [{ x: locationX, y: locationY }];
        setCurrentPath(`M ${locationX} ${locationY}`);
        setDetectedShape('Drawing...');
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        points.current.push({ x: locationX, y: locationY });
        setCurrentPath((prev) => `${prev} L ${locationX} ${locationY}`);
      },
      onPanResponderRelease: () => {
        if (currentPath) {
          const newPath = currentPath;
          setPaths((prev) => [...prev, newPath]);
          analyzeShape(points.current);
          setCurrentPath('');
        }
      },
    })
  ).current;

  const analyzeShape = (strokePoints) => {
    if (strokePoints.length < 10) {
      setDetectedShape('Too short to identify');
      return;
    }

    // Basic shape detection logic
    const start = strokePoints[0];
    const end = strokePoints[strokePoints.length - 1];
    
    // Calculate bounding box
    let minX = strokePoints[0].x, maxX = strokePoints[0].x;
    let minY = strokePoints[0].y, maxY = strokePoints[0].y;
    
    strokePoints.forEach(p => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });

    const rectWidth = maxX - minX;
    const rectHeight = maxY - minY;
    const aspectRatio = rectWidth / (rectHeight || 1);
    
    // Distance between start and end
    const startEndDist = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
    
    // Total path length
    let pathLength = 0;
    for (let i = 1; i < strokePoints.length; i++) {
      pathLength += Math.sqrt(
        Math.pow(strokePoints[i].x - strokePoints[i - 1].x, 2) +
        Math.pow(strokePoints[i].y - strokePoints[i - 1].y, 2)
      );
    }

    // Heuristics
    if (startEndDist < 40 && pathLength > 150) {
      setDetectedShape('Shape: Circle/Loop ⭕');
    } else if (startEndDist > pathLength * 0.8) {
      if (aspectRatio > 2) {
        setDetectedShape('Shape: Horizontal Line ⎯');
      } else if (aspectRatio < 0.5) {
        setDetectedShape('Shape: Vertical Line |');
      } else {
        setDetectedShape('Shape: Diagonal Line ⟋');
      }
    } else if (rectWidth > 100 && rectHeight > 100 && startEndDist < 100) {
      setDetectedShape('Shape: Square/Rectangle ⬜');
    } else {
      setDetectedShape('Shape: Complex/Letter ✍️');
    }
  };

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath('');
    setDetectedShape('Draw something on the pad!');
    points.current = [];
  };

  return (
    <LinearGradient colors={[Colors.writing || '#9C27B0', '#6A1B9A']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Writing Practice</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.instruction}>Draw a character or shape below</Text>
        <View style={styles.detectionBadge}>
          <Text style={styles.detectedText}>{detectedShape}</Text>
        </View>
      </View>

      <View style={styles.padWrapper}>
        <View style={styles.padContainer} {...panResponder.panHandlers}>
          <Svg style={styles.svg}>
            {paths.map((path, index) => (
              <Path key={index} d={path} fill="none" stroke={Colors.writing || '#9C27B0'} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            ))}
            {currentPath ? (
              <Path d={currentPath} fill="none" stroke="#2196F3" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
            ) : null}
          </Svg>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.clearButton} onPress={clearCanvas} activeOpacity={0.7}>
          <Text style={styles.clearButtonText}>Clear Pad</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.doneButton} 
          onPress={() => setDetectedShape('Great job! Keep practicing.')}
          activeOpacity={0.7}
        >
          <Text style={styles.doneButtonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
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
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSpacer: {
    width: 40,
  },
  infoBox: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  instruction: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 10,
  },
  detectionBadge: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: '80%',
    alignItems: 'center',
    elevation: 3,
  },
  detectedText: {
    color: '#4A148C',
    fontSize: 16,
    fontWeight: 'bold',
  },
  padWrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  padContainer: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  svg: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  clearButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
    elevation: 4,
  },
  doneButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WritingPracticeScreen;
