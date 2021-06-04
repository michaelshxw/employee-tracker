const express = require('express');
const mysql = require('mysql2')
require('dotenv').config();
const inquirer = require('inquirer');
const cTable = require('console.table');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(function (error) {
  if (error) {
    console.error("Cannot connect to server. Please try again");
    return;
  }
  let welcomeString = `   
  _____________________________________________________________
|                                                              |
|  #######                                                     |
|  #       #    # #####  #       ####  #   # ###### ######     |
|  #       ##  ## #    # #      #    #  # #  #      #          |
|  #####   # ## # #    # #      #    #   #   #####  #####      |
|  #       #    # #####  #      #    #   #   #      #          | 
|  #       #    # #      #      #    #   #   #      #          |
|  ####### #    # #      ######  ####    #   ###### ######     |
|                                                              |
|    #######                                                   |
|       #    #####    ##    ####  #    # ###### #####          |
|       #    #    #  #  #  #    # #   #  #      #    #         |
|       #    #    # #    # #      ####   #####  #    #         |
|       #    #####  ###### #      #  #   #      #####          |
|       #    #   #  #    # #    # #   #  #      #   #          |
|       #    #    # #    #  ####  #    # ###### #    #         |    
|______________________________________________________________| `;

  console.log(welcomeString);
  start();
});

function start() {
  // welcome screen 
  inquirer.prompt([
    {
      type: "rawlist",
      message: "What would you like to do?",
      name: "userSelection",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Create New Employee",
        "Create New Role",
        "Create New Department",
        "Update Employee Role",
        "Exit"
      ]
    }
  ]).then(function (response) {
    switch (response.userSelection) {
      case "View All Employees":
        viewAllEmployees();
        break;
      case "View All Roles":
        viewAllRoles();
        break;
      case "View All Departments":
        viewAllDepartments();
        break;
      case "Create New Employee":
        createNewEmployee();
        break;
      case "Create New Role":
        createNewRole();
        break;
      case "Create New Department":
        createNewDepartment();
        break;
      case "Update Employee Role":
        updateEmployeeRole();
        break;
      case "exit":
        connection.end();
        break;
      default:
        break;
    }
  })

  // View All Employees 
  function viewAllEmployees() {
    let query = "SELECT id, first_name, last_name, role_id FROM employee ";
    connection.query(query, (error, response) => {
      if (error) throw error;
      console.log("** List of All Employees **");
      console.table(response);
      start();
    });
  };

  // View All Roles
  function viewAllRoles() {
    let query = "SELECT title, department_id, salary FROM role";
    connection.query(query, (error, response) => {
      if (error) throw error;
      console.log("** List of All Roles **");
      console.table(response);
      start();
    });
  };

  // View All Departments
  function viewAllDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, (error, response) => {
      if (error) throw error;
      console.log("** List of All Departments **");
      console.table(response);
      start();
    });
  };

  // Create New Employee
  function createNewEmployee() {
    inquirer.prompt([
      {
        name: "firstname",
        type: "input",
        message: "Please enter employee's first name"
      },
      {
        name: "lastname",
        type: "input",
        message: "Please enter employee's last name"
      },
      {
        name: "roleID",
        type: "input",
        message: "Please enter employee's role ID"
      }
    ])
      .then(function (answer) {
        console.log("Creating new employee...");
        connection.query(
          `INSERT INTO employee SET ?`,
          {
            first_name: answer.firstname,
            last_name: answer.lastname,
            role_id: answer.roleID,
          },
          function (error, response) {
            if (error) throw error;
            console.log("Successfully created new employee");
            start();
          }
        )
      })
  };

  // Create New Role 
  function createNewRole() {
    inquirer.prompt([
      {
        name: "title",
        type: "input",
        message: "Please enter role title"
      },
      {
        name: "salary",
        type: "input",
        message: "Please enter role salary"
      },
      {
        name: "departmentID",
        type: "input",
        message: "Please enter department ID"
      }
    ])
      .then(function (answer) {
        console.log("Creating new role...");
        connection.query(
          `INSERT INTO role SET ?`,
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentID
          },
          function (error, response) {
            if (error) throw error;
            console.log("Successfully created new role");
            start();
          }
        )
      })
  };

  // Create New Department
  function createNewDepartment() {
    inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "Please enter department name"
      }
    ])
      .then(function (answer) {
        console.log("Creating new department...");
        connection.query(
          `INSERT INTO department SET ?`,
          {
            name: answer.name
          },
          function (error, response) {
            if (error) throw error;
            console.log("Successfully created new department");
            start();
          }
        )
      })
  };

  // Update Employee Role
  function updateEmployeeRole() {
    console.log('updateEmployeeRole');
    start();
  };

};