#!/usr/bin/env python3
"""
Script to create sample placeholder images for testing the AlphabetsModule.
These are simple static images showing the letter with sign language gestures.
"""

import cv2
import numpy as np
import os
from pathlib import Path

def create_sample_image(letter, output_path, width=720, height=720):
    """
    Create a simple static image showing a letter with sign language gesture.
    
    Args:
        letter (str): The letter to display
        output_path (str): Path where to save the image
        width (int): Image width
        height (int): Image height
    """
    # Create a white background
    image = np.ones((height, width, 3), dtype=np.uint8) * 255
    
    # Create a gradient background
    for y in range(height):
        for x in range(width):
            # Create a subtle gradient from light blue to white
            gradient_value = int(255 - (y / height) * 50)
            blue_value = min(255, gradient_value + 20)  # Ensure it doesn't exceed 255
            image[y, x] = [gradient_value, blue_value, 255]
    
    # Draw a circle in the center
    center_x, center_y = width // 2, height // 2
    cv2.circle(image, (center_x, center_y), 120, (52, 152, 219), -1)
    cv2.circle(image, (center_x, center_y), 120, (255, 255, 255), 3)
    
    # Draw the letter
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 4
    color = (255, 255, 255)
    thickness = 6
    
    # Get text size to center it
    text_size = cv2.getTextSize(letter, font, font_scale, thickness)[0]
    text_x = center_x - text_size[0] // 2
    text_y = center_y + text_size[1] // 2
    
    # Add text shadow
    cv2.putText(image, letter, (text_x + 2, text_y + 2), font, font_scale, (0, 0, 0), thickness)
    cv2.putText(image, letter, (text_x, text_y), font, font_scale, color, thickness)
    
    # Add decorative elements around the circle
    for i in range(8):
        angle = i * 2 * np.pi / 8
        x = int(center_x + 200 * np.cos(angle))
        y = int(center_y + 200 * np.sin(angle))
        cv2.circle(image, (x, y), 8, (52, 152, 219), -1)
    
    # Add a subtle border
    cv2.rectangle(image, (0, 0), (width-1, height-1), (200, 200, 200), 2)
    
    # Save the image
    cv2.imwrite(output_path, image)
    print(f"Created sample image: {output_path}")

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
    
    print("Creating English letter images...")
    for letter in english_letters:
        output_path = os.path.join(english_dir, f"{letter}.jpg")
        create_sample_image(letter, output_path)
    
    print("Creating Marathi letter images...")
    for letter in marathi_letters:
        output_path = os.path.join(marathi_dir, f"{letter}.jpg")
        create_sample_image(letter, output_path)
    
    print("All sample images created successfully!")
    print(f"Total images created: {len(english_letters) + len(marathi_letters)}")
