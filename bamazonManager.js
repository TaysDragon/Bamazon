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

// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
var start = function() {
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "Would you like to:\n[VIEW] Products for Sale\nView [LOW] Inventory\n[ADD] to Inventory\nAdd [NEW] Product?",
        choices: ["VIEW", "LOW", "ADD", "NEW"]
    }).then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.action.toUpperCase() === "VIEW") {
            viewAll();
        } else if (answer.action.toUpperCase() === "LOW") {
            viewLow();
        } else if (answer.action.toUpperCase() === "ADD") {
            addInventory();
        } else if (answer.action.toUpperCase() === "NEW") {
            addNewProduct();
        }
    });
};

// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
var viewAll = function() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("-----------------------------------");
        for (var i = 0; i < results.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
    start();
};


// If a manager selects View Low Inventory, then it should list all items with a inventory count lower than five.
var viewLow = function() {
    var query = connection.query("SELECT * FROM products GROUP BY stock_quantity HAVING count(*) < 5");
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
        }
        start();
    });
};


// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
var addInventory = function() {
    connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    	inquirer.prompt([{
    	name: "addTo",
        type: "rawlist",
        message: "What product would you like to add inventory to?",
        	choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].item_id + " | " + results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
            }
            return choiceArray;
            }
        },
        {
        name: "addQuantity",
        type: "input",
        message: "How many would you like to add?",
        validate: function(value) {if (isNaN(value) === false) {return true;}return false;}
        
    }]).then(function(answer) {
    // get the information of the chosen item
    var chosenItem;
    	for (var i = 0; i < results.length; i++) {
    	if (results[i].item_id === answer.addTo) {
        connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: parseInt(stock_quantity + answer.addQuantity)
        }], function(err, res) {});
    	}
    }
    });
});
    start();
};
     



// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
var addNewProduct = function() {
// prompt for info about the item being added
    inquirer.prompt([{
    name: "product",
    type: "input",
    message: "What is the product you would like to add?"
    }, {
    name: "department",
    type: "input",
    message: "What department would you like to add your product into?"
    }, {  
    name: "price",
    type: "input",
    message: "What is the price for this item?",
        validate: function(value) {if (isNaN(value) === false) {
            return true;}
            return false;
        }
    },
    {name: "quantity",
    type: "input",
    message: "What is stock quantity?",
    validate: function(value) {if (isNaN(value) === false) {return true;}return false;}

    }]).then(function(answer) {
// when finished prompting, insert a new item into the db with that info
connection.query("INSERT INTO products SET ?", {
    product_name: answer.product,
    department_name: answer.department,
    price: answer.price,
    stock_quantity: answer.quantity}, function(err) {if (err) throw err;
    console.log("Your product was added successfully!");
    start();
    });
    }); 
};

start();