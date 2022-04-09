# Ultimate COMP1511 Guide

I had been interested in experimenting with WebAssembly for some time so I decided to take this oppurtunity to create a proof of concept for a fully self-contained COMP1511 website that can be run offline as a PWA with full C compilation support. We normally write our C code and compile it using dcc or gcc into machine code that our computer can run.

The web browser cannot run this compiled machine code so a different approach needs to be taken. The underlying tool used by dcc and gcc is the clang compiler which itself is written in C++. There exists a port of clang which has been compiled from C++ to WebAssembly which allows the tool to be run in the browser. This allows us to write, compile, and run C code entirely within our browser without the need for any external servers or programs.

I decided to create a simple website which implements this approach by the week 2 problem sets questions and answers. The website contains the description for each problem along with any hints, examples, and assumptions in expandable modals. There is a dedicated code-editor for each pre-loaded with the neccessaty boilerplate code which you can edit and run. I have also added the ability to import the sample solution along with being able to save the code as a C file to your device and import any file.

I originally had grander ambitions for the site but unfortunately some features had to be scaled back, I originally investigated running cs1511 style in the browser but as the style script is written in Python with certain clang tools as a dependency I could not create a functional WebAssembly version. I made more significant process in using the Artistic Style code formatter which had already been ported to WebAssembly however it was designed as a server side packagae so I have been working with the developer to create a client side version.

I also planned to integrate the tests into the browser as this is a supported feature of the Runno wrapper which I'm using for code compilation and running however a bug exists in the program for testing C code so I have been in touch with the developer to find a fix. The site is a Progressive Web Application and can be installed as an app on a phone or PC which allows it to download and locally store all the required files to compile and run the C code which allows the page to work while offline.

The page could easily be expanded to include more content and examples if anybody is interested.
