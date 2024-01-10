#!/bin/bash

sudo apt-get update
sudo apt-get install mysql-server -y

sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root1ROOT';"

sudo service mysql restart

sudo apt install npm -y

cd server
npm install

sed -i 's/"password": ".*"/"password": "root1ROOT"/' db/config.json
sed -i "s/password: '.*'/password: 'root1ROOT'/" server/db/db.js

cd ..

cd client
npm install

