
//dependancies 
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var isNumber = require("is-natural-number");

// global order
var customerOrder = [];

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    startDisplayProducts();
  });
  // display all products for sale
  function startDisplayProducts() {
    connection.query("SELECT * FROM products", function (error, body) {
        if (error) throw error;

        table(body);
        purchaseItem(body);
        

        
    });
};

function table(results) {
    // constructor function for table-cli to create a table with all the products in the database
    var table = new Table({
        head: ['Item Id#', 'Product Name', 'Price'],
        });

    //loop through each item in the mysql bamazon database and push data into a new row in the table
    for (var i = 0; i < results.length; i++) {
        table.push(
            [(parseInt([i]) + 1), results[i].product_name, ((results[i].price).toFixed(2))]
        );
    };
    console.log(table.toString());
};

// ************************* PURCHASE ITEM BY ID*************************
function purchaseItem(data) {
    customerRequest = [];
    inquirer.prompt([
        {
            name: "purchase",
            type: "input",
            message: ("Please enter the ") + ("Item # ") + ("of the procuct you wish to purchase?"),
            validate: function (value) {
                if ((isNumber(parseInt(value)) === true) && (parseInt(value) <= data.length)) {
                    return true;
                } else {
                    return ("Please enter a valid item number.");
                };
            },
        },
    ]).then(function (answer) {
        var customerRequest = ((parseInt(answer.purchase)) - 1);
        if (data[customerRequest].stock_quantity === 0) {
            console.log(("Sorry, ") + (data[customerRequest].product_name) + (" is currently out of stock."));
            addToOrder(data);
        } else {
            confirmYourOrder(data, customerRequest);
        };
    });
};

// **************************** ASK TO CONFIRM ITEM # ****************************
function confirmYourOrder(confirmData, confirmRequest) {
    inquirer.prompt([
        {
            name: "orderConfirm",
            type: "confirm",
            message: ("You requested: ") + ("Item #: " + (confirmRequest + 1) +
                "\n                 Product Name: " + confirmData[confirmRequest].product_name +
                "\n                 Price: " + (confirmData[confirmRequest].price).toFixed(2)) +
                ("\nIs this the correct item?\n")
        },
    ]).then(function (answer) {
        if (answer.orderConfirm === true) {
            quantity(confirmData, confirmRequest);
        } else {
            order(confirmData);
        };
    });
};

//******************************* PROMPT PURCHASE QUANTITY *******************************
function quantity(quantityData, quantityRequest) {
    inquirer.prompt([
        {
            name: "howMany",
            type: "value",
            message: ("\nPlease enter the quantity you wish to purchase?"),
            default: 0,
            validate: function (value) {
                if (isNumber(parseInt(value)) === true) {
                    return true;
                } else {
                    return ("\nPlease enter a number.\n");
                };
            },
        },
    ]).then(function (answer) {
        if (answer.howMany <= quantityData[quantityRequest].stock_quantity) {
            var quantitySubtract = (quantityData[quantityRequest].stock_quantity - parseInt(answer.howMany))
            var orderItem = {
                itemIndex: quantityRequest,
                quantity: parseInt(answer.howMany),
                newQuantity: quantitySubtract
            };
            customerOrder.push(orderItem);
            console.log(("You ordered: ") + ("Item #: " + (quantityRequest + 1) +
                "\n             Product Name: " + quantityData[quantityRequest].product_name +
                "\n             Price per Item: " + ((quantityData[quantityRequest].price).toFixed(2)) +
                "\n             Total Price: " + ((quantityData[quantityRequest].price * parseInt(answer.howMany)).toFixed(2))));
            addToOrder(quantityData)
        } else {
            quantityNot(quantityData, quantityRequest);
        };
    });
};



// ************************* INSUFFICIENT QUANTITY FUNCTION *************************
function quantityNot(quantityNotData, quantityNotRequest) {
    inquirer.prompt([
        {
            name: "buySome",
            type: "confirm",
            message: ("\n Sorry, we currently have only ") + (quantityNotData[quantityNotRequest].stock_quantity +
                " Product Name: " + quantityNotData[quantityNotRequest].product_name) +
                (" in stock. \nWould you like to choose a different quantity?"),
            default: true
        }
    ]).then(function (answer) {
        if (answer.buySome === true) {
            quantity(quantityNotData, quantityNotRequest);
        } else {
            addToOrder(quantityNotData);
        };
    });
};

// ************************* ADD TO ORDER *************************
function addToOrder(addData) {
    inquirer.prompt([
        {
            name: "buyMore",
            type: "confirm",
            message: ("\nWould you like to order another item?"),
            default: true
        }
    ]).then(function (answer) {
        if (answer.buyMore === true) {
            table(addData);
            purchaseItem(addData);
        } else {
            console.log(("\nThank you for shoping at ") + ("BAMAZON."));
            updateDatabase();
            endConnection()
        } 
    });
};


// *********************** UPDATE DATABASE QUANTITY***********************
function updateDatabase(updateData) {

   
};
            
    endConnection();



function endConnection () {
    setTimeout( function(){
        connection.end();
      }, 3000 );       
};


        

    




        
