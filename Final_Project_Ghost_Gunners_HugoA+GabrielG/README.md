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




