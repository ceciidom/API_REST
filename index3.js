// Construir una API REST: 
//  1. Importar express y body parser
import express from "express";
import employees from "./employees.js";
import  {addEmployee} from "./functions.js"


//  2. Conetar al puerto
const app = express();
const port = 8000;

app.use(express.json());

//Generar Routes:

app.get("/api/employees", (req, res) => {
  const page = parseInt(req.query.page);
  const user = req.query.user;
  const badges = req.query.badges;
  let filteredEmployees;
 
  if (page === 1) {
    // 2. GET /api/employees?page=1 : Devolverá los primeros 2 empleados. Del elemento 0 al elemento 1 del listado
    filteredEmployees = employees.slice(0,2)
  } else if (page === 2) {
    // 3. GET /api/employees?page=2 : Devolverá del elemento 2 al elemento 3 del listado
    filteredEmployees = employees.slice(2, 4);
  } else if (page > 2) {
    // 4. GET /api/employees?page=N : Devolverá del elemento (2 * (N - 1)) al (2 * (N - 1)) + 1.
    const N = page
    const inicio = (2 * (N - 1));
    const final = (2 * (N -1)) + 1; 
    filteredEmployees = employees.slice(inicio, final)
  } else if(user) {
    // /api/employees?user=true : Devolverá listado de employees con privileges == "user"
    filteredEmployees = employees.filter( employee => employee.privileges === "user")
  } else if (badges){
    // 7. /api/employees?badges=black : Devolverá listado de employees que incluya "black" en el atributo "badges"
    const findEmployeeWithBlackBadges = employees => {
        return employees.filter(employee => employee.badges && employee.badges.includes("black"))}
    const employeesWithBlackBadges = findEmployeeWithBlackBadges(employees);
    res.send (employeesWithBlackBadges)
  } else {
    // 1. GET route /api/employees : Devuelve un listado de todos los empleados
   filteredEmployees = employees;
  }

  res.send(filteredEmployees)
  
});

app.get("/api/employees/oldest", (req, res) => {
  // 5. /api/employees/oldest : Devolverá el objeto individual correspondiente al empleado con más edad. En caso de existir más de uno, se devolverá la primera ocurrencia
 const findOldestEmployee = ((employees) => {
    if (employees.length === 0) {return null};
    return employees.reduce((oldest, current) => {
        return (current.age > oldest.age) ? current : oldest;
    });
 });

 const oldestEmployee = findOldestEmployee(employees);
 
 res.send(oldestEmployee)

})

app.get("/api/employees/:name", (req, res) => {
  const name = req.params.name;

  // Buscar el empleado por su nombre
  const employee = employees.find((emp) => emp.name === name);

  // Verificar si se encontró el empleado
  if (employee) {
    res.json(employee); // Devolver el objeto del empleado
  } else {
    res.status(404).json({ code: "not_found" }); // Devolver un status 404 con el contenido not_found
  }
});


app.post("/api/employees", (req, res) => {
    addEmployee (employees, req, res)
} );


//PORT
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
} )


