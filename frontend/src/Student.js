import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Student = () => {
    const [project, setProject] = useState([]);

    useEffect(() => {
        axios.get('https://project-management-duum.onrender.com')
            .then(res => {
                console.log('Data from API:', res.data);
                setProject(res.data);
            })
            .catch(err => console.log('Error fetching data:', err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete('https://project-management-duum.onrender.com/project/' + id);
            setProject(project.filter(pro => pro.id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div
            className='d-flex vh-100 justify-content-center align-items-center'
            style={{
                backgroundColor: '#f8f9fa',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px', // Added padding
            }}
        >
             
            <div className='w-90 h-auto bg-white rounded p-3 shadow-lg'>
            <h1 
                style={{
                    backgroundColor: '#f8f9fa',
                    backgroundPosition: 'center',
                    textAlign: 'center',
                    padding: '20px', // Added padding
                }}>Project Management System</h1>
                <Link to="/create" className='btn btn-success mb-3'>Add+</Link>
                <div className='table-responsive'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>PROJECT</th>
                                <th>DESCRIPTION</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {project.map((pro, index) => (
                                <tr key={index}>
                                    <td>{pro.ProjectName}</td>
                                    <td className="description-column">{pro.ProjectDescription}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <Link to={`detail/${pro.id}`} className='btn btn-info'>Detail</Link>
                                            <Link to={`update/${pro.id}`} className='btn btn-primary'>Update</Link>  
                                            <button className='btn btn-danger' onClick={() => handleDelete(pro.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Student;
