/**
 * Created by chaika on 02.02.16.
 */
var Storage = window.localStorage;
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

var global_quantity = 0;

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    var was_found = false;

    for (var i = 0; i < Cart.length; ++i) {
        if (Cart[i].pizza === pizza && Cart[i].size === size) {
            Cart[i].quantity += 1;
            was_found = true;
            break;
        }
    }

    if (!was_found) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1,
        });
        global_quantity+=1;
    }

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити одну піцу з кошика

    for (var i = 0; i < Cart.length; ++i) {
        if (Cart[i] === cart_item) {
            Cart.splice(i, 1);
            global_quantity-=1;
            break;
        }
    }

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його

    var saved_orders = JSON.parse(Storage.getItem("cart"));
    // var total_number = JSON.parse(Storage.getItem("number-of-pizzas"));

    if (saved_orders) {
        Cart = saved_orders;
    }

    $("#clean").click(function () {
        Cart = [];
        global_quantity = 0;
        updateCart();
    });

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміст кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    $("#number-of-pizzas").html(global_quantity);

    //TODO: first call?

    //Оновлення однієї піци
    function showPizzaInCart(cart_item) {

        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus").click(function () {
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function () {
            //Зменшуємо кількість замовлених піц
            cart_item.quantity -= 1;

            if (cart_item.quantity === 0) {
                removeFromCart(cart_item);
            }

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".cross").click(function () {
            //Видалити одну піцу з кошика
            removeFromCart(cart_item);
        
            //Оновлюємо відображення
            updateCart();
        });

        //TODO: ?

        $cart.append($node);
        $node.css("display", "none");
        $node.slideDown();
    }

    Cart.forEach(showPizzaInCart);

    // Saving current state of cart to localStorage
    Storage.setItem("cart", JSON.stringify(Cart));
    // Storage.setItem("number-of-pizzas", JSON.stringify(global_quantity));
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.global_quantity = global_quantity;
exports.PizzaSize = PizzaSize;