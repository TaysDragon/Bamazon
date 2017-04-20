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
	console.log("Hello :) You are connected as id: " + connection.threadId)
});

//display all of the items available for sale. Include the ids, names, and prices of products for sale.

connection.query("SELECT * FROM products", function(err, res) {
	// instantiate 
var table = new Table({
    head: ['ID', 'Product', 'Department','Price','Quantity available']
  , colWidths: [7, 10, 10, 10, 20],
  choicesArrary: [],
	for (var i = 0; i < res.length; i++) {
            table.push(res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
          }
          return choicesArray;
});
	
console.log(table.toString());

  // for (var i = 0; i < res.length; i++) {
  //   console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
  // }
  // console.log("-----------------------------------");
});



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
// 			var choicesArrary = [];
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
      ;


 




//how many would you liek to buy

//check if your store has enough of the product to meet the customer's request.

//If not, the app should log a phrase like Insufficient quantity!

//if your store does have enough of the product
//updating the SQL database to reflect the remaining quantity
//show the customer the total cost of their purchase