import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProject = () => {
    const [projectname, setProjectname] = useState('');
    const [projectdescription, setProjectdescription] = useState('');
    const [professor, setProfessor] = useState('');
    const [contact, setContact] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch existing project details to pre-fill the form
    useEffect(() => {
        axios.get(`http://localhost:3080/project/${id}`)
            .then(res => {
                const project = res.data;
                setProjectname(project.ProjectName);
                setProjectdescription(project.ProjectDescription);
                setProfessor(project.Professor);
                setContact(project.Contact);
            })
            .catch(err => console.log(err));
    }, [id]);

    function handleSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:3080/update/${id}`, { projectname, projectdescription, professor, contact })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <h2 className="mb-4">Update Project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="projectname" className="form-label">Project Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="projectname"
                            placeholder="Project Name"
                            value={projectname}
                            onChange={e => setProjectname(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="projectdescription" className="form-label">Project Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="projectdescription"
                            placeholder="Project Description"
                            value={projectdescription}
                            onChange={e => setProjectdescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="professor" className="form-label">Professor Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="professor"
                            placeholder="Professor Name"
                            value={professor}
                            onChange={e => setProfessor(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contact" className="form-label">Contact</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contact"
                            placeholder="Contact"
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProject;
