const isValidEmployee = (employee) => {
  return (
    typeof employee === "object" &&
    employee !== null &&
    "name" in employee &&
    typeof employee.name === "string" &&
    "age" in employee &&
    typeof employee.age === "number" &&
    "phone" in employee &&
    typeof employee.phone === "object" &&
    "personal" in employee.phone &&
    typeof employee.phone.personal === "string" &&
    "work" in employee.phone &&
    typeof employee.phone.work === "string" &&
    "ext" in employee.phone &&
    typeof employee.phone.ext === "string" &&
    "privileges" in employee &&
    typeof employee.privileges === "string" &&
    Array.isArray(employee.finished) &&
    Array.isArray(employee.badges) &&
    Array.isArray(employee.points)
  );
};

export const addEmployee = (employees, req, res) => {
  const newEmployee = req.body;
  // Check if the new employee has the correct format
  if (!isValidEmployee(newEmployee)) {
    return res.status(400).json({ code: "bad_request" });
  }
  // Add the new employee to the in-memory list
  employees.push(newEmployee);
  // Respond with the newly added employee
  res.status(201).json(newEmployee);
};