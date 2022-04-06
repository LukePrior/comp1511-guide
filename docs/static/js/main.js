import { defineElements } from '@runno/runtime'
import { generate_snippet } from './snippets.js'

// Inset code snippets to webpage
var snippets = document.querySelectorAll("p.snippet");
for (var i=0; i<snippets.length; i++) {
    snippets[i].replaceWith(generate_snippet(snippets[i].id));
}

// Initialise Runno
defineElements();
