import { defineElements } from '@runno/runtime'

// Fix for Runno
window.process = window.process || {
    platform: null,
    browser: true,
    env: {
      NODE_DEBUG: false,
    }
};

// Initialise Runno
defineElements();