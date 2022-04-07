import { defineElements } from '@runno/runtime'
import { generate_snippet, generate_solution, get_name } from './snippets.js'
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
    $('.reset-code').click(function (event) {
        event.preventDefault();
        resetCode(this);
    });
    $('.save-code').click(function (event) {
        event.preventDefault();
        saveCode(this);
    });
}

function showSolution(e) {
    var selector = "#"+e.id
    var snippet = $(selector);
    if (confirm("Reveal solution (this will overide any existing code)")) {
        snippet[0].interactiveUnsafeCommand('clear', {}); // ToDo FIX
        snippet[0].setEditorProgram("cpp", "clang", generate_solution(e.id));
    }
}

function resetCode(e) {
    var selector = "#"+e.id
    var snippet = $(selector);
    if (confirm("Reset code (this will overide any existing code)")) {
        snippet[0].interactiveUnsafeCommand('clear', {}); // ToDo FIX
        snippet[0].setEditorProgram("cpp", "clang", generate_snippet(e.id));
    }
}

async function saveCode(e) {
    var selector = "#"+e.id
    var snippet = $(selector);

    var code = await snippet[0].getEditorProgram();

    var file = new File([code], get_name(e.id), {
        type: "text/plain",
    });

    if("showSaveFilePicker" in window) {
        try {
          const file = await window.showSaveFilePicker({
            suggestedName: 'code.c',
            types: [
              {
                accept: {"text/plain": [".c"]}
              }
            ]
          })
          const writable = await file.createWritable();
          await writable.write(code);
          await writable.close();
        } catch (e) {
          console.error(e)
        }
      } else {
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = get_name(e.id);
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
      }
}

async function main() {
    await defineElements();
    testSet();
}

main();