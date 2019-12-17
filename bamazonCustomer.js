const mysql = require("mysql");
const inquirer = require("inquirer");



const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,
    
    user: "root",

    password: "Slickvic!90",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayItems();
});


function displayItems() {
    connection.query("SELECT * FROM Products", function(err,res) {
        if (err) throw err;
        //console.log(res)

        console.log("---------------------------- Welcome to Bamazon!!--------------------------------");
        for( let i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].id + " |" + " Product: " + res[i].product_name + " |" + " Department: " + res[i].department_name + " |" + " Price: " + res[i].price + " |" + " Stock left: " + res[i].stock_quantity)
        }
        console.log("---------------------------------------------------------------------------------");
        inquirer.prompt([
            {
                type: "list",
                name: "fistQ",
                message: "Would you like to make a purchase?",
                choices: ["Yes","No"]
            }
        ]).then(function(answer) {
            console.log(answer)
            if (answer.fistQ === "Yes"){
            whatToBuy();
        } else if (answer.fistQ === "No"){

            console.log("Thank you, please come again!!");
            connection.end();
        }
    })
})
    
};


function whatToBuy() {
    inquirer.prompt([{
        name: "selectItem",
        message: "Please enter the ID of the product you would like to purchase",
        validate: function(value) {
            let valid = value.match(/^[1-10]+$/)
            if(valid){
                return true;
            }
                return "Please enter a valid product ID"
        }
    },{
        name: "Quantity",
        message: "How many would you like to buy of this item?",
        validate: function(value){
            let valid = value.match(/^[0-9]+$/)
            if(valid){
                return true;
            }
                return "Please enter numerical value"
        }
    }]).then(function(answer){
        
        connection.query("SELECT * FROM products WHERE id = ?", [answer.selectItem], function(err, res){
            if(answer.Quantity > res[0].stock_quantity){
                console.log("Insufficient amount");
                console.log("Please try again");
                displayItems();
            }
            else{
              totalCost = res[0].price * answer.Quantity;
              currentDepart = res[0].department_name;
              console.log("You owe $" + totalCost);
              console.log("Thank you for your purchase");

              connection.query("UPDATE products SET ? Where ?", [{
                  stock_quantity: res[0].stock_quantity - answer.Quantity
              },{
                  id: answer.selectItem
              }], function(err, res){});
              newOrder();
              
            }
        })
    })
}


    function newOrder(){
        inquirer.prompt([{
            type: "list",
            name: "secondOrder",
            message: "Would you like to make another purchase?",
            choices: ["Yes", "No"]
        }]).then(function(answer){
            if(answer.secondOrder === "Yes") {
                whatToBuy();
        }
        else if (answer.secondOrder === "No") {
            console.log("Thank you for shopping at Bamazon!!");
            connection.end();
        }
        })
    }