import { useParams } from "react-router-dom";
import ApartmentCard from "./AgentCard";

const projectsData = {
  elo_sokna: {
    description: "Detailed description of Project 1.",
    apartments: [
      {
        name: "Apartment 101",
        price: "$250,000",
        size: "1200 sq ft",
        bedrooms: 2,
        bathrooms: 2,
      },
      {
        name: "Apartment 101",
        price: "$250,000",
        size: "1200 sq ft",
        bedrooms: 2,
        bathrooms: 2,
      },
      {
        name: "Apartment 101",
        price: "$250,000",
        size: "1200 sq ft",
        bedrooms: 2,
        bathrooms: 2,
      },
      // More apartments...
    ],
  },
  soly_Coast: {
    description: "Detailed description of Project 1.",
    apartments: [
      {
        name: "Apartment 101",
        price: "$250,000",
        size: "1200 sq ft",
        bedrooms: 2,
        bathrooms: 2,
      },
      {
        name: "Apartment 101",
        price: "$250,000",
        size: "1200 sq ft",
        bedrooms: 2,
        bathrooms: 2,
      },
      {
        name: "Apartment 101",
        price: "$250,000",
        size: "1200 sq ft",
        bedrooms: 2,
        bathrooms: 2,
      },
      // More apartments...
    ],
  },
  Project1: {
    description: "Detailed description of Project 1.",
    apartments: [
      {
        name: "Apartment 101",
        price: "$250,000",
        size: "1200 sq ft",
        bedrooms: 2,
        bathrooms: 2,
      },
      {
        name: "Apartment 101",
        price: "$250,000",
        size: "1200 sq ft",
        bedrooms: 2,
        bathrooms: 2,
      },
      {
        name: "Apartment 101",
        price: "$250,000",
        size: "1200 sq ft",
        bedrooms: 2,
        bathrooms: 2,
      },
      // More apartments...
    ],
  },
  Project2: {
    description: "Detailed description of Project 2.",
    apartments: [
      {
        name: "Apartment 201",
        price: "$300,000",
        size: "1500 sq ft",
        bedrooms: 3,
        bathrooms: 2,
      },
      {
        name: "Apartment 301",
        price: "$300,000",
        size: "500 sq ft",
        bedrooms: 3,
        bathrooms: 2,
      },
      {
        name: "Apartment 201",
        price: "$300,000",
        size: "1500 sq ft",
        bedrooms: 3,
        bathrooms: 2,
      },
      // More apartments...
    ],
  },
  // More projects...
};

const ProjectDetails = () => {
  const { projectName } = useParams();
  const project = projectsData[projectName];

  if (!project) {
    return <h2>Project not found!</h2>;
  }

  return (
    <div>
      <div className="container">
        <div className="header">
          <h2>{projectName}</h2>
          <p>{project.description}</p>
        </div>
        <div className="project-cards">
          {project.apartments.map((apartment, index) => (
            <ApartmentCard key={index} apartment={apartment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
