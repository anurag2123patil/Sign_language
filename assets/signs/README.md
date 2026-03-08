# Sign Language Video Assets

This directory contains sign language videos for the Alphabet Learning module.

## Directory Structure
```
assets/signs/
├── English/          # English alphabet videos (A-Z, a-z)
│   ├── A.mp4        # Uppercase A
│   ├── a.mp4        # Lowercase a
│   ├── B.mp4        # Uppercase B
│   ├── b.mp4        # Lowercase b
│   └── ...          # Continue for all 52 letters
└── Marathi/         # Marathi alphabet videos (अ to ह)
    ├── अ.mp4        # First Marathi letter
    ├── आ.mp4        # Second Marathi letter
    ├── इ.mp4        # Third Marathi letter
    └── ...          # Continue for all Marathi letters
```

## Video Specifications

### Technical Requirements
- **Format**: MP4 (H.264 codec)
- **Resolution**: 720p (1280x720) minimum, 1080p (1920x1080) preferred
- **Frame Rate**: 30 FPS
- **Duration**: 3-5 seconds per letter
- **File Size**: Keep under 5MB per video for mobile performance
- **Audio**: No audio required (silent videos)

### Content Guidelines
- **Lighting**: Well-lit environment, preferably natural light
- **Background**: Solid, contrasting background (white or light blue)
- **Hand Position**: Center the hand gesture in the frame
- **Clarity**: Sharp, clear hand movements
- **Consistency**: Same person performing all signs for consistency
- **Orientation**: Portrait or landscape (app will handle scaling)

### Naming Convention
- **English**: Exact letter names (A.mp4, a.mp4, B.mp4, b.mp4, etc.)
- **Marathi**: Unicode characters (अ.mp4, आ.mp4, इ.mp4, etc.)

## Required Videos

### English Alphabet (52 videos total)
**Uppercase (26 videos):**
A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z

**Lowercase (26 videos):**
a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z

### Marathi Alphabet (47 videos total)
अ, आ, इ, ई, उ, ऊ, ए, ऐ, ओ, औ, क, ख, ग, घ, च, छ, ज, झ, ट, ठ, ड, ढ, त, थ, द, ध, न, प, फ, ब, भ, म, य, र, ल, व, श, ष, स, ह

## Video Recording Tips

1. **Setup**:
   - Use a tripod or stable surface
   - Ensure consistent lighting
   - Choose a plain background
   - Position camera at eye level

2. **Recording**:
   - Start with hand in neutral position
   - Perform the sign clearly and slowly
   - Hold the final position for 1 second
   - Return to neutral position
   - Keep movements smooth and deliberate

3. **Post-Processing**:
   - Trim to 3-5 seconds duration
   - Ensure consistent video quality
   - Compress if file size is too large
   - Test playback on mobile devices

## Integration Notes

The AlphabetsModule will automatically load videos based on the file paths:
- English: `assets/signs/English/{letter}.mp4`
- Marathi: `assets/signs/Marathi/{letter}.mp4`

If a video file is missing, the app will show a placeholder with the sign description text.
