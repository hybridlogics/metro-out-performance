//var pgp = require("pg-promise")( /*options*/ );
//var http = require("http");
var fs = require("fs");
var file = "test.db";
var exists = fs.existsSync(file);



var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);

module.exports = {

    metro_area_datadump: function (zipcode, city, population, estimate_2015) {
        db.serialize(function () {

            db.run("CREATE TABLE if not exists METRO_AREAS (zipcode TEXT , area TEXT , population INTEGER, estimate_2015 INTEGER)");

            var stmt = db.prepare("INSERT INTO METRO_AREAS(zipcode, area, population, estimate_2015) VALUES (?,?,?,?)");

            stmt.run(zipcode, city, population, estimate_2015)
            stmt.finalize();


        });


        //db.close();
    },
    //    cityzip_datadump: function (city, zip) {
    //        db.serialize(function () {
    //
    //            db.run("CREATE TABLE if not exists metrozip (city TEXT , zip TEXT )");
    //
    //            var stmt = db.prepare("INSERT INTO metrozip(city, zip) VALUES (?,?)");
    //
    //            stmt.run(city, zip)
    //            stmt.finalize();
    //
    //
    //        });
    //
    //
    //        //db.close();
    //    },


    orders_datadump: function (id, name, zip) {
        db.serialize(function () {
            //db.run("CREATE TABLE if not exists metro (zip TEXT PRIMARY KEY, name TEXT)");

            db.run("CREATE TABLE if not exists ORDERS(id INTEGER, name TEXT, zip TEXT, FOREIGN KEY(zip) REFERENCES METRO_AREAS(zipcode))");


            var stmt = db.prepare("INSERT INTO ORDERS(id ,name, zip) VALUES (?,?,?)");

            stmt.run(id, name, zip)
            stmt.finalize();


        });


    },
    showOrdersData: function () {
        db.all("SELECT id, name , zip FROM ORDERS", function (err, rows) {
            rows.forEach(function (row) {
                console.log(row.id, row.name, row.zip);
            })
        });
        //        console.log("abc")
    },
    showMetroData: function () {
        db.all("SELECT zipcode, area , population, estimate_2015 FROM METRO_AREAS", function (err, rows) {
            rows.forEach(function (row) {
                console.log(row.zipcode, row.area, row.population, row.estimate_2015);
            })
        });
        //        console.log("abc")
    }
}
