# LoginRegAppWithMySQL
Application to login and register user using MySQL database

This is a user login and registration app using Node.js, Express, MySQL and some other packages.

Version: 1.0.0

## Usage

$ npm install

$ npm start

## MySQL

Install mysql server

https://dev.mysql.com/doc/mysql-installer/en/

## Import Database
```
mysql -u root -p
mysql> create database tech;
mysql> use tecg;
mysql> source file.sql;
```

##  APIs
* [Login API](http://localhost:3000/apidoc/#api-User-Login_User)
* [Register API](http://localhost:3000/apidoc/#api-User-Register_User)