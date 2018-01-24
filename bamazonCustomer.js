var mysql = require ("mysql");
var inquirer = require("inquirer");

var newStockQuantity = 0;

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password: "",
	database: "bamazon_db"
});
//connect to mysql DB
connection.connect(function(err){
	if(err)throw err;
	console.log("Connected as id: " + connection.threadId);
	printList();
	begin();
});


//pull and print list of products from the DB
function printList(){
	connection.query("SELECT * FROM products", function (err, results){
	if(err)throw err;
		console.log("------------------ Products on Sale ---------------");
        for (var i = 0; i < results.length; i++) {
            console.log("Id: " +results[i].id + " ------- " + results[i].productName+ " ------ " + "$" + results[i].price);
        }
        console.log("---------------------------------------------------");
    });
}



function begin(){
	connection.query("SELECT * FROM products", function (err, results){
		if(err) throw err;
	inquirer.prompt([
	    {
	      name: "id",
	      type: "input",
	      message: "Choose id of the product that you would like to buy"
	    },{
	      name: "quantity",
	      type: "input",
	      message: "How many products of chosen id would you like?"
	}]).then(function(answer){
	    	for(var i =0 ; i<results.length; i++){
        		if(results[i].id == answer.id){
     
                	if(results[i].stockQuantity < answer.quantity){
                		console.log("-----------------------------------------------------------------");
		                console.log("Please choose a lower ammount of products. Insufficient quantity!");
		                console.log("-----------------------------------------------------------------");
		                begin();
		            }
		            else if(results[i].stockQuantity >= answer.quantity){
			            price(answer.quantity, results[i].price );
			           	purchase(results[i].stockQuantity, answer.quantity, answer.id);       
		            }    
        		}
	    	}
		});
	});
}

// price for the total ammount to be payed

function price(quantityToBuy, price){
	var total = quantityToBuy * price;
	console.log("----------------------------------------------------------");
	console.log("Your total ammount for this transaction is: " + "$" + total);
	console.log("----------------------------------------------------------");
}


// confirmation to buy the product(s) 

function purchase(stockQuantity, quantityToBuy, id){
	inquirer.prompt([{
	      name: "confirmation",
	      type: "rawlist",
	      message: "Do you want to make this purchase?",
	      choices: ["YES", "NO"]
    }]).then(function(answer){
	        if(answer.confirmation.toUpperCase() === "YES"){
	            quantityUpdate(stockQuantity, quantityToBuy, id);
	        } else {
	            begin();
	        }
    });
}

//update stock quantity in DB

function quantityUpdate(stockQuantity, quantityToBuy, id){

	//variable that contains new Stock quantity of the purchased item
    newStockQuantity = stockQuantity - quantityToBuy;

    //connects to mySQL DB and updates the stock quantity
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [{
        	stockQuantity: newStockQuantity
        },{
        	id: id
        }],
        function (err){
            if(err)throw err;
	        console.log("-----------------------------------");    
	        console.log("You just completed your transaction");
	        console.log("-----------------------------------");

	        // confirmation to continue buying or leave

	        inquirer.prompt([{
		      name: "confirmation",
		      type: "rawlist",
		      message: "Would you like to make another purchase?",
		      choices: ["YES", "NO"]
	    }]).
	        then(function(answer){
		        if(answer.confirmation.toUpperCase() === "YES"){
		            begin()
		        } else {
		        	console.log("--------------------------");
		            console.log("Hope to see you soon! Bye!")
		            console.log("--------------------------");


		            //ends the connection ...duh
	    			connection.end();
		        }
	    	});
	    });

    
}