
# Sign Language Image Download Instructions

## Method 1: Manual Download from Educational Websites

### American Sign Language (ASL) - Good for English letters
1. Visit: https://www.signingsavvy.com
2. Search for each letter (A, B, C, etc.)
3. Download the image files
4. Rename them to match our naming convention (A.jpg, B.jpg, etc.)

### Indian Sign Language (ISL) - Good for Marathi letters
1. Visit: https://www.indiansignlanguage.org
2. Look for alphabet section
3. Download images for Marathi letters
4. Rename them to match our naming convention (अ.jpg, आ.jpg, etc.)

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
- Uppercase: A.jpg, B.jpg, C.jpg... Z.jpg
- Lowercase: a.jpg, b.jpg, c.jpg... z.jpg

### Marathi Letters:
- अ.jpg, आ.jpg, इ.jpg, ई.jpg, उ.jpg, ऊ.jpg, ए.jpg, ऐ.jpg, ओ.jpg, औ.jpg
- क.jpg, ख.jpg, ग.jpg, घ.jpg, च.jpg, छ.jpg, ज.jpg, झ.jpg, ट.jpg, ठ.jpg
- ड.jpg, ढ.jpg, त.jpg, थ.jpg, द.jpg, ध.jpg, न.jpg, प.jpg, फ.jpg, ब.jpg
- भ.jpg, म.jpg, य.jpg, र.jpg, ल.jpg, व.jpg, श.jpg, ष.jpg, स.jpg, ह.jpg

## Image Specifications
- Format: JPG or PNG
- Resolution: 720x720 pixels minimum
- File size: Under 2MB each
- Quality: High resolution, clear hand gestures
