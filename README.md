# RouterUI
This repo is containg intractions with laravel API using Ajax (axio api).It is having all required features such as token based auth , crud UI etc. You may find releavent code in src folder.
UI is created in ReactJs ,that is intracting with my local Laravel end point
Steps for up and running
1- clone
2- npm install
3- run command REACT_APP_SERVER_URL=http://www.shop.test/api npm start where REACT_APP_SERVER_URL is your api endpoint that we setup while installing API

Note:- In login page I have hardcoded email and password , if you we run migration:seed at laravel side, that user will be created by default