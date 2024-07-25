import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailProject = () => {
    const { id } = useParams(); // Extract id from URL params
    const [project, setProject] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3080/project/${id}`)
            .then(res => {
                setProject(res.data);
            })
            .catch(err => console.log('Error fetching project:', err));
    }, [id]);

    if (!project) {
        return (
            <div className="container-fluid bg-primary text-white d-flex justify-content-center align-items-center vh-100">
                <div className="container text-center">
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid bg-primary text-white d-flex justify-content-center align-items-center vh-100">
            <div className="container">
                <h2 className="text-center">Project Details</h2>
                <div className="card">
                    <div className="card-body">
                        <p className="card-text"><strong>Project Name:</strong> {project.ProjectName}</p>
                        <p className="card-text"><strong>Description:</strong> {project.ProjectDescription}</p>
                        <p className="card-text"><strong>Professor:</strong> {project.Professor}</p>
                        <p className="card-text"><strong>Contact:</strong> {project.Contact}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProject;
