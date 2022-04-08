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

export function get_name(id) {
    if (names.hasOwnProperty(id)) {
        return names[id];
    } else {
        return "";
    }
}

export function get_tests(id) {
    if (tests.hasOwnProperty(id)) {
        return tests[id];
    } else {
        return "";
    }
}

var snippets = {};
var solutions = {};
var names = {};
var tests = {};

names[1] = "addition.c";
names[2] = "negative.c";
names[3] = "get_letter.c";
names[4] = "is_leap_year.c";
names[5] = "dice_range.c";
names[6] = "word_addition.c";
names[7] = "text_game.c";

snippets["1"] = 
`#include <stdio.h>

int main(void) {

    return 0;
}`

snippets["2"] = 
`#include <stdio.h>

int main(void) {

    return 0;
}`

snippets["3"] = 
`#include <stdio.h>

int main(void) {

    return 0;
}`

snippets["4"] = 
`#include <stdio.h>

int main(void) {

    return 0;
}`

snippets["5"] = 
`#include <stdio.h>

int main(void) {

    return 0;
}`

snippets["6"] = 
`#include <stdio.h>

int main(void) {

    return 0;
}`

snippets["7"] = 
`#include <stdio.h>

int main(void) {
    // TODO: Put any setup code here
    
    // This code will make anything in the brackets run forever
    while (1) {
        // TODO: Fill this in with the game
    }
    
    return 0;
}`

solutions["1"] = 
`#include <stdio.h>

int main(void) {
    // Make two integers to store the scanned-in values.
    int x, y;

    // Get the two numbers from the user.
    printf("Please enter the number of students and tutors: ");
    fflush(stdout);
    scanf("%d %d", &x, &y);

    // Calculate the sum of the two numbers, and store it in a variable.
    int sum = x + y;

    // Print out the sum of the two numbers.
    printf("%d + %d = %d\\n", x, y, sum);

    return 0;
}`

solutions["2"] = 
`#include <stdio.h>

int main(void) {
    int num;

    // Read in a number.
    scanf("%d", &num);

    // Print the relevant message.
    if (num > 0) {
        printf("You have entered a positive number.\\n");
    } else if (num == 0) {
        printf("You have entered zero.\\n");
    } else {
        printf("Don't be so negative!\\n");
    }

    return 0;
}`

solutions["3"] = 
`#include <stdio.h>

#define NUM_ALPHABET 26

int main(void) {

    char is_uppercase;
    printf("Uppercase: ");
    fflush(stdout);
    scanf("%c", &is_uppercase);

    if (is_uppercase != 'y' && is_uppercase != 'n') {
        printf("You need to enter 'y' or 'n'\\n");
        printf("Exiting the program with error code 1\\n");
        return 1;
    }

    int index;
    printf("Index: ");
    fflush(stdout);
    scanf("%d", &index);

    if (index < 1 || index > NUM_ALPHABET) {
        printf("You need to enter a number between 1 and 26 inclusive\\n");
        printf("Exiting the program with error code 2\\n");
        return 2;
    }
    
    char letter;
    if (is_uppercase == 'y') {
        letter = 'A' + index - 1;
    } else {
        letter = 'a' + index - 1;
    }
    printf("The letter is %c\\n", letter);

    return 0;
}`

solutions["4"] = 
`#include <stdio.h>

int main(void) {
    int year;

    printf("Enter year: ");
    fflush(stdout);
    if (scanf("%d", &year) != 1) {
        return 1;
    }

    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)) {
        printf("%d is a leap year.\\n", year);
    } else {
        printf("%d is not a leap year.\\n", year);
    }

    return 0;
}`

solutions["5"] = 
`#include <stdio.h>

int main(void) {
    int diceSize;
    int numDice;
    int lowest;
    int highest;
    double average;
    
    // scan in dice stats
    printf("Enter the number of sides on your dice: ");
    fflush(stdout);
    scanf("%d", &diceSize);
    printf("Enter the number of dice being rolled: ");
    fflush(stdout);
    scanf("%d", &numDice);

    // calculate lowest and highest values
    lowest = numDice;
    highest = numDice * diceSize;
    
    // calculate average. The 2.0 makes the result a double
    average = (lowest + highest) / 2.0;
    
    if (diceSize <= 0 || highest <= 0) {
        printf("These dice will not produce a range.\\n");
    } else {
        printf("Your dice range is %d to %d.\\n", lowest, highest);
        printf("The average value is %lf\\n", average);
    }

    return 0;
}`

solutions["6"] = 
`#include <stdio.h>

int main(void) {
    int num1, num2;
    printf("Please enter two integers: ");
    fflush(stdout);
    scanf("%d %d", &num1, &num2);
    int sum = num1 + num2;

    // First, deal with num1.
    // Is it between -10 and 10?
    if (num1 >= -10 && num1 <= 10) {
        // Is it negative?
        if (num1 < 0) {
            printf("negative ");
            num1 *= -1;
        }
        // Print out whatever the digit is.
        if (num1 == 0) {
            printf("zero");
        }
        if (num1 == 1) {
            printf("one");
        }
        if (num1 == 2) {
            printf("two");
        }
        if (num1 == 3) {
            printf("three");
        }
        if (num1 == 4) {
            printf("four");
        }
        if (num1 == 5) {
            printf("five");
        }
        if (num1 == 6) {
            printf("six");
        }
        if (num1 == 7) {
            printf("seven");
        }
        if (num1 == 8) {
            printf("eight");
        }
        if (num1 == 9) {
            printf("nine");
        }
        if (num1 == 10) {
            printf("ten");
        }
    } else {
        // It wasn't between -10 and 10, so print out the number as is.
        printf("%d", num1);
    }

    // Now, print out the plus sign...
    printf(" + ");

    // Now, deal with num2
    // Is it between -10 and 10?
    if (num2 >= -10 && num2 <= 10) {
        // Is it negative?
        if (num2 < 0) {
            printf("negative ");
            num2 *= -1;
        }
        // Print out whatever the digit is
        if (num2 == 0) {
            printf("zero");
        }
        if (num2 == 1) {
            printf("one");
        }
        if (num2 == 2) {
            printf("two");
        }
        if (num2 == 3) {
            printf("three");
        }
        if (num2 == 4) {
            printf("four");
        }
        if (num2 == 5) {
            printf("five");
        }
        if (num2 == 6) {
            printf("six");
        }
        if (num2 == 7) {
            printf("seven");
        }
        if (num2 == 8) {
            printf("eight");
        }
        if (num2 == 9) {
            printf("nine");
        }
        if (num2 == 10) {
            printf("ten");
        }
    } else {
        // It wasn't between -10 and 10, so print out the number as is.
        printf("%d", num2);
    }

    // Now, print the equals sign.
    printf(" = ");


    // Now, deal with the sum
    // Is it between -10 and 10?
    if (sum >= -10 && sum <= 10) {
        // Is it negative?
        if (sum < 0) {
            printf("negative ");
            sum *= -1;
        }
        // Print out whatever the digit is.
        if (sum == 0) {
            printf("zero\\n");
        }
        if (sum == 1) {
            printf("one\\n");
        }
        if (sum == 2) {
            printf("two\\n");
        }
        if (sum == 3) {
            printf("three\\n");
        }
        if (sum == 4) {
            printf("four\\n");
        }
        if (sum == 5) {
            printf("five\\n");
        }
        if (sum == 6) {
            printf("six\\n");
        }
        if (sum == 7) {
            printf("seven\\n");
        }
        if (sum == 8) {
            printf("eight\\n");
        }
        if (sum == 9) {
            printf("nine\\n");
        }
        if (sum == 10) {
            printf("ten\\n");
        }
    } else {
        // It wasn't between -10 and 10, so print out the number as is.
        printf("%d\\n", sum);
    }

    return 0;
}`

solutions["7"] = 
`#include <stdio.h>
#include <stdlib.h>

#define MAX_NUMBER 50
#define NUM_TRIES 3

int main(void) {
    // Get the random number which the user has to guess.
    // We need to use the % operator so the number is within the range 0 to 
    // MAX_NUMBER. If we didn't use this operator, the number could be within
    // the range 0 to RAND_MAX which is at least 32767. 
    int rand = random() % (MAX_NUMBER + 1);
    
    // This isn't necessary but it adds urgency to the game.
    int tries = NUM_TRIES;
    
    // This code will make anything in the brackets run forever
    while (1) {
        printf("Guess the number between 0 and %d: ", MAX_NUMBER);
        int guess;
        fflush(stdout);
        scanf("%d", &guess);
        
        if (guess == rand) {
            printf("You guessed right! Game win.\\n");
            return 0;
        }
        
        // Code from here on in the while loop will only run IF the user's guess
        // was incorrect. This is because if the user's guess was correct, they
        // would've exited the program due to the return statement in line 33.
        tries--;
        
        // A possible extension is to have this print something different
        // if the correct number is higher or lower than their guess.
        printf("You guessed wrong! %d tries left.\\n", tries);
        
        if (tries == 0) {
            printf("No more tries left. Game over.\\n");
        }
    }
    
    return 0;
}`

tests["1"] = [];
tests["1"].push('5 5');