import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity,
    Dimensions, Modal, Animated,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const FLASK_URL = 'http://10.127.15.110:5000/detect_gesture'; // ← NEW ENDPOINT (same for numbers)

const FINGER_NAMES = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];

const CameraNumberScreen = ({ navigation, route }) => {
    const { targetLetter } = route?.params || { targetLetter: '१' };

    const [permission, requestPermission] = useCameraPermissions();
    const [isDetecting, setIsDetecting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [fingerStatus, setFingerStatus] = useState([]);
    const [statusMsg, setStatusMsg] = useState('Tap Start — hold hand clearly in view');
    const [confidence, setConfidence] = useState(0);
    const [ping, setPing] = useState(null);
    const [detectedNumber, setDetectedNumber] = useState(null);

    const successScale = useRef(new Animated.Value(0)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const cameraRef = useRef(null);
    const isRunning = useRef(false);
    const isSuccess = useRef(false);

    // Updated number gestures with correct patterns
    const numberGestures = {
        '१': [0, 1, 0, 0, 0],  // 1 - Index only
        '२': [0, 1, 1, 0, 0],  // 2 - Index + Middle
        '३': [0, 1, 1, 1, 0],  // 3 - Three fingers
        '४': [0, 1, 1, 1, 1],  // 4 - Four fingers
        '५': [1, 1, 1, 1, 1],  // 5 - All open
        '६': [0, 0, 1, 1, 1],  // 6 - Middle + Ring + Pinky
        '७': [1, 1, 0, 1, 1],  // 7 - Thumb + Index + Ring + Pinky
        '८': [1, 0, 1, 1, 1],  // 8 - Thumb + Middle + Ring + Pinky
        '९': [1, 1, 1, 0, 1],  // 9 - Thumb + Index + Middle + Pinky
        '१०': [1, 0, 0, 0, 0], // 10 - Thumb only
    };

    const numberNames = {
        '१': { english: '1', pronunciation: 'Ek', marathi: 'एक' },
        '२': { english: '2', pronunciation: 'Don', marathi: 'दोन' },
        '३': { english: '3', pronunciation: 'Teen', marathi: 'तीन' },
        '४': { english: '4', pronunciation: 'Char', marathi: 'चार' },
        '५': { english: '5', pronunciation: 'Pach', marathi: 'पाच' },
        '६': { english: '6', pronunciation: 'Saha', marathi: 'सहा' },
        '७': { english: '7', pronunciation: 'Sat', marathi: 'सात' },
        '८': { english: '8', pronunciation: 'Aath', marathi: 'आठ' },
        '९': { english: '9', pronunciation: 'Nau', marathi: 'नऊ' },
        '१०': { english: '10', pronunciation: 'Daha', marathi: 'दहा' },
    };

    const numberHints = {
        '१': 'Show 1 - Index finger pointing up ☝️',
        '२': 'Show 2 - Index and middle finger extended ✌️',
        '३': 'Show 3 - Three fingers extended',
        '४': 'Show 4 - Four fingers extended',
        '५': 'Show 5 - Open palm with all fingers ✋',
        '६': 'Show 6 - Middle + Ring + Pinky',
        '७': 'Show 7 - Thumb + Index + Ring + Pinky',
        '८': 'Show 8 - Thumb + Middle + Ring + Pinky',
        '९': 'Show 9 - Thumb + Index + Middle + Pinky',
        '१०': 'Show 10 - Thumb only 👍',
    };

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, { toValue: 1.08, duration: 700, useNativeDriver: true }),
                Animated.timing(pulseAnim, { toValue: 1.0, duration: 700, useNativeDriver: true }),
            ])
        ).start();

        return () => { isRunning.current = false; };
    }, []);

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: confidence,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [confidence]);

    const triggerSuccess = () => {
        if (isSuccess.current) return;
        isSuccess.current = true;
        isRunning.current = false;
        setIsDetecting(false);

        Animated.spring(successScale, {
            toValue: 1, friction: 4, tension: 120, useNativeDriver: true,
        }).start();
        setShowSuccess(true);
    };

    const detectionLoop = useCallback(async () => {
        while (isRunning.current && !isSuccess.current) {
            if (!cameraRef.current) { await sleep(100); continue; }

            try {
                const t0 = Date.now();
                const photo = await cameraRef.current.takePictureAsync({
                    base64: true,
                    quality: 0.25,
                    skipProcessing: true,
                });

                if (!photo?.base64 || !isRunning.current) break;

                const res = await fetch(FLASK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        image: photo.base64,
                        targetGesture: targetLetter,  // ← CHANGED: targetLetter → targetGesture
                    }),
                });

                const ms = Date.now() - t0;
                setPing(ms);

                const ct = res.headers.get('content-type');
                if (!ct?.includes('application/json')) {
                    setStatusMsg('Server error — check terminal');
                    await sleep(500);
                    continue;
                }

                const data = await res.json();

                // ← CHANGED: New response field names
                if (data.fingers?.length > 0) setFingerStatus(data.fingers);
                if (typeof data.confidence === 'number') setConfidence(data.confidence);
                if (data.detectedGesture) setDetectedNumber(data.detectedGesture);  // ← CHANGED: detected_letter → detectedGesture
                setStatusMsg(data.message || '');

                if (data.match === true) {
                    triggerSuccess();
                    return;
                }

            } catch (err) {
                setStatusMsg('❌ Cannot reach server');
                await sleep(800);
            }

            await sleep(50);
        }
    }, [targetLetter]);

    const startDetection = () => {
        isRunning.current = true;
        isSuccess.current = false;
        setIsDetecting(true);
        setConfidence(0);
        setFingerStatus([]);
        setDetectedNumber(null);
        setStatusMsg('Detecting...');
        detectionLoop();
    };

    const stopDetection = () => {
        isRunning.current = false;
        setIsDetecting(false);
        setStatusMsg('Tap Start — hold hand clearly in view');
        setFingerStatus([]);
        setConfidence(0);
        setPing(null);
        setDetectedNumber(null);
    };

    const handleRetry = () => {
        isSuccess.current = false;
        successScale.setValue(0);
        setShowSuccess(false);
        setConfidence(0);
        setFingerStatus([]);
        setPing(null);
        setDetectedNumber(null);
        setStatusMsg('Tap Start — hold hand clearly in view');
    };

    const progressColor = confidence >= 1 ? '#2ecc71'
        : confidence >= 0.8 ? '#f39c12'
            : '#e74c3c';

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <LinearGradient colors={['#667EEA', '#764BA2']} style={styles.centered}>
                <Text style={styles.permissionText}>Camera permission needed</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    const target = numberGestures[targetLetter] || [];
    const numberInfo = numberNames[targetLetter] || {};

    return (
        <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing="front" />

            {isDetecting && (
                <View style={styles.scanOverlay} pointerEvents="none">
                    <View style={styles.scanCornerTL} />
                    <View style={styles.scanCornerTR} />
                    <View style={styles.scanCornerBL} />
                    <View style={styles.scanCornerBR} />
                </View>
            )}

            <View style={styles.topOverlay}>
                <TouchableOpacity
                    onPress={() => { stopDetection(); navigation.goBack(); }}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>

                <View style={styles.targetBox}>
                    <Text style={styles.targetLabel}>Show Number:</Text>
                    <View style={styles.targetNumberDisplay}>
                        <Text style={styles.targetNumber}>{targetLetter}</Text>
                        <Text style={styles.targetNumberEnglish}>{numberInfo.english}</Text>
                    </View>
                    <Text style={styles.hintInline}>
                        {numberHints[targetLetter] || ''}
                    </Text>
                </View>

                <View style={styles.pingBox}>
                    {ping && <Text style={styles.pingText}>{ping}ms</Text>}
                </View>
            </View>

            {isDetecting && (
                <View style={styles.progressContainer}>
                    <View style={styles.progressBarBg}>
                        <Animated.View style={[
                            styles.progressBarFill,
                            {
                                backgroundColor: progressColor,
                                width: progressAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0%', '100%'],
                                }),
                            },
                        ]} />
                    </View>
                    <Text style={[styles.progressLabel, { color: progressColor }]}>
                        {Math.round(confidence * 100)}% match
                    </Text>
                </View>
            )}

            <View style={styles.statusBanner}>
                <Text style={styles.statusText}>{statusMsg}</Text>
                {detectedNumber && detectedNumber !== targetLetter && (
                    <Text style={styles.detectedText}>
                        (Detected: {detectedNumber})
                    </Text>
                )}
            </View>

            {fingerStatus.length > 0 && (
                <View style={styles.fingerIndicators}>
                    {FINGER_NAMES.map((name, i) => {
                        const correct = fingerStatus[i] === target[i];
                        const expected = target[i] === 1 ? 'UP' : 'DOWN';
                        return (
                            <View key={name} style={styles.fingerDotWrapper}>
                                <View style={[
                                    styles.fingerDot,
                                    { backgroundColor: correct ? '#2ecc71' : '#e74c3c' }
                                ]}>
                                    <Text style={styles.fingerDotText}>{name[0]}</Text>
                                </View>
                                <Text style={styles.fingerExpected}>{expected}</Text>
                            </View>
                        );
                    })}
                </View>
            )}

            {!isDetecting && !showSuccess && (
                <View style={styles.hintBox}>
                    <Text style={styles.hintTitle}>Finger positions for {targetLetter} ({numberInfo.english}):</Text>
                    <View style={styles.hintDots}>
                        {FINGER_NAMES.map((name, i) => (
                            <View key={name} style={styles.hintDotWrapper}>
                                <View style={[
                                    styles.hintDot,
                                    { backgroundColor: target[i] === 1 ? '#2ecc71' : '#555' }
                                ]}>
                                    <Text style={styles.hintDotText}>{name[0]}</Text>
                                </View>
                                <Text style={styles.hintLabel}>{target[i] === 1 ? '↑' : '↓'}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.numberInfoBox}>
                        <Text style={styles.numberInfoText}>
                            📌 {numberInfo.pronunciation} = {numberInfo.marathi}
                        </Text>
                    </View>
                </View>
            )}

            <View style={styles.bottomControls}>
                {!isDetecting ? (
                    <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                        <TouchableOpacity style={styles.startButton} onPress={startDetection}>
                            <Text style={styles.startButtonText}>▶  Start Detection</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ) : (
                    <TouchableOpacity style={styles.stopButton} onPress={stopDetection}>
                        <View style={styles.stopDot} />
                        <Text style={styles.stopButtonText}>Stop</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Modal visible={showSuccess} transparent animationType="none">
                <View style={styles.successOverlay}>
                    <Animated.View style={[
                        styles.successBox,
                        { transform: [{ scale: successScale }] }
                    ]}>
                        <LinearGradient colors={['#2ecc71', '#27ae60']} style={styles.successGradient}>
                            <Text style={styles.successEmoji}>🎉</Text>
                            <Text style={styles.successTitle}>Correct!</Text>
                            
                            <View style={styles.successNumberBox}>
                                <Text style={styles.successNumber}>{targetLetter}</Text>
                                <Text style={styles.successNumberLabel}>
                                    {numberInfo.english} ({numberInfo.pronunciation})
                                </Text>
                            </View>
                            
                            <Text style={styles.successSub}>You showed the number perfectly!</Text>

                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={() => { handleRetry(); navigation.goBack(); }}
                            >
                                <Text style={styles.continueButtonText}>Continue</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                                <Text style={styles.retryButtonText}>Try Again</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    camera: { flex: 1 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    permissionText: { color: 'white', fontSize: 18, marginBottom: 20 },
    permissionButton: { backgroundColor: 'white', padding: 15, borderRadius: 10 },
    permissionButtonText: { color: '#667EEA', fontWeight: 'bold', fontSize: 16 },
    scanOverlay: { position: 'absolute', top: '25%', left: '10%', width: '80%', height: '50%' },
    scanCornerTL: { position: 'absolute', top: 0, left: 0, width: 30, height: 30, borderTopWidth: 3, borderLeftWidth: 3, borderColor: '#2ecc71' },
    scanCornerTR: { position: 'absolute', top: 0, right: 0, width: 30, height: 30, borderTopWidth: 3, borderRightWidth: 3, borderColor: '#2ecc71' },
    scanCornerBL: { position: 'absolute', bottom: 0, left: 0, width: 30, height: 30, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: '#2ecc71' },
    scanCornerBR: { position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, borderBottomWidth: 3, borderRightWidth: 3, borderColor: '#2ecc71' },
    topOverlay: { position: 'absolute', top: 0, left: 0, right: 0, paddingTop: 50, paddingHorizontal: 20, paddingBottom: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(0,0,0,0.55)' },
    backButton: { padding: 10 },
    backButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    targetBox: { alignItems: 'center', flex: 1 },
    targetLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
    targetNumberDisplay: { flexDirection: 'row', alignItems: 'baseline', gap: 6, marginVertical: 4 },
    targetNumber: { color: 'white', fontSize: 48, fontWeight: 'bold' },
    targetNumberEnglish: { color: 'rgba(255,255,255,0.9)', fontSize: 16, fontWeight: '600' },
    pingBox: { width: 60, alignItems: 'flex-end' },
    pingText: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },
    progressContainer: { position: 'absolute', top: 148, left: 20, right: 20, flexDirection: 'row', alignItems: 'center', gap: 10 },
    progressBarBg: { flex: 1, height: 10, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 5, overflow: 'hidden' },
    progressBarFill: { height: '100%', borderRadius: 5 },
    progressLabel: { fontSize: 13, fontWeight: 'bold', width: 70, textAlign: 'right' },
    statusBanner: { position: 'absolute', top: 175, left: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.65)', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 16, alignItems: 'center' },
    statusText: { color: 'white', fontSize: 15, fontWeight: '500' },
    detectedText: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 },
    fingerIndicators: { position: 'absolute', bottom: 120, flexDirection: 'row', justifyContent: 'center', width: '100%', gap: 10 },
    fingerDotWrapper: { alignItems: 'center', gap: 3 },
    fingerDot: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(255,255,255,0.25)' },
    fingerDotText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
    fingerExpected: { color: 'rgba(255,255,255,0.6)', fontSize: 10 },
    hintBox: { position: 'absolute', bottom: 120, left: 20, right: 20, backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 16, padding: 16, alignItems: 'center' },
    hintTitle: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 10 },
    hintDots: { flexDirection: 'row', gap: 10, marginBottom: 12 },
    hintDotWrapper: { alignItems: 'center', gap: 3 },
    hintDot: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
    hintDotText: { color: 'white', fontWeight: 'bold', fontSize: 13 },
    hintLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
    numberInfoBox: { backgroundColor: 'rgba(102, 126, 234, 0.2)', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginTop: 8 },
    numberInfoText: { color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: '500' },
    bottomControls: { position: 'absolute', bottom: 40, width: '100%', alignItems: 'center' },
    startButton: { backgroundColor: '#2ecc71', paddingVertical: 16, paddingHorizontal: 50, borderRadius: 30, elevation: 6, shadowColor: '#2ecc71', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 8 },
    startButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    stopButton: { backgroundColor: '#e74c3c', flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 50, borderRadius: 30, alignItems: 'center', gap: 10 },
    stopDot: { width: 12, height: 12, borderRadius: 3, backgroundColor: 'white' },
    stopButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    successOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
    successBox: { width: width * 0.85, borderRadius: 25, overflow: 'hidden' },
    successGradient: { padding: 35, alignItems: 'center' },
    successEmoji: { fontSize: 65 },
    successTitle: { fontSize: 34, fontWeight: 'bold', color: 'white', marginTop: 8 },
    successNumberBox: { alignItems: 'center', marginVertical: 16 },
    successNumber: { fontSize: 80, fontWeight: 'bold', color: 'white' },
    successNumberLabel: { fontSize: 16, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
    successSub: { fontSize: 16, color: 'rgba(255,255,255,0.9)', marginBottom: 28 },
    continueButton: { backgroundColor: 'white', paddingVertical: 14, paddingHorizontal: 50, borderRadius: 25, marginBottom: 12 },
    continueButtonText: { color: '#27ae60', fontWeight: 'bold', fontSize: 18 },
    retryButton: { padding: 10 },
    retryButtonText: { color: 'rgba(255,255,255,0.8)', fontSize: 16 },
    hintInline: { color: 'rgba(255,255,255,0.75)', fontSize: 11, textAlign: 'center', marginTop: 2 },
});

export default CameraNumberScreen;