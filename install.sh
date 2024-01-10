#!/bin/bash

sudo apt update -y
sudo apt upgrade -y
sudo apt-get install mysql-server -y

sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root1ROOT';"

sudo service mysql restart

sudo apt install npm -y

cd server
npm install

cd ..

cd client
npm install

