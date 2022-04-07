export function generate_snippet(id) {
    if (snippets.hasOwnProperty(id)) {
        return snippets[id];
    } else {
        return "";
    }
}

export function generate_solution(id) {
    if (solutions.hasOwnProperty(id)) {
        return solutions[id];
    } else {
        return "";
    }
}

var snippets = {};
var solutions = {};

snippets["1"] = 
`#include <stdio.h>
#include <string.h>

#define MAX_LENGTH 1024

int main (void) {
    char word[MAX_LENGTH];
    printf("Input word: ");
    fflush(stdout);
    fgets(word, MAX_LENGTH, stdin);

    printf("%s", word);
  
    return 0;
}`

solutions["1"] = 
`#include <stdio.h>
#include <string.h>

#define MAX_LENGTH 1024

int main (void) {
    char word[MAX_LENGTH];
    printf("Input word: ");
    fflush(stdout);
    fgets(word, MAX_LENGTH, stdin);

    printf("%s", word);
  
    return 0;
}`