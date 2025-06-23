import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import './InventoryPage.css'; // Import the CSS file

const projectsData = {
  elo_sokna: {
    description: "Detailed description of Project 1.",
    apartments: [
      { name: "Apartment 101", price: "$250,000", size: "1200 sq ft", bedrooms: 2, bathrooms: 2 },
      { name: "Apartment 101", price: "$250,000", size: "1200 sq ft", bedrooms: 2, bathrooms: 2 },
      { name: "Apartment 101", price: "$250,000", size: "1200 sq ft", bedrooms: 2, bathrooms: 2 },
      // More apartments...
    ],
  },
  soly_Coast: {
    description: "Detailed description of Project 1.",
    apartments: [
      { name: "Apartment 101", price: "$250,000", size: "1200 sq ft", bedrooms: 2, bathrooms: 2 },
      { name: "Apartment 101", price: "$250,000", size: "1200 sq ft", bedrooms: 2, bathrooms: 2 },
      { name: "Apartment 101", price: "$250,000", size: "1200 sq ft", bedrooms: 2, bathrooms: 2 },
      // More apartments...
    ],
  },
  Project1: {
    description: "Detailed description of Project 1.",
    apartments: [
      { name: "Apartment 101", price: "$250,000", size: "1200 sq ft", bedrooms: 2, bathrooms: 2 },
      { name: "Apartment 101", price: "$250,000", size: "1200 sq ft", bedrooms: 2, bathrooms: 2 },
      { name: "Apartment 101", price: "$250,000", size: "1200 sq ft", bedrooms: 2, bathrooms: 2 },
      // More apartments...
    ],
  },
  Project2: {
    description: "Detailed description of Project 2.",
    apartments: [
      { name: "Apartment 201", price: "$300,000", size: "1500 sq ft", bedrooms: 3, bathrooms: 2 },
      { name: "Apartment 301", price: "$300,000", size: "500 sq ft", bedrooms: 3, bathrooms: 2 },
      { name: "Apartment 201", price: "$300,000", size: "1500 sq ft", bedrooms: 3, bathrooms: 2 },
      // More apartments...
    ],
  },
  // More projects...
};

const InventoryPage = () => {
  return (
    <div className="container">
      <div className="header">
        <h1>Real Estate Projects</h1>
      </div>
      <div className="project-cards">
        {Object.keys(projectsData).map((projectName) => (
          <Link key={projectName} to={`/projects/${projectName}`} className="project-card">
            <ProjectCard projectName={projectName} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
