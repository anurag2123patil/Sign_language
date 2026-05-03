// Image mapping for sign language letters
// This file imports all the sign language images

const NumberImages = {
  '1': require('../../assets/numbers/1.jpg'),
  '2': require('../../assets/numbers/2.jpg'),
  '3': require('../../assets/numbers/3.jpg'),
  '4': require('../../assets/numbers/4.jpg'),
  '5': require('../../assets/numbers/5.jpg'),
  '6': require('../../assets/numbers/6.jpg'),
  '7': require('../../assets/numbers/7.jpg'),
  '8': require('../../assets/numbers/8.jpg'),
  '9': require('../../assets/numbers/9.jpg'),
  '10': require('../../assets/numbers/10.jpg'),
};

const MarathiLetters = {
  'अ': require('../../assets/signs/Marathi/अ.jpg'),
  'आ': require('../../assets/signs/Marathi/आ.jpg'),
  'इ': require('../../assets/signs/Marathi/इ.jpg'),
  'ई': require('../../assets/signs/Marathi/ई.jpg'),
  'उ': require('../../assets/signs/Marathi/उ.jpg'),
  'ऊ': require('../../assets/signs/Marathi/ऊ.jpg'),
  'ए': require('../../assets/signs/Marathi/ए.jpg'),
  'ऐ': require('../../assets/signs/Marathi/ऐ.jpg'),
  'ओ': require('../../assets/signs/Marathi/ओ.jpg'),
  'औ': require('../../assets/signs/Marathi/औ.jpg'),

  'क': require('../../assets/signs/Marathi/क.jpg'),
  'ख': require('../../assets/signs/Marathi/ख.jpg'),
  'ग': require('../../assets/signs/Marathi/ग.jpg'),
  'घ': require('../../assets/signs/Marathi/घ.jpg'),
  'च': require('../../assets/signs/Marathi/च.jpg'),
  'छ': require('../../assets/signs/Marathi/छ.jpg'),
  'ज': require('../../assets/signs/Marathi/ज.jpg'),
  'झ': require('../../assets/signs/Marathi/झ.jpg'),
  'ट': require('../../assets/signs/Marathi/ट.jpg'),
  'ठ': require('../../assets/signs/Marathi/ठ.jpg'),
  'ड': require('../../assets/signs/Marathi/ड.jpg'),
  'ढ': require('../../assets/signs/Marathi/ढ.jpg'),
  'त': require('../../assets/signs/Marathi/त.jpg'),
  'थ': require('../../assets/signs/Marathi/थ.jpg'),
  'द': require('../../assets/signs/Marathi/द.jpg'),
  'ध': require('../../assets/signs/Marathi/ध.jpg'),
  'न': require('../../assets/signs/Marathi/न.jpg'),

  'प': require('../../assets/signs/Marathi/प.jpg'),
  'फ': require('../../assets/signs/Marathi/फ.jpg'),
  'ब': require('../../assets/signs/Marathi/ब.jpg'),
  'भ': require('../../assets/signs/Marathi/भ.jpg'),
  'म': require('../../assets/signs/Marathi/म.jpg'),

  'य': require('../../assets/signs/Marathi/य.jpg'),
  'र': require('../../assets/signs/Marathi/र.jpg'),
  'ल': require('../../assets/signs/Marathi/ल.jpg'),
  'व': require('../../assets/signs/Marathi/व.jpg'),
  'श': require('../../assets/signs/Marathi/श.jpg'),
  'स': require('../../assets/signs/Marathi/स.jpg'),
  'ह': require('../../assets/signs/Marathi/ह.jpg'),
  'ळ': require('../../assets/signs/Marathi/ळ.jpg'),
  'क्ष': require('../../assets/signs/Marathi/क्ष.jpg'),
  'ज्ञ': require('../../assets/signs/Marathi/ज्ञ.jpg'),
};


// Function to get image source
export const getImageSource = (letter) => {
  return MarathiLetters[letter] || NumberImages[letter] || null;
};

export default {
  MarathiLetters,
  NumberImages,
  getImageSource,
};