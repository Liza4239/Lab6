/**
 * Created by chaika on 09.02.16.
 */
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
//var multer  = require('multer');
//var upload = multer();

function configureEndpoints(app) {
    var pages = require('./pages');
    var api = require('./api');

    //Налаштування URL за якими буде відповідати сервер
    //Отримання списку піц
    app.get('/api/get-pizza-list/', api.getPizzaList);
    app.post('/api/create-order/', api.createOrder);

    //Сторінки
    //Головна сторінка
    app.get('/', pages.mainPage);

    //Сторінка замовлення
    app.get('/order.html', pages.orderPage);

    //Якщо не підійшов жоден url, тоді повертаємо файли з папки www
    app.use(express.static(path.join(__dirname, '../Frontend/www')));
}

function startServer(port) {
    //Створюється застосунок
    var app = express();

    //Налаштування директорії з шаблонами
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //Налаштування виводу в консоль списку запитів до сервера
    app.use(morgan('dev'));

    //Розбір POST запитів
     //get info from form
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    //app.post("order.html", urlencodedParser,function(req,res){
        //console.log(req.body)
//res.render("order.html");

    //});
    app.post('order.html', urlencodedParser, function (req, res) {
        // Prepare output in JSON format
        res = {
          email:req.body.email,
           password:req.body.password
       };
        console.log(res);
        res.end(JSON.stringify(res));
    })

    //Налаштовуємо сторінки
    configureEndpoints(app);

    //Запуск додатка за вказаним портом
    app.listen(port, function () {
        console.log('My Application Running on http://localhost:'+port+'/');
    });
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post("order.html", urlencodedParser,function(req,res){
   if(!req.body) return res.sendStatus(400);
   console.log(req.body);
    res.render("order.html");
    res.end(JSON.stringify(req.body));
});


exports.startServer = startServer;