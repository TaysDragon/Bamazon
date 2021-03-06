// npm installer packs
// npm install cli-table
var Table = require('cli-table');
//npm install inquirer
var inquirer = require('inquirer');
//npm install mysql
var mysql = require("mysql")

// connection to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3307,

    // your username, password, database
    user: "root",
    password: "root",
    database: "Bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("Hello :) You are connected as id: " + connection.threadId);
    // console.log("-----------------------------------");
});

//display all of the items available for sale. Include the ids, names, and prices of products for sale.

// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
var start = function() {
    connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer.prompt([{
        name: "buy",
        type: "rawlist",
        message: "What product would you like to buy?",
        choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].item_id + " | " + results[i].product_name + " | " + "$"+ results[i].price + " | " + results[i].stock_quantity);
            }
            return choiceArray;
            }
    }, {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?",
                validate: function(value) {if (isNaN(value) === false) {
            return true;}
            return false;
        }
    }]).then(function(answer) {
        // get the information of the chosen item
        connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
            if (results[0].item_id === answer.buy) {
                chosenItem = results[i];
            }
            return chosenItem;
        }
        var howMany = parseInt(answer.quantity);
    // determine if quantity is available
        var availability = function() {
        connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) { 
            if (results[i].stock_quantity >= howMany) {
                // there is enough, update db, let the user know, and start over
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: parseInt(stock_quantity - answer.quantity)
                }], function(error) {
                    if (error) throw err;
                    console.log("There is enough in stock to fulfill your order request!");
                    buyMore();
                        
                });
            } else {
                // there is not enough in stock, apologize and start over
                console.log("We apologize for the inconvinience, but there is not enough in current stock to fulfill your order request.");
                start();
            }
        };
    });
    };    

availability();
});
});
});
}; 


//Show products available for purchase
var viewAll = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("\n-----------------------------------");
        console.log("ID | Product | Price");
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | " + "$" + results[i].price);
        }
        console.log("-----------------------------------");
    });
};


        


var buyMore = function() {
inquirer.prompt({
    name: "moreOrPay",
    type: "rawlist",
    message: "Would you like to [BUY] another item or [PAY] for your items?",
    choices: ["BUY", "PAY"]
}).then(function(answer) {
    // based on their answer, either call the buy or the pay functions
    if (answer.moreOrPay.toUpperCase() === "PAY") {
        cost();
    } else {
        start();
    }
});
};



var cost = function(dollar) {
    // parseInt(answer.quantity * results[i].)
    console.log("cost function goes here");
};




start();

// 
// // table is an Array, so you can `push`, `unshift`, `splice` and friends 
// table.push(
//     [(results[i].item_name), 'Second value']
//   , ['First value', 'Second value']
// );


// }					
// }


// start1 here
// var showProducts = function (){
// 	connection.query("SELECT * FROM products", function(err, results){
// 		if (err) throw err;
// 		inquirer.prompt([{
// 			name: "choices",
// 			type: "rawlist",
// 			choices: function(){
// 			var choiceArray = [];
// 			for (var i = 0; i < results.length; i++) {
//             choiceArray.push(results[i].product_name);
//           }
//           return choiceArray;
//           console.log(choiceArray);
//         },
//         //enter product id of item you want to buy
//         message: "What product would you like to buy?"
//       },

//       ]).then(function(answer) {
//       // get the information of the chosen item
//       var chosenItem;
//       for (var i = 0; i < results.length; i++) {
//         if (results[i].product_name === answer.choices) {
//           chosenItem = results[i];
//         }
//       }	
//     });
//   });
// };
// end1 here











// }])
// }) 








//how many would you liek to buy

//check if your store has enough of the product to meet the customer's request.

//If not, the app should log a phrase like Insufficient quantity!

//if your store does have enough of the product
//updating the SQL database to reflect the remaining quantity
//show the customer the total cost of their purchase
