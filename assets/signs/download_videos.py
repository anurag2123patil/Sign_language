#!/usr/bin/env python3
"""
Script to download sign language videos from free educational resources.
This script provides URLs and instructions for downloading sign language videos.
"""

import os
from pathlib import Path

# Free sign language video resources
SIGN_LANGUAGE_RESOURCES = {
    "American Sign Language (ASL)": {
        "description": "Free ASL alphabet videos",
        "urls": [
            "https://www.signingsavvy.com",
            "https://www.lifeprint.com/asl101/lessons/lesson02.htm",
            "https://www.handspeak.com/word/search/index.php?id=alphabet"
        ],
        "notes": "These sites provide free ASL alphabet videos that can be downloaded"
    },
    "Indian Sign Language (ISL)": {
        "description": "Indian Sign Language resources",
        "urls": [
            "https://www.indiansignlanguage.org",
            "https://www.signlanguage.in",
            "https://www.disabilityindia.org/signlanguage/"
        ],
        "notes": "ISL resources for Indian context"
    },
    "Educational Videos": {
        "description": "General educational sign language videos",
        "urls": [
            "https://www.youtube.com/results?search_query=sign+language+alphabet",
            "https://www.khanacademy.org",
            "https://www.edx.org"
        ],
        "notes": "Search for 'sign language alphabet' on these platforms"
    }
}

def create_download_instructions():
    """Create detailed instructions for downloading videos."""
    
    instructions = """
# Sign Language Video Download Instructions

## Method 1: Manual Download from Educational Websites

### American Sign Language (ASL) - Good for English letters
1. Visit: https://www.signingsavvy.com
2. Search for each letter (A, B, C, etc.)
3. Download the video files
4. Rename them to match our naming convention (A.mp4, B.mp4, etc.)

### Indian Sign Language (ISL) - Good for Marathi letters
1. Visit: https://www.indiansignlanguage.org
2. Look for alphabet section
3. Download videos for Marathi letters
4. Rename them to match our naming convention (अ.mp4, आ.mp4, etc.)

### YouTube Downloads
1. Search for "sign language alphabet" on YouTube
2. Use tools like:
   - yt-dlp (command line): `yt-dlp "video_url"`
   - 4K Video Downloader (GUI)
   - Online YouTube downloaders
3. Convert to MP4 format if needed

## Method 2: Using yt-dlp (Recommended)

### Install yt-dlp
```bash
pip install yt-dlp
```

### Download from YouTube
```bash
# Download specific video
yt-dlp -f "best[height<=720]" "https://youtube.com/watch?v=VIDEO_ID"

# Download playlist
yt-dlp -f "best[height<=720]" "https://youtube.com/playlist?list=PLAYLIST_ID"
```

### Example URLs to search for:
- "ASL alphabet" - for English letters
- "Indian sign language alphabet" - for Marathi letters
- "sign language A" - for specific letters

## Method 3: Create Your Own Videos

### Equipment Needed:
- Smartphone or camera
- Good lighting
- Plain background
- Tripod (optional but recommended)

### Recording Steps:
1. Set up camera with good lighting
2. Use plain white or light blue background
3. Record 3-5 second videos for each letter
4. Keep hand gestures clear and centered
5. Maintain consistent lighting and positioning

### Post-Processing:
1. Trim videos to 3-5 seconds
2. Convert to MP4 format
3. Ensure 720p or 1080p resolution
4. Keep file size under 5MB per video

## File Naming Convention

### English Letters:
- Uppercase: A.mp4, B.mp4, C.mp4... Z.mp4
- Lowercase: a.mp4, b.mp4, c.mp4... z.mp4

### Marathi Letters:
- अ.mp4, आ.mp4, इ.mp4, ई.mp4, उ.mp4, ऊ.mp4, ए.mp4, ऐ.mp4, ओ.mp4, औ.mp4
- क.mp4, ख.mp4, ग.mp4, घ.mp4, च.mp4, छ.mp4, ज.mp4, झ.mp4, ट.mp4, ठ.mp4
- ड.mp4, ढ.mp4, त.mp4, थ.mp4, द.mp4, ध.mp4, न.mp4, प.mp4, फ.mp4, ब.mp4
- भ.mp4, म.mp4, य.mp4, र.mp4, ल.mp4, व.mp4, श.mp4, ष.mp4, स.mp4, ह.mp4

## Video Specifications
- Format: MP4 (H.264 codec)
- Resolution: 720p (1280x720) minimum
- Duration: 3-5 seconds
- File size: Under 5MB each
- Audio: Silent (no audio needed)
"""
    
    with open("DOWNLOAD_INSTRUCTIONS.md", "w", encoding="utf-8") as f:
        f.write(instructions)
    
    print("Download instructions created: DOWNLOAD_INSTRUCTIONS.md")

def create_video_checklist():
    """Create a checklist for tracking which videos are needed."""
    
    checklist = """
# Video Checklist

## English Alphabet (52 videos needed)

### Uppercase (26 videos)
- [ ] A.mp4
- [ ] B.mp4
- [ ] C.mp4
- [ ] D.mp4
- [ ] E.mp4
- [ ] F.mp4
- [ ] G.mp4
- [ ] H.mp4
- [ ] I.mp4
- [ ] J.mp4
- [ ] K.mp4
- [ ] L.mp4
- [ ] M.mp4
- [ ] N.mp4
- [ ] O.mp4
- [ ] P.mp4
- [ ] Q.mp4
- [ ] R.mp4
- [ ] S.mp4
- [ ] T.mp4
- [ ] U.mp4
- [ ] V.mp4
- [ ] W.mp4
- [ ] X.mp4
- [ ] Y.mp4
- [ ] Z.mp4

### Lowercase (26 videos)
- [ ] a.mp4
- [ ] b.mp4
- [ ] c.mp4
- [ ] d.mp4
- [ ] e.mp4
- [ ] f.mp4
- [ ] g.mp4
- [ ] h.mp4
- [ ] i.mp4
- [ ] j.mp4
- [ ] k.mp4
- [ ] l.mp4
- [ ] m.mp4
- [ ] n.mp4
- [ ] o.mp4
- [ ] p.mp4
- [ ] q.mp4
- [ ] r.mp4
- [ ] s.mp4
- [ ] t.mp4
- [ ] u.mp4
- [ ] v.mp4
- [ ] w.mp4
- [ ] x.mp4
- [ ] y.mp4
- [ ] z.mp4

## Marathi Alphabet (47 videos needed)
- [ ] अ.mp4
- [ ] आ.mp4
- [ ] इ.mp4
- [ ] ई.mp4
- [ ] उ.mp4
- [ ] ऊ.mp4
- [ ] ए.mp4
- [ ] ऐ.mp4
- [ ] ओ.mp4
- [ ] औ.mp4
- [ ] क.mp4
- [ ] ख.mp4
- [ ] ग.mp4
- [ ] घ.mp4
- [ ] च.mp4
- [ ] छ.mp4
- [ ] ज.mp4
- [ ] झ.mp4
- [ ] ट.mp4
- [ ] ठ.mp4
- [ ] ड.mp4
- [ ] ढ.mp4
- [ ] त.mp4
- [ ] थ.mp4
- [ ] द.mp4
- [ ] ध.mp4
- [ ] न.mp4
- [ ] प.mp4
- [ ] फ.mp4
- [ ] ब.mp4
- [ ] भ.mp4
- [ ] म.mp4
- [ ] य.mp4
- [ ] र.mp4
- [ ] ल.mp4
- [ ] व.mp4
- [ ] श.mp4
- [ ] ष.mp4
- [ ] स.mp4
- [ ] ह.mp4

## Progress Tracking
Total videos needed: 99
Videos completed: ___ / 99
Completion percentage: ___%
"""
    
    with open("VIDEO_CHECKLIST.md", "w", encoding="utf-8") as f:
        f.write(checklist)
    
    print("Video checklist created: VIDEO_CHECKLIST.md")

if __name__ == "__main__":
    print("Creating video download resources...")
    create_download_instructions()
    create_video_checklist()
    print("Resources created successfully!")
    print("\nNext steps:")
    print("1. Read DOWNLOAD_INSTRUCTIONS.md for detailed download methods")
    print("2. Use VIDEO_CHECKLIST.md to track your progress")
    print("3. Start with a few videos to test the app functionality")
