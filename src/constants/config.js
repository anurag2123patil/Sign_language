// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'Sign Language Education',
  VERSION: '1.0.0',
  SUPPORTED_LANGUAGES: ['mr'],
  DEFAULT_LANGUAGE: 'mr',
};

// Storage Keys
export const STORAGE_KEYS = {
  LANGUAGE: 'language',
  THEME: 'theme',
  OFFLINE_DATA: 'offline_data',
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_VIDEO_TYPES: ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword', 'text/plain'],
};

// Practice Configuration
export const PRACTICE_CONFIG = {
  MIN_ACCURACY_THRESHOLD: 60,
  COMPLETION_THRESHOLD: 80,
  MAX_ATTEMPTS: 3,
  TIME_LIMITS: {
    writing: 300, // 5 minutes
    typing: 180, // 3 minutes
    drawing: 600, // 10 minutes
  },
};

// Chart Configuration
export const CHART_CONFIG = {
  COLORS: [
    '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336',
    '#00BCD4', '#795548', '#607D8B', '#E91E63', '#3F51B5'
  ],
  GRADIENT_COLORS: [
    ['#4CAF50', '#8BC34A'],
    ['#2196F3', '#03A9F4'],
    ['#FF9800', '#FFC107'],
    ['#9C27B0', '#E91E63'],
    ['#F44336', '#FF5722']
  ],
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  DURATION: {
    SHORT: 200,
    MEDIUM: 300,
    LONG: 500,
  },
  EASING: {
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
  },
};
