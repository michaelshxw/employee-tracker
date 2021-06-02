const express = require('express');
const sequelize = require('./config/connection');
require('dotenv').config();
const inquirer = require('inquirer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
  app.listen(PORT, () => start());
}).catch(() => {
  console.log("Error: cannot connect to server.");
})

function start() {
  // welcome screen 
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "userSelection",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Create New Employee",
        "Create New Role",
        "Create New Department",
        "Update Employee Role"
      ]
    }
  ]).then(function whichFunctionToRun(value) {
    switch (value.userSelection) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      default:
        break;
    }
  })


  // View All Employees 

  function viewAllEmployees() {
    // function data here
  }
  // View All Roles
  function viewAllRoles() {

  };
  // View All Departments
  function viewAllDepartments() {

  };
  // Create New Employee
  function createNewEmployee() {

  };
  // Create New Role 
  function createNewRole(){

  };
  // Create New Department
  function createNewDepartment(){

  };
  // Update Employee Role
  function updateEmployeeRole(){

  };

};