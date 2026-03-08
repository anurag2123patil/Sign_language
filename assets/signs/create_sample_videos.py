#!/usr/bin/env python3
"""
Script to create sample placeholder videos for testing the AlphabetsModule.
These are simple animated videos showing the letter with basic animations.
"""

import cv2
import numpy as np
import os
from pathlib import Path

def create_sample_video(letter, output_path, duration=3, fps=30):
    """
    Create a simple animated video showing a letter with basic animation.
    
    Args:
        letter (str): The letter to display
        output_path (str): Path where to save the video
        duration (int): Duration in seconds
        fps (int): Frames per second
    """
    # Video properties
    width, height = 720, 720
    total_frames = duration * fps
    
    # Create video writer
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    
    for frame_num in range(total_frames):
        # Create a white background
        frame = np.ones((height, width, 3), dtype=np.uint8) * 255
        
        # Calculate animation progress (0 to 1)
        progress = frame_num / total_frames
        
        # Create a simple animation effect
        center_x, center_y = width // 2, height // 2
        
        # Draw a circle that grows and shrinks
        radius = int(50 + 30 * np.sin(progress * 4 * np.pi))
        cv2.circle(frame, (center_x, center_y), radius, (52, 152, 219), -1)
        
        # Draw the letter
        font = cv2.FONT_HERSHEY_SIMPLEX
        font_scale = 3
        color = (255, 255, 255)
        thickness = 4
        
        # Get text size to center it
        text_size = cv2.getTextSize(letter, font, font_scale, thickness)[0]
        text_x = center_x - text_size[0] // 2
        text_y = center_y + text_size[1] // 2
        
        cv2.putText(frame, letter, (text_x, text_y), font, font_scale, color, thickness)
        
        # Add some decorative elements
        for i in range(5):
            angle = progress * 2 * np.pi + i * 2 * np.pi / 5
            x = int(center_x + 100 * np.cos(angle))
            y = int(center_y + 100 * np.sin(angle))
            cv2.circle(frame, (x, y), 5, (52, 152, 219), -1)
        
        out.write(frame)
    
    out.release()
    print(f"Created sample video: {output_path}")

if __name__ == "__main__":
    # Get the current script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Create directories relative to the script location
    english_dir = os.path.join(script_dir, "English")
    marathi_dir = os.path.join(script_dir, "Marathi")
    
    # Create directories if they don't exist
    os.makedirs(english_dir, exist_ok=True)
    os.makedirs(marathi_dir, exist_ok=True)
    
    # English letters (uppercase and lowercase)
    english_letters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ]
    
    # Marathi letters
    marathi_letters = [
        'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ',
        'क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ',
        'ड', 'ढ', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब',
        'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'
    ]
    
    print("Creating English letter videos...")
    for letter in english_letters:
        output_path = os.path.join(english_dir, f"{letter}.mp4")
        create_sample_video(letter, output_path)
    
    print("Creating Marathi letter videos...")
    for letter in marathi_letters:
        output_path = os.path.join(marathi_dir, f"{letter}.mp4")
        create_sample_video(letter, output_path)
    
    print("All sample videos created successfully!")
    print(f"Total videos created: {len(english_letters) + len(marathi_letters)}")
