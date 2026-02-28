import React, { useEffect } from 'react'
import { useState } from 'react'
import { Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        password: "",
        name: "",
        salary: "",
        email: "",
        department: ""
    });
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }
    
    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                setLoading(true);
                console.log("Fetching employee with ID:", id); // Debug log
                
                // FIXED: Make sure you're using backticks (`) and ${id} not {id}
                // Check your actual backend endpoint:
                // Option 1: If your endpoint is /employee/users/{id}
                const response = await axios.get(`http://localhost:8080/employee/users/${id}`);
                
                // Option 2: If your endpoint is /employee/{id}
                // const response = await axios.get(`http://localhost:8080/employee/${id}`);
                
                // Option 3: If your endpoint is /employee/get/{id}
                // const response = await axios.get(`http://localhost:8080/employee/get/${id}`);
                
                console.log("API Response:", response.data); // Debug log
                setFormData(response.data);
                setError(null);
            } catch (error) {
                console.error("Error fetching employee data:", error);
                setError(`Failed to fetch employee data: ${error.message}. Please check if the employee exists.`);
            } finally {
                setLoading(false);
            }
        }
        
        if (id) {
            fetchEmployeeData();
        } else {
            setError("No employee ID provided");
            setLoading(false);
        }
    }, [id]);
    
    const formSubmission = async (event) => {
        event.preventDefault();
        
        try {
            setLoading(true);
            
            // Check which update endpoint your backend uses
            // Option 1:
            const response = await axios.put(`http://localhost:8080/employee/list/${id}`, formData);
            
            // Option 2:
            // const response = await axios.put(`http://localhost:8080/employee/${id}`, formData);
            
            // Option 3:
            // const response = await axios.put(`http://localhost:8080/employee/update/${id}`, formData);
            
            console.log("Employee updated successfully:", response.data);
            
            // Navigate to employee list
            navigate('/alldata');
            
        } catch (error) {
            console.error("Error updating employee:", error);
            setError(`Failed to update employee: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }
    
    if (loading) {
        return (
            <div className="text-center p-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Loading employee data...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <Alert variant="danger" className="m-3">
                <Alert.Heading>Error</Alert.Heading>
                <p>{error}</p>
                <Button variant="primary" onClick={() => navigate('/alldata')}>
                    Back to Employee List
                </Button>
            </Alert>
        );
    }
    
    return (
        <div className="container mt-4">
            <h2 className="mb-4">Update Employee (ID: {id})</h2>
            
            <Form className='p-4 border border-2 rounded-3 bg-light' onSubmit={formSubmission}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        name="email" 
                        placeholder="Enter email" 
                        value={formData.email || ''} 
                        onChange={handleInputChange} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        name="password" 
                        placeholder="Password"  
                        value={formData.password || ''} 
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="name" 
                        placeholder="Enter name"  
                        value={formData.name || ''} 
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupSalary">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="salary" 
                        placeholder="Enter salary" 
                        value={formData.salary || ''} 
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupDepartment">
                    <Form.Label>Department</Form.Label>
                    <Form.Control 
                        type="text" 
                        name="department" 
                        placeholder="Enter department" 
                        value={formData.department || ''} 
                        onChange={handleInputChange}
                    />
                </Form.Group>
                
                <div className="d-flex gap-2">
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Employee'}
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/alldata')}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default Update;