var mysql = require ("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon_db"
})

connection.connect(function(err){
	if (err) { 
		console.log ("Error: "+ err);
	}
	console.log("Connected as id: " + connection.threadId);
	printList();
})

function printList(){
	connection.query("SELECT * FROM products", function (err, results){
	if(err)throw err;
		console.log("------------------ Products on Sale ---------------");
        for (var i = 0; i < results.length; i++) {
            console.log("Id: " +results[i].id + " ------- " + results[i].productName+ " ------ "
                + "$" + results[i].price);
        }
        console.log("---------------------------------------------------");
    });
}

