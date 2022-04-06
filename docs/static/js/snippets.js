export function generate_snippet(id) {
    return snippets[id].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var snippets = {};

snippets["1"] = `
#include <stdio.h>
#include <string.h>

#define MAX_LENGTH 1024

int main (void) {
    char word[MAX_LENGTH];
    printf("Input word: ");
    fflush(stdout);
    fgets(word, MAX_LENGTH, stdin);

    printf("\nWord square is:\n");

    int string_length = strlen(word);
    int i = 1;
    while (i < string_length) {
        printf("%s", word);
        i++;
    }
  
    return 0;
}
`