import { defineElements } from '@runno/runtime'
import { generate_snippet, generate_solution, get_name, get_tests } from './snippets.js'
import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

// Register Service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
    });
}

// Inset code snippets to webpage
function testSet() {
    var snippets = $("runno-run");
    snippets.css('display','');
    snippets.css('min-height','');
    for (var i=0; i<snippets.length; i++) {
        snippets[i].setEditorProgram("cpp", "clangpp", generate_snippet(snippets[i].id));
        snippets[i].hideControls()
    }
    $('.run-code').click(function (event) {
      event.preventDefault();
      runCode(this);
    });
    $('.show-solution').click(function (event) {
        event.preventDefault();
        showSolution(this);
    });
    $('.reset-code').click(function (event) {
        event.preventDefault();
        resetCode(this);
    });
    $('.test-code').click(function (event) {
      event.preventDefault();
      testCode(this);
    });
    $('.save-code').click(function (event) {
        event.preventDefault();
        saveCode(this);
    });
    $('.hidden-loader').change(function (event) {
      event.preventDefault();
      loadCode(this);
    });
    getLocalSave()
}

function setupButtons() {
    $(".collapsible").click(function (event) {
        event.preventDefault();
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
            content.style.borderRadius = "15px";
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.borderRadius = "0px 0px 15px 15px";
        } 
    });
}

async function runCode(e) {
  var selector = "#"+e.id
  var snippet = $(selector);
  var code = await snippet[0].getEditorProgram();
  localStorage.setItem(e.id, code);
  snippet[0].interactiveRunCode("clangpp", code);
}

function showSolution(e) {
    var selector = "#"+e.id
    var snippet = $(selector);
    if (confirm("Reveal solution (this will overide any existing code)")) {
        //snippet[0].interactiveUnsafeCommand('clear', {}); // ToDo FIX
        snippet[0].setEditorProgram("cpp", "clangpp", generate_solution(e.id));
    }
}

function resetCode(e) {
    var selector = "#"+e.id
    var snippet = $(selector);
    if (confirm("Reset code (this will overide any existing code)")) {
        //snippet[0].interactiveUnsafeCommand('clear', {}); // ToDo FIX
        snippet[0].setEditorProgram("cpp", "clangpp", generate_snippet(e.id));
    }
}

async function testCode(e) {
  var selector = "#"+e.id
  var snippet = $(selector);
  var code = await snippet[0].getEditorProgram();
  var tests = get_tests(e.id);
  for (var test in tests) {
    stdin = tests[test]
    var result = await snippet[0].headlessRunCode("clangpp", code, stdin); // waiting for fix
    console.log(result);
  }
}

async function getLocalSave() {
  var snippets = $("runno-run");
  for (var i=0; i<snippets.length; i++) {
      var code = localStorage.getItem(snippets[i].id);
      if (code != null) {
        snippets[i].setEditorProgram("cpp", "clangpp", code);
      }
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

async function loadCode(e) {
  var selector = "#"+e.id.replace("load", "");
  var snippet = $(selector);
  if (e.files[0]) {
    var file = e.files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        //snippet[0].interactiveUnsafeCommand('clear', {}); // ToDo FIX
        snippet[0].setEditorProgram("cpp", "clangpp", evt.target.result);
    }
    reader.onerror = function (evt) {
      console.error(evt);
    }
  }
}

async function main() {
    await defineElements();
    testSet();
    setupButtons()
}

main();