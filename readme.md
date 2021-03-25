
This a simple TicTacToe game created using Reactjs and Django with Postgresql as the database.

NOTE : Make sure you are using virtual environment before installing any pip packages/modules

Steps part 1:
1 - open your terminal and navigate to the app directory
2 - activate your virtual environment first
3 - install all the dependencies found in requirements.txt using the code "pip install -r requirements.txt"
4 - after installing, edit the database configuration ( DATABASES ) found in tictactoe/settings.py according to your database information ( NAME, USER, PASSWORD, HOST, PORT )
5 - now run the command "python manage.py makemigrations" to ready a sql script the will be run on database
6 - run the command "python manage.py migrate" to run the script created using the command on step 5
7 - run the command "python manage.py runserver" to run the django server

Steps part 2:
1 - open another terminal and navigate to the app directory and go to client_ui directory, make sure you are on the client_ui directory of the app
2 - install all the dependencies using "npm install", make sure you have nodejs installed in your system
3 - now run the command "npm run dev"

Steps part 3:
1 - Open you browser
2 - type the "http://localhost:8000/tictactoegame" on your browser url bar

DONE!!!
