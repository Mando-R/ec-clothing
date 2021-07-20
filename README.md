## EC-clothing with Multi-Payment Gateway

### Features

#### Customers / Visitors
1. Product listing
2. Single product detail
3. Categories
4. Pagination
5. Shopping carts＆Orders
6. Multiple Payment Gateway－Neweb Pay(藍新金流)

### Built With

#### Back-end
1.	[Node.js](https://nodejs.org/en/) / [Express](https://expressjs.com/) / [Express-handlebars](https://www.npmjs.com/package/express-handlebars) & handlebars-helpers
2.	MVC Framework
3.	RESTful API
4.	Third-party APIs
  - [Multiple Payment Gateway－Neweb Pay (藍新金流)](https://www.newebpay.com/website/Page/content/download_api)

#### Front-end
1. JavaScript (ES6+)
2. HTML 5 / CSS 3
3. Bootstrap / RWD / Font Awesome

### Package
1. [body-parser](https://www.npmjs.com/package/body-parser)
2. [method-override](https://www.npmjs.com/package/method-override)
3. [express](https://www.npmjs.com/package/express)
4. [express-handlebars](https://www.npmjs.com/package/express-handlebars)
5. [express-session](https://www.npmjs.com/package/express-session)
6. [connect-flash](https://www.npmjs.com/package/connect-flash)
7. [cookie-parser](https://www.npmjs.com/package/cookie-parser)
8. [moment](https://www.npmjs.com/package/moment)
9. [bcryptjs](https://www.npmjs.com/package/bcryptjs)
10. [passport](https://www.npmjs.com/package/passport)
11. [passport-local](https://www.npmjs.com/package/passport-local)
12. [passport-jwt](https://www.npmjs.com/package/passport-jwt)
13. [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
14. [dotenv](https://www.npmjs.com/package/dotenv)
15. [faker](https://www.npmjs.com/package/faker)
16. [mysql2](https://www.npmjs.com/package/mysql2)
17. [sequelize](https://www.npmjs.com/package/sequelize)
18. [sequelize-cli](https://www.npmjs.com/package/sequelize-cli)

### Deployment
+ Customer / Visitor - Test Account
  - email: aaa@aaa.aaa
  - password: aaa

  - email: root@example.com
  - password: 12345678

### Run MySQL server locally
#### Prerequisites
1. [npm](https://www.npmjs.com/)
2. [Node.js](https://nodejs.org/en/) 
3. [MySQL](https://www.mysql.com/) [(Sequelize)](https://sequelize.org/master/index.html)
4. [MySQL Workbench](https://www.mysql.com/products/workbench/)
5. Use [ngrok](https://ngrok.com/) to test multi-payment gateway.

#### Clone
Clone repository to local machine

    $ git clone https://github.com/Mando-R/ec-clothing.git

#### Database Setup－MySQL Workbench

    drop database if exists ec_clothing;
    create database ec_clothing;
    use ec_clothing;

#### App Setup
1.Enter the app project folder

    $ cd ec-clothing

2.Install packages via npm

    $ npm install

3.Create .env file

    $ touch .env

4.Sign up accounts for developer & Get secret keys
+ [Multiple Payment Gateway－Neweb Pay(藍新金流)](https://www.newebpay.com/website/Page/content/download_api)

+ Tech Blog:
  - [OAuth life cycle ＆ passport-FacebookStrategy](https://ryanx94.medium.com/oauth-life-cycle-passport-facebookstrategy-392b689e472c)
  - [Third-party API: Multiple Payment Gateway (Neweb Pay)](https://ryanx94.medium.com/third-party-api-multiple-payment-gateway-neweb-pay-89be25f4bab0)

5.Store Secret / API Keys in .env file

    SESSION_SECRET=
    
    IMGUR_CLIENT_ID=
    
    URL=
    MERCHANT_ID=
    HASH_KEY=
    HASH_IV=
    
    FACEBOOK_ID=
    FACEBOOK_SECRET=
    FACEBOOK_CALLBACK=
    
    JWT_SECRET=  

6.Edit password & database in config/config.json file
  
    "development": {
      "username": "root",
      "password": "password",
      "database": "ec_clothing",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }

7.Edit scripts in package.json file 

    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "node app.js",
      "dev": "nodemon app.js"
    }

8.Update and run Migration

    $ npx sequelize db:migrate

9.Add Seeders

    $ npx sequelize db:seed:all

10.Activate app

    $ npm run dev

11.Find the message below for successful activation

    App listening on port 3000!

12.Get API of Product listing, single product details, and orders.
+ For example, get product listing API by accessing URL: [http://localhost:3000/api/products](http://localhost:3000/api/products)

+ Use [POSTMAN](https://www.postman.com/downloads/) to test API.
+ POSTMAN: Sign in `JWT`－To get the `Token` and put it into the `Header's Authorization`.
  - Method: `POST`
  - URL: http://localhost:3000/api/signin
  - `Body` setup: Key－Value
    * email: aaa@aaa.aaa
    * password: aaa

+ POSTMAN: To get `API`.
  - Method: `GET`
  - URL: http://localhost:3000/api/products
  - `Header` setup: Key－Value
    * `Authorization`－Bearer＋Space＋`Token`

### Reference
+ [Shopline showcases](https://shopline.tw/showcase):
  - [CHIA YI SHI RI (賈以食日)](https://www.chiaselect.com/)
  - [HYDY bottle](https://shoptw.myhydy.com/)
  - [greenvines(綠藤生機)](https://www.greenvines.com.tw/), etc.
