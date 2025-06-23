import { Link } from "react-router-dom";
import "./InventoryPage.css"; // Import the CSS file

const ApartmentCard = ({ apartment }) => {
  return (
    <div className="project-card">
      <h3>{apartment.name}</h3>
      <p>Price: {apartment.price}</p>
      <p>Size: {apartment.size}</p>
      <p>
        Bedrooms: {apartment.bedrooms}, Bathrooms: {apartment.bathrooms}
      </p>
      <Link
        to={`/apartments/${apartment.name}`}
        className="view-details-button"
      >
        <button>View Details</button>
      </Link>
      <p></p>
    </div>
  );
};

export default ApartmentCard;
