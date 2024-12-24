const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Sample employee data
var employees = [
    { id: 1, name: "Sruthy", designation: "Software Engineer", location: "New York", salary: 60000 },
    { id: 2, name: "Anju", designation: "Project Manager", location: "London", salary: 75000 },
    { id: 3, name: "Akash", designation: "HR", location: "Mumbai", salary: 60000 },
    { id: 4, name: "Anu", designation: "HR", location: "Mumbai", salary: 50000 },
    { id: 5, name: "Aiswarya", designation: "jr.developer", location: "Chennai", salary: 50000 },
    { id: 6, name: "Aparna", designation: "sr.developer", location: "Bangalore", salary: 80000 },
    { id: 7, name: "Anil", designation: "sr.developer", location: "Chennai", salary: 80000 }
];


function employeeRoutes(nav) {
    // Rendering Home Page (List of Employees)
    router.get('/', (req, res) => {
        res.render("home", {
            title: 'Employee Management',
            data: employees,
            nav
        });
    });

    // Rendering Add Employee Form
    router.get('/form', (req, res) => {
        res.render("form", {
            title: 'Add Employee',
            nav
        });
    });

    // POST method to add a new employee
    router.post('/add', (req, res) => {
        const { name, designation, location, salary } = req.body;
        const newEmployee = { 
            id: employees.length + 1, 
            name, 
            designation, 
            location, 
            salary 
        };
        employees.push(newEmployee);
        res.redirect('/basic'); 
    });

    // Rendering Edit Employee Form
    router.get('/edit/:id', (req, res) => {
        const { id } = req.params;
        const employee = employees.find(emp => emp.id == id);
        if (employee) {
            res.render("edit", {
                title: 'Edit Employee',
                employee,
                nav
            });
        } else {
            res.status(404).send("Employee not found");
        }
    });

   // PUT method to edit an existing employee
router.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, designation, location, salary } = req.body;

    let employee = employees.find(emp => emp.id == id);
    if (employee) {
        employee.name = name;
        employee.designation = designation;
        employee.location = location;
        employee.salary = salary;
        res.redirect('/basic'); 
    } else {
        res.status(404).send("Employee not found");
    }
});

    // DELETE method to delete an employee
    router.delete('/delete/:id', (req, res) => {
        const { id } = req.params;
        employees = employees.filter(emp => emp.id != id);
        res.redirect('/basic'); 
    });

    return router;
}

module.exports = employeeRoutes;
