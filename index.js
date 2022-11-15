const inquirer = require("inquirer");
const trackerRoute = require("./config/connection");
const mysql = require("mysql2");

trackerRoute.connect((err) => {
  if (err) throw err;
  console.log("Employee Management System Online!");
  beginPrompt();
});

const beginPrompt = () => {
  inquirer
    .prompt({
      type: "list",
      name: "begin",
      message: "What are you doing?",
      choices: [
        "Viewing Employees",
        "Viewing Departments",
        "Viewing Roles",
        "Adding a Department",
        "Adding a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Exit",
      ],
    })
    .then((answers) => {
      if (answers.begin === "Viewing Employees") {
        viewEmployees();
      }
      if (answers.begin === "Viewing Departments") {
        viewDept();
      }
      if (answers.begin === "Viewing Roles") {
        viewRoles();
      }
      if (answers.begin === "Adding a Department") {
        addDept();
      }
      if (answers.begin === "Adding a Role") {
        addRole();
      }
      if (answers.begin === "Add an Employee") {
        addEmployee();
      }
      if (answers.begin === "Update an Employee Role") {
        updateEmployee();
      }
      if (answers.begin === "Exit") {
        trackerRoute.exit();
      }
    });
};
//Functions for Inquirer answers
function viewEmployees() {
  const sql = "SELECT * FROM employees";
  trackerRoute.query(sql, function (err, res) {
    console.log(`Employee List: /n`);
    console.table(res);
    beginPrompt();
  });
}
function viewDept() {
  const sql = `SELECT *
                FROM department`;
  trackerRoute.query(sql, (err, response) => {
    if (err) throw err;
    else {
      console.log(`\nAll Departments:\n`);
      console.table(response);
    }
    beginPrompt();
  });
}
function viewRoles() {
  const sql = "SELECT * FROM role";
  trackerRoute.query(sql, function (err, res) {
    console.log(`Role List: /n`);
    console.table(res);
    beginPrompt();
  });
}
function addDept() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "Enter new department name.",
    })
    .then(function (answer) {
      const sql = "INSERT INTO department (name) VALUES ( ? )";
      trackerRoute.query(sql, answer.department, function (err, res) {
        console.log(`${answer.department} has been added.`);
      });
      beginPrompt();
    });
}
