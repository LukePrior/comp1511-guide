import { defineElements } from '@runno/runtime'
import { generate_snippet } from './snippets.js'

// Fix for Runno
window.process = window.process || {
    platform: null,
    browser: true,
    env: {
      NODE_DEBUG: false,
    }
};

console.log(generate_snippet("1"));

// Initialise Runno
defineElements();