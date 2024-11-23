import React from "react";
import "./Recommendation.css";

const Recommendation = ({ recommendation }) => {
    const { City, Place, Place_desc, Combined_Score } = recommendation || {};

    return (
        <div className="recommendation">
            <img
                src="placeholder.jpg" // Use a placeholder or dynamic image URL
                alt={City || "No City Available"}
                className="image"
            />
            <div className="info">
                <h3>{City || "No City Available"}</h3>
                <p><strong>Place:</strong> {Place || "No Place Available"}</p>
                <p><strong>Description:</strong> {Place_desc || "Description not available"}</p>
                <p>
                    <strong>Rating:</strong>{" "}
                    {Combined_Score !== undefined ? `${Combined_Score}/5` : "No rating available"}
                </p>
                <button className="book-now">Book Now</button>
            </div>
        </div>
    );
};

export default Recommendation;
