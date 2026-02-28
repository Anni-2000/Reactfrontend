import React from 'react'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
    
    
    const [formData, setFormData] = useState({
        password: "",
        name: "",
        salary: "",
        email: ""
    })
    
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
            [name]: value
        })
    }

     const formSubmission = async (event) => {
        event.preventDefault();
        console.log(formData);
        
        // Fetch API for POST mapping
        try {
            // Correct axios.post usage - no need for headers object in second parameter
            const response = await axios.post("http://localhost:8080/employee/register", formData, {
              
            });

            console.log("Success:", response.data);
            
            // Navigate to alldata page after successful form submission
            navigate('/Alldata'); // Changed from home to alldata
            
        } catch (error) {
            console.log("Error Creating Employee:", error.message);
            // You might want to show an error message to the user here
        }
    }

    return (
        <Form className='m-5 p-5 border border-3 rounded-3' onSubmit={formSubmission}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    name="email" 
                    placeholder="Enter email" 
                    value={formData.email} 
                    onChange={handleChange} 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    name="password" 
                    placeholder="Password"  
                    value={formData.password} 
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    name="name" 
                    placeholder="Enter name"  
                    value={formData.name} 
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupSalary">
                <Form.Label>Salary</Form.Label>
                <Form.Control 
                    type="number" 
                    name="salary" 
                    placeholder="Enter salary" 
                    value={formData.salary} 
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupSalary">
                <Form.Label>Department</Form.Label>
                <Form.Control 
                    type="text" 
                    name="department" 
                    placeholder="Enter department" 
                    value={formData.department} 
                    onChange={handleChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default Dashboard