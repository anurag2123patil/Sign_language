#!/usr/bin/env python3
"""
Script to organize the ASL dataset for the AlphabetsModule.
This script will copy the best representative images from the dataset 
to our organized folder structure.
"""

import os
import shutil
import random
from pathlib import Path

def organize_asl_dataset():
    """Organize the ASL dataset into our required structure."""
    
    # Source and destination paths
    dataset_path = Path("English/ASL_Alphabet_Dataset/asl_alphabet_train")
    english_dest = Path("English")
    marathi_dest = Path("Marathi")
    
    # Ensure destination directories exist
    english_dest.mkdir(exist_ok=True)
    marathi_dest.mkdir(exist_ok=True)
    
    # English letters (A-Z, a-z)
    english_letters = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
    
    # Copy uppercase letters
    print("Copying English uppercase letters...")
    for letter in english_letters:
        source_folder = dataset_path / letter
        if source_folder.exists():
            # Get all images in the folder
            images = list(source_folder.glob("*.jpg")) + list(source_folder.glob("*.jpeg"))
            
            if images:
                # Select the first image (usually the clearest one)
                selected_image = images[0]
                dest_path = english_dest / f"{letter}.jpg"
                
                try:
                    shutil.copy2(selected_image, dest_path)
                    print(f"✓ Copied {letter}: {selected_image.name} -> {letter}.jpg")
                except Exception as e:
                    print(f"✗ Error copying {letter}: {e}")
            else:
                print(f"✗ No images found for letter {letter}")
        else:
            print(f"✗ Folder not found for letter {letter}")
    
    # For lowercase letters, we'll use the same uppercase images for now
    # since ASL uses the same gestures for uppercase and lowercase
    print("\nCopying English lowercase letters...")
    for letter in english_letters:
        uppercase_path = english_dest / f"{letter}.jpg"
        lowercase_path = english_dest / f"{letter.lower()}.jpg"
        
        if uppercase_path.exists():
            try:
                shutil.copy2(uppercase_path, lowercase_path)
                print(f"✓ Copied {letter} -> {letter.lower()}.jpg")
            except Exception as e:
                print(f"✗ Error copying {letter.lower()}: {e}")
        else:
            print(f"✗ Source not found for {letter}")
    
    print("\n" + "="*50)
    print("✅ Dataset organization complete!")
    print(f"📁 English images: {len(list(english_dest.glob('*.jpg')))}")
    print(f"📁 Marathi images: {len(list(marathi_dest.glob('*.jpg')))}")
    print("\n📋 Next steps:")
    print("1. The English letters are ready to use")
    print("2. For Marathi letters, you can:")
    print("   - Use the same ASL images as placeholders")
    print("   - Find actual Marathi/Indian Sign Language images")
    print("   - Create your own Marathi sign language images")

def create_marathi_placeholders():
    """Create placeholder Marathi images using ASL equivalents."""
    
    marathi_letters = [
        'अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ',
        'क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ',
        'ड', 'ढ', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब',
        'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'
    ]
    
    # Map some Marathi letters to similar ASL letters for placeholder
    asl_mapping = {
        'अ': 'A', 'आ': 'A', 'इ': 'I', 'ई': 'I', 'उ': 'U', 'ऊ': 'U',
        'ए': 'A', 'ऐ': 'A', 'ओ': 'O', 'औ': 'O', 'क': 'K', 'ख': 'K',
        'ग': 'G', 'घ': 'G', 'च': 'C', 'छ': 'C', 'ज': 'J', 'झ': 'J',
        'ट': 'T', 'ठ': 'T', 'ड': 'D', 'ढ': 'D', 'त': 'T', 'थ': 'T',
        'द': 'D', 'ध': 'D', 'न': 'N', 'प': 'P', 'फ': 'F', 'ब': 'B',
        'भ': 'B', 'म': 'M', 'य': 'Y', 'र': 'R', 'ल': 'L', 'व': 'V',
        'श': 'S', 'ष': 'S', 'स': 'S', 'ह': 'H'
    }
    
    english_dest = Path("English")
    marathi_dest = Path("Marathi")
    
    print("\nCreating Marathi placeholder images...")
    for marathi_letter in marathi_letters:
        asl_letter = asl_mapping.get(marathi_letter, 'A')  # Default to 'A' if no mapping
        source_path = english_dest / f"{asl_letter}.jpg"
        dest_path = marathi_dest / f"{marathi_letter}.jpg"
        
        if source_path.exists():
            try:
                shutil.copy2(source_path, dest_path)
                print(f"✓ Created {marathi_letter}.jpg (using ASL {asl_letter})")
            except Exception as e:
                print(f"✗ Error creating {marathi_letter}: {e}")
        else:
            print(f"✗ Source not found for {marathi_letter}")

if __name__ == "__main__":
    print("🚀 Organizing ASL Dataset for AlphabetsModule...")
    print("="*50)
    
    # Check if dataset exists
    dataset_path = Path("English/ASL_Alphabet_Dataset/asl_alphabet_train")
    if not dataset_path.exists():
        print("❌ Dataset not found!")
        print(f"Expected path: {dataset_path.absolute()}")
        print("\nPlease make sure the ASL dataset is extracted in the correct location.")
        exit(1)
    
    # Organize the dataset
    organize_asl_dataset()
    
    # Create Marathi placeholders
    create_marathi_placeholders()
    
    print("\n🎉 All done! Your AlphabetsModule is ready to use!")
    print("\n📱 Test the app now:")
    print("1. Run the frontend app")
    print("2. Navigate to AlphabetsModule")
    print("3. Select English or Marathi")
    print("4. Tap on any letter to see the sign language image!")
