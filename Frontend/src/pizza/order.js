function check() {
    var address = document.getElementById('inputAddress').value;
    console.log(address);
    //calculateAndDisplayRoute(directionsService,directionsDisplay, pizzeria, address);
}
$("#inputAddress").on('keypress',function(){
    //if(e === 13) {
        //alert('You pressed enter!');

        //alert('You pressed a "enter" key in somewhere');
        //event.preventDefault();
        check();
    //}
});