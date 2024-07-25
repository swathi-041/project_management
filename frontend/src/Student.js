import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Student = () => {
    const [project, setProject] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3080/')
            .then(res => {
                console.log('Data from API:', res.data);
                setProject(res.data);
            })
            .catch(err => console.log('Error fetching data:', err));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete('http://localhost:3080/project/' + id);  // Changed from https to http
            setProject(project.filter(pro => pro.id !== id)); // Update the state directly instead of reloading the page
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success mb-3'>Add+</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>PROJECT</th>
                            <th>DESCRIPTION</th>
                            <th>ACTIONS</th>  {/* Added header for actions */}
                        </tr>
                    </thead>
                    <tbody>
                        {project.map((pro, index) => (
                            <tr key={index}>
                                <td>{pro.ProjectName}</td>
                                <td>{pro.ProjectDescription}</td>
                                <td>
                                    <Link to={`detail/${pro.id}`} className='btn btn-info'>Detail</Link>
                                    <Link to={`update/${pro.id}`} className='btn btn-primary ms-2'>Update</Link>  
                                    <button className='btn btn-danger ms-2' onClick={() => handleDelete(pro.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Student;
 