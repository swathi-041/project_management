import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
    const [projectname, setProjectname] = useState('');
    const [projectdescription, setProjectdescription] = useState('');
    const [professor, setProfessor] = useState('');
    const [contact, setContact] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:3080/create', { projectname, projectdescription, professor, contact })
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="w-50 bg-white rounded p-3">
                <h2 className="mb-4">Create New Project</h2>
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
                            placeholder="Number in 10 digits excluding 91+"
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;
