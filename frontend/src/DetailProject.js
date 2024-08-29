import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailProject = () => {
    const { id } = useParams(); // Extract id from URL params
    const [project, setProject] = useState(null);

    useEffect(() => {
        axios.get(`https://project-management-duum.onrender.com/${id}`)
            .then(res => {
                setProject(res.data);
            })
            .catch(err => console.log('Error fetching project:', err));
    }, [id]);

    if (!project) {
        return (
            <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="text-center">
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h2 className="text-center mb-4" style={{ color: '#343a40', fontSize: '2rem', fontWeight: 'bold' }}>Project Details</h2>
                <div className="card shadow-lg border-light rounded">
                    <div className="card-body p-4">
                        <p className="card-text mb-3"><strong style={{ color: '#495057' }}>Project Name:</strong> <span style={{ color: '#212529' }}>{project.ProjectName}</span></p>
                        <p className="card-text mb-3"><strong style={{ color: '#495057' }}>Description:</strong> <span style={{ color: '#212529' }}>{project.ProjectDescription}</span></p>
                        <p className="card-text mb-3"><strong style={{ color: '#495057' }}>Professor:</strong> <span style={{ color: '#212529' }}>{project.Professor}</span></p>
                        <p className="card-text"><strong style={{ color: '#495057' }}>Contact:</strong> <span style={{ color: '#212529' }}>{project.Contact}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProject;
