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

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
});

//display all of the items available for sale. Include the ids, names, and prices of products for sale.

var start = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

    });
    // ask them the ID of the product they would like to buy.
    inquirer.prompt([{
            name: "choice",
            type: "rawlist",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
                }
                return choiceArray;
            },
            message: "What would you like to buy?"
        },
        // ask how many units of the product they would like to buy.
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        }
    ]).then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
            if (results[i].item_id === answer.choice) {
                chosenItem = results[i];
                price = parseInt(results[3]);
            }
        }

        // determine if quantity is available
        if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
            // if enough in stock, update db, let the user know, and start over
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: parseInt(stock_quantity - answer.quantity)
            }, {
                item_id: chosenItem.item_id
            }], function(error) {
                if (error) throw err;
                console.log("There is enough in stock to fulfill your order request! Your order total is $" + parseInt(answer.quantity*price));
                start();
            });
        } else {
            // there is not enough in stock, apologize and start over
            console.log("We apologize for the inconvinience, but there is not enough in current stock to fulfill your order request. Try again...");
            start();
        }
    });
};


// run the start function when the file is loaded to prompt the user
start();
