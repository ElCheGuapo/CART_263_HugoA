Ghost Gunners: README AND TECHNICAL ANALYSIS:

My program utilizes SOCKET.IO communication to allow users connected to the same LAN to connect together.

The connection is established when the users connect host computer's local host directly:
i.e: Hugos-MacBook-Air.local:3000

The p5 sketch is run through a node server that users connect to, this is also what allows live comunication between both parties.

Gameplay goes as follows:
- Both players connect and will fight in order to get a higher score
- The gameplay loop is inspired from clicker games. Player will accumulate score by killing enemies, in order to be in first place. The player can use their score points more amo. However the flip side to this is, enemies scale based on the amount of kills the player has.

Technical:
- Every function in the code is commented with it's function, however the general flow of code goes as follows:
    - The script checks wether gameOver is true or false. While it's true, the gameplay script will execute, if false, the game over screen will be displayed.
    - You can play single player however the competition factor is only found in the multiplayer aspect of the game.
        - The timer will only start when both players are connected.
    - Enemy health scales based on how many kills you get, and their speed scales based on your score.
        - This means you can make the game easier by constantly exchanging score for amo, however you need a higher score in order to win.
    - In the setup function you will notice how the project is meant to work using only my mac as a connection point. 

===============================================================================
In order to run this on your personal pc you must follow these steps:
===============================================================================

FIRST:
    INSTALL NODE JS ON YOUR MACHINE
        - you can check wether node is correctly installed on your machine by simply running the following command in your terminal:
            - node -v

SECONDLY:
    NAVIGATE TO THE LOCATION ON YOUR MACHINE WHERE THE FOLDER IS INSTALLED AND RUN THE FOLLOWING COMMAND:
        - npm install
    THIS WILL INSTALL ALL NECESSARY DEPENDENCIES

THIRD:
    YOU MUST INPUT YOUR PERSONAL ACCESS ADDRESS IN THE SETUP FUNCTION OF THE SCRIPT (The location where this input is necessary is made obvious in the setup function).
    
        - To find your personal access address you must:
            - MAC => Go System Preferences / Sharing AND IT WILL BE SHOWN AT THE TOP OF YOUR WINDOW UNDER "COMPUTER NAME".

            - WINDOWS => Just use your IPV4 address as an end point. This works also for mac but the prior is easier.
                - Open command prompt and input the following command:
                    - ipconfig /all

FOURTH:
    FROM YOUR TERMINAL, cd INTO THE PROJECT FOLDER.
        - i.e: (if the project folder is on your deskopt) cd Desktop/Final_Project_Ghost_Gunners_HugoA+GabrielG
    
    THEN RUN THE FOLLOWING COMMAND:
        - node server.js

FITH:
    OPEN YOUR BROWSER AND TYPE:
        - your_local_address:3000

    PLAYER TOO WILL ALSO INPUT THIS SAME ADDRESS

And there you go you are playing the game!

