/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

var PizzaProperties = {
    Meat: "meat",
    Pineapples: "pineapple",
    Mushrooms: "mushroom",
    SeaFood: "ocean"
};

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {

        var html_code = Templates.PizzaMenu_OneItem({ pizza: pizza });

        var $node = $(html_code);

        $node.find("#buy-big").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });

        $node.find("#buy-small").click(function () {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        // $node.slideDown();
        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

//filter should consist of strings: "meat" "pineapple" etc.
function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    if (filter) {
        var pizza_shown = [];

        Pizza_List.forEach(function (pizza) {
            //Якщо піца відповідає фільтру

            if (pizza.content.hasOwnProperty(filter) && pizza.content[filter]) {
                pizza_shown.push(pizza);
            }
        });

        //Показати відфільтровані піци
        showPizzaList(pizza_shown);
    }
    else {
        showPizzaList(Pizza_List);
    }
}

function initialiseMenu() {
    //Показуємо усі піци
    showPizzaList(Pizza_List);

    // $("#filter-all").active = isTrue(true);

    $("#filter-all").click(function () {
        filterPizza();
    });
    $("#filter-meat").click(function () {
        filterPizza(PizzaProperties.Meat);
    });
    $("#filter-pineapples").click(function () {
        filterPizza(PizzaProperties.Pineapples);
    });
    $("#filter-mushrooms").click(function () {
        filterPizza(PizzaProperties.Mushrooms);
    });
    $("#filter-seafood").click(function () {
        filterPizza(PizzaProperties.SeaFood);
    });
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;