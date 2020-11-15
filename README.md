# Egg Scrumble Website
 A college project for our subject IT Professional Elective 1 

Front end:
EJS
CSS

Back end:
Mongodb & Mongoose
Express.js
Node.js

Required packages:
1) bcrypt
2) cookie-parser
3) ejs
4) express
5) jsonwebtoken
6) mongoose
7) validator
8) nodemon (for global *optional)

To install packages, run following commands on same directory with project file:
1) npm init
2) npm install (will install all packages listed on package.json which is packages #1-7)
3) npm install nodemon -g (req. package #8)

To run in localhost:
1) nodemon app
2) then type localhost:3000 at browser
// Please change code at line 19:
   app.listen(process.env.PORT)) to app.listen(3000))

To run in web:
1) Create acc on heroku 
(heroku.com) - Heroku is a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.
2) Install also heroku cli at their site
3) Open project folder at vs code and go to terminal of prj file
4) run: npm install heroku -g
   heroku login (input credentials or will proceed to confirmation page to login)
   heroku create
   git push heroku main
   heroku open 
P.S: please message me if you want to manage it for i can add u as a collabolator on heroku.
// Please change code at line 19:
   app.listen(3000)) to app.listen(process.env.PORT))
     
