import React from 'react';

const ProjectCard = ({ projectName }) => {
    return (
        <div className="project-card">
            <h2>{projectName}</h2>
            <p>Short description of {projectName}.</p>
            <button>View Apartments</button>
        </div>
    );
};

export default ProjectCard;
