import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function AllData() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8080/employee/list");
        console.log("API Response:", response.data); // Add this for debugging
        setEmployees(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching employees:", error.message);
        setError("Failed to fetch employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);

  const updateEmployee = (employeeid) => {
    navigate(`/update/${employeeid}`);
  }
  
  const handleDelete = async (employeeid) => {
    try {
      await axios.delete(`http://localhost:8080/employee/delete/${employeeid}`);
      setEmployees(prev => prev.filter(emp => emp.id !== employeeid));
    } catch (error) {
      console.error("Error deleting employee:", error.message);
      setError("Failed to delete employee. Please try again.");
    }
  }

  // Format salary safely
  const formatSalary = (salary) => {
    if (salary === null || salary === undefined) {
      return 'N/A';
    }
    
    // Convert to number if it's a string
    const numSalary = Number(salary);
    
    if (isNaN(numSalary)) {
      return 'Invalid';
    }
    
    return `$${numSalary.toLocaleString()}`;
  }

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading employees...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-3">
        {error}
      </Alert>
    );
  }

  return (
    <div className="p-3">
      <h2 className="mb-4">Employee List</h2>
      {employees.length === 0 ? (
        <Alert variant="info">
          No employees found. Add some employees to see them here.
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id || 'N/A'}</td>
                <td>{employee.name || 'N/A'}</td>
                <td>{employee.email || 'N/A'}</td>
                <td>{formatSalary(employee.salary)}</td>
                <td>{employee.department || 'N/A'}</td>
                <td>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="me-2" 
                    onClick={() => updateEmployee(employee.id)}
                  >
                    Update
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default AllData;