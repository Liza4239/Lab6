/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    res.send({
        success: true
    });
};


// function	initMap()	{
// //Тут починаємо працювати з картою
//     var mapProp =	{
//         center:	new	google.maps.LatLng(50.464379,30.519131),
//         zoom:	4
//     };
//     var html_element =	document.getElementById("map");
//     var map	=	new	google.maps.Map(html_element,	 mapProp);
// //Карта створена і показана
//
// }
//
// google.maps.event.addDomListener(window,'load',initMap);
// //Коли сторінка завантажилась
//