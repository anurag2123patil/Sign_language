import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/colors";
import { Video } from "expo-av";

import { bodyParts } from "../../assets/data/bodyParts";
import { fruits } from "../../assets/data/fruits";
import { months } from "../../assets/data/months";
import { familyRelations } from "../../assets/data/relationship";
import { householdItems } from "../../assets/data/basicWords";

const WordsModule = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentWord, setCurrentWord] = useState(0);

  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const categories = [
    { title: "Basic Words", data: householdItems},
    { title: "Fruits", data: fruits },
    { title: "Months", data: months },
    { title: "Family & Relations", data: familyRelations },
    { title: "Body Parts", data: bodyParts },
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.stopAsync();
      setIsPlaying(false);
    }
  }, [currentWord]);

  const playSegment = async () => {
    const word = selectedCategory.data[currentWord];
    if (!videoRef.current) return;

    await videoRef.current.setPositionAsync(word.startTime);
    await videoRef.current.playAsync();
    setIsPlaying(true);
  };

  const handlePlaybackUpdate = (status) => {
    if (!status.isLoaded) return;

    const word = selectedCategory.data[currentWord];

    if (status.positionMillis >= word.endTime && status.isPlaying) {
      videoRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const nextWord = () => {
    if (currentWord < selectedCategory.data.length - 1) {
      setCurrentWord(currentWord + 1);
    }
  };

  const previousWord = () => {
    if (currentWord > 0) {
      setCurrentWord(currentWord - 1);
    }
  };

  // ================= CATEGORY SCREEN =================
  const renderCategories = () => (
    <View style={styles.categoryContainer}>
      {categories.map((cat, index) => (
        <TouchableOpacity
          key={index}
          style={styles.categoryCard}
          onPress={() => {
            setSelectedCategory(cat);
            setCurrentWord(0);
          }}
        >
          <Text style={styles.categoryTitle}>{cat.title}</Text>
          <Text style={styles.categoryCount}>
            {cat.data.length} words
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // ================= WORD SCREEN =================
  const renderWordCard = () => {
    const word = selectedCategory.data[currentWord];

    return (
      <View style={styles.wordCard}>
        <TouchableOpacity onPress={() => setSelectedCategory(null)}>
  <Text style={{ marginBottom: 10, fontSize: 14, color: Colors.textSecondary }}>
    ← Back
  </Text>
</TouchableOpacity>

        <View style={styles.wordHeader}>
          <Text style={styles.wordCategory}>{word.category}</Text>
          <Text style={styles.wordText}>{word.word}</Text>
        </View>

        <View style={styles.wordInfo}>
          <Text style={styles.pronunciation}>
            Pronunciation: {word.pronunciation}
          </Text>
          <Text style={styles.meaning}>{word.meaning}</Text>
          <Text style={styles.signDescription}>
            Sign: {word.signDescription}
          </Text>
        </View>

        {/* VIDEO */}
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: word.videoUrl }}
            style={styles.video}
            resizeMode="contain"
            shouldPlay={false}
            onPlaybackStatusUpdate={handlePlaybackUpdate}
          />
        </View>

        <TouchableOpacity onPress={playSegment} style={styles.playButton}>
          <Text style={styles.playButtonText}>▶ Play Sign</Text>
        </TouchableOpacity>

        {/* CONTROLS */}
        <View style={styles.controls}>
          <TouchableOpacity
            onPress={previousWord}
            style={styles.controlButton}
            disabled={currentWord === 0}
          >
            <Text style={styles.controlButtonText}>← Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={nextWord}
            style={styles.controlButton}
            disabled={
              currentWord === selectedCategory.data.length - 1
            }
          >
            <Text style={styles.controlButtonText}>Next →</Text>
          </TouchableOpacity>
        </View>

        {/* WORD LIST */}
        <View style={styles.wordList}>
          <Text style={styles.listTitle}>All Words</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedCategory.data.map((w, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.wordItem,
                  index === currentWord && styles.activeWordItem,
                ]}
                onPress={() => setCurrentWord(index)}
              >
                <Text
                  style={[
                    styles.wordItemText,
                    index === currentWord && styles.activeWordItemText,
                  ]}
                >
                  {w.word}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {!selectedCategory ? renderCategories() : renderWordCard()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ===== CATEGORY =====
  categoryContainer: {
    padding: 20,
  },

  categoryCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },

  categoryCount: {
    marginTop: 6,
    fontSize: 14,
    color: Colors.textSecondary,
  },

  // ===== WORD CARD =====
  wordCard: {
    margin: 16,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    elevation: 4,
  },

  wordHeader: {
    alignItems: "center",
  },

  wordCategory: {
    fontSize: 12,
    color: Colors.word,
    backgroundColor: Colors.word + "20",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },

  wordText: {
    fontSize: 42,
    fontWeight: "bold",
    color: Colors.word,
    textAlign: "center",
  },

  // ===== TEXT INFO =====
  wordInfo: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  pronunciation: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.textPrimary,
    marginBottom: 6,
  },

  meaning: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.textSecondary,
    marginBottom: 6,
  },

  signDescription: {
    fontSize: 14,
    textAlign: "center",
    color: Colors.textHint,
    fontStyle: "italic",
    lineHeight: 20,
  },

  // ===== VIDEO =====
  videoContainer: {
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#000",
    marginVertical: 16,
  },

  video: {
    width: "100%",
    height: "100%",
  },

  // ===== PLAY BUTTON =====
  playButton: {
    backgroundColor: Colors.word,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },

  playButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // ===== CONTROLS =====
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  controlButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
  },

  controlButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // ===== WORD LIST =====
  wordList: {
    marginTop: 25,
  },

  listTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: Colors.textPrimary,
  },

  wordItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#eee",
    borderRadius: 25,
    marginRight: 10,
  },

  activeWordItem: {
    backgroundColor: Colors.word,
  },

  wordItemText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondary,
  },

  activeWordItemText: {
    color: "#fff",
  },
});
export default WordsModule;