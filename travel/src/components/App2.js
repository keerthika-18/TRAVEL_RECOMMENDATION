import React, { useState } from "react";
import Recommendation from "./Recommendation";
import "./App2.css";

function App2() {
    const [recommendations, setRecommendations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");

    // Function to fetch recommendations
    const searchRecommendations = async (event) => {
        event.preventDefault(); // Prevent form refresh
        setError(""); // Reset any previous errors

        if (!searchTerm.trim()) {
            setError("Please enter a valid city name.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Ensure backend interprets as JSON
                },
                body: JSON.stringify({ city_name: searchTerm, top_n: 25 }), // Hardcoded to 25 recommendations
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Error fetching recommendations");
                setRecommendations([]);
                return;
            }

            const data = await response.json();
            console.log("Received recommendations:", data);

            // Update state with the fetched recommendations
            setRecommendations(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error during fetch:", error);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="App">
            <h1>Travel Recommendations</h1>

            <form onSubmit={searchRecommendations}>
                <input
                    type="text"
                    placeholder="Search for a city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {error && <p className="error">{error}</p>}

            <div className="recommendations">
                {recommendations.length > 0 ? (
                    recommendations.map((rec, index) => (
                        <Recommendation key={index} recommendation={rec} />
                    ))
                ) : (
                    !error && <p>No recommendations found.</p>
                )}
            </div>
        </div>
    );
}

export default App2;
