var express = require('express');

var db = require('./db');

var eoc = express();
var cityArray = []
var metroArray = []

eoc.get('/', function (req, res) {

})

function next_record(call) {

    parse_record(api_data, call);
}

function parse_record(event, call) {
    var temp = {};


    if (call == 'orders') {
        var fullzip = event.zip + '';
        var zipcode = fullzip.split('-');
        var singlezip = zipcode[0]
        db.orders_datadump(event.id, event.name, singlezip)
            // console.log(event.id, event.name, singlezip)
        pointer++;

        if (pointer < api_data_length) {
            next_record('orders');
        } else {

        }

    } else if (call == 'census') {

        var cityName = event.Area + ''
        var city = cityName.split('-');
        var metroCity = city[0]
        var mc = metroCity.split(',')
            // console.log(mc[0], event.Census_2010)
        db.metro_area_datadump(event.zipCode, mc[0], event.Census_2010, event.Estimate_2015)

        pointer++;
        if (pointer < api_data_length) {
            next_record('census');
        } else {

        }
    }

}


eoc.get('/metro_areas', function (req, res, next) {
    api_data = ''
    console.log("called");
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    converter.on("record_parsed", function (jsonArray) {

        api_data = jsonArray;
        api_data_length = api_data.length;
        //console.log(api_data_length);
        pointer = 0;
        next_record('census');


    });

    require("fs").createReadStream("../files/census_new3.csv").pipe(converter);



});


eoc.get('/orders', function (req, res, next) {
    api_data = ''
    console.log("called");
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
    converter.on("record_parsed", function (jsonArray) {

        api_data = jsonArray;
        api_data_length = api_data.length;
        //console.log(api_data_length);
        pointer = 0;
        next_record('orders');


    });

    require("fs").createReadStream("../files/orders.csv").pipe(converter);



});



eoc.get('/showOrders', function (req, res) {

    db.showOrdersData()

});

eoc.get('/showMetro', function (req, res) {

    db.showMetroData()

});






eoc.listen(3007, function () {
    console.log('Example app listening on port 3007!');
});
