
import { useState, useEffect } from "react";
import Auth from "./Auth";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
      !!localStorage.getItem("token")
  );

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    salary: ""
  });

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setEmployees([]);
  };

  // Load employees
  const fetchEmployees = () => {
    fetch("http://localhost:8080/api/employees", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to fetch employees");
          }
          return response.json();
        })
        .then(data => {
          setEmployees(data);
        })
        .catch(error => {
          console.error("Error:", error);
        });
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchEmployees();
    }
  }, [isLoggedIn]);

  // Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add or Update Employee
  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      ...formData,
      salary: Number(formData.salary)
    };

    const url = editId
        ? `http://localhost:8080/api/employees/${editId}`
        : "http://localhost:8080/api/employees";

    const method = editId ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(employeeData)
    })
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to save employee");
          }
          return response.json();
        })
        .then(() => {
          alert(
              editId
                  ? "Employee updated successfully!"
                  : "Employee added successfully!"
          );

          setFormData({
            name: "",
            email: "",
            department: "",
            salary: ""
          });

          setEditId(null);
          setShowForm(false);
          fetchEmployees();
        })
        .catch(error => {
          console.error("Error:", error);
          alert("Unable to save employee.");
        });
  };

  // Edit Employee
  const handleEdit = (employee) => {
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: employee.salary
    });

    setEditId(employee.id);
    setShowForm(true);
  };

  // Delete Employee
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    fetch(`http://localhost:8080/api/employees/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    })
        .then(response => {
          if (!response.ok) {
            throw new Error("Failed to delete employee");
          }

          alert("Employee deleted successfully!");
          fetchEmployees();
        })
        .catch(error => {
          console.error("Error:", error);
          alert("Unable to delete employee.");
        });
  };

  // Search Employees
  const filteredEmployees = employees.filter(employee =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.email.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase())
  );

  // Login Screen
  if (!isLoggedIn) {
    return (
        <Auth
            onLogin={() => setIsLoggedIn(true)}
        />
    );
  }

  // Dashboard
  return (
      <div className="dashboard">

        <aside className="sidebar">
          <h2>EmployeeHub</h2>

          <ul>
            <li>Dashboard</li>
            <li>Employees</li>
          </ul>

          <button onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main className="main-content">

          <header className="dashboard-header">
            <div>
              <h1>Employee Dashboard</h1>
              <p>Manage your employees efficiently</p>
            </div>

            <button
                onClick={() => {
                  setFormData({
                    name: "",
                    email: "",
                    department: "",
                    salary: ""
                  });
                  setEditId(null);
                  setShowForm(true);
                }}
            >
              + Add Employee
            </button>
          </header>

          <div className="stats-container">

            <div className="stat-card">
              <h3>Total Employees</h3>
              <h2>{employees.length}</h2>
            </div>

            <div className="stat-card">
              <h3>Departments</h3>
              <h2>
                {
                  new Set(
                      employees.map(employee =>
                          employee.department
                      )
                  ).size
                }
              </h2>
            </div>

          </div>

          {/* Search */}
          <div className="search-container">
            <input
                type="text"
                placeholder="Search employees..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Employee Form */}
          {showForm && (
              <div className="form-container">

                <h2>
                  {editId
                      ? "Update Employee"
                      : "Add New Employee"}
                </h2>

                <form onSubmit={handleSubmit}>

                  <input
                      type="text"
                      name="name"
                      placeholder="Employee Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                  />

                  <input
                      type="email"
                      name="email"
                      placeholder="Employee Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                  />

                  <input
                      type="text"
                      name="department"
                      placeholder="Department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                  />

                  <input
                      type="number"
                      name="salary"
                      placeholder="Salary"
                      value={formData.salary}
                      onChange={handleChange}
                      required
                  />

                  <button type="submit">
                    {editId ? "Update Employee" : "Save Employee"}
                  </button>

                  <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setEditId(null);
                      }}
                  >
                    Cancel
                  </button>

                </form>

              </div>
          )}

          {/* Employee Table */}
          <div className="table-container">

            <h2>Employee List</h2>

            <table>
              <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
              </thead>

              <tbody>
              {filteredEmployees.length > 0 ? (
                  filteredEmployees.map(employee => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.department}</td>
                        <td>{employee.salary}</td>

                        <td>
                          <button
                              onClick={() =>
                                  handleEdit(employee)
                              }
                          >
                            Edit
                          </button>

                          <button
                              onClick={() =>
                                  handleDelete(employee.id)
                              }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan="6">
                      No employees found
                    </td>
                  </tr>
              )}
              </tbody>
            </table>

          </div>

        </main>

      </div>
  );
}

export default App;
