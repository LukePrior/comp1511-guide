import { defineElements } from '@runno/runtime'
import { generate_snippet, generate_solution } from './snippets.js'
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

// Inset code snippets to webpage
function testSet() {
    var snippets = $("runno-run");
    for (var i=0; i<snippets.length; i++) {
        snippets[i].setEditorProgram("cpp", "clang", generate_snippet(snippets[i].id));
    }
    $('.show-solution').click(function (event) {
        event.preventDefault();
        showSolution(this);
    });
}

function showSolution(e) {
    var selector = "#"+e.id
    var snippet = $(selector);
    if (confirm("Reveal solution (this will overide any existing code)")) {
        snippet[0].setEditorProgram("cpp", "clang", generate_solution(e.id));
    }
}

async function main() {
    await defineElements();
    testSet();
}

main();