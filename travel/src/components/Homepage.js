import React, { useState } from "react";
import Yourimage from "../assets/Screenshot 2024-10-30 173218.png";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const [searchTerm, setsearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    setsearchTerm(e.target.value);
  };
  const tours = [
    {
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/54/e2/d6/caption.jpg?w=600&h=600&s=1",
      title: "Mahabalipuram Private Tour from Chennai",
      price: "₹8,562 per adult",
    },
    {
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/e1/20/05/caption.jpg?w=600&h=600&s=1",
      title: "Auroville and Pondicherry Tour from Chennai",
      price: "₹3,805 per adult",
    },
    {
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/fc/df/41/caption.jpg?w=600&h=600&s=1",
      title: "Private 6 Days Exotic Tamil Nadu Tour",
      price: "₹35,716 per adult",
    },
    {
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/59/11/e5/caption.jpg?w=600&h=600&s=1",
      title: "Mahabalipuram & Kanchipuram in a Day from Chennai",
      price: "₹11,675 per adult",
    },
  ];
  const destinations = [
    {
      name: "Bangkok, Thailand",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/c2/78/15/caption.jpg?w=600&h=600&s=1",
    },
    {
      name: "Singapore, Singapore",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/b1/singapore.jpg?w=600&h=600&s=1",
    },
    {
      name: "Mumbai, India",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0b/4e/55/e6/chhatrapati-shivaji-terminus.jpg?w=600&h=600&s=1",
    },
    {
      name: "Bali, Indonesia",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/c7/f1/d3/caption.jpg?w=600&h=600&s=1",
    },
  ];
  return (
    <>
      <img src={Yourimage} alt="the image" />

      <div className="search-nav-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <nav>
          <ul>
            <li>
              <button onClick={() => navigate("/discover")}>Discover</button>
            </li>
            <li>
            <button onClick={() => navigate("/review")}>Reviews</button>
            </li>
            <li>
            <button onClick={() => navigate("/signin")}>Sign in</button>
            </li>
          </ul>
        </nav>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s"
          alt="User Avatar"
          className="avatar"
        />
      </div>
      <img
        src="https://static.tacdn.com/img2/trips/home-gai-entry-gateway-dv.jpg"
        alt="image1"
        className="avator2"
      />
      <div className="overlay-text">
        <h1>DESTINIFY</h1>
        <p>
          Get a whole getaway's worth of ideas made for you—ready in seconds.
        </p>
        <button onClick={() => navigate("/discover")}>Discover</button>
      </div>
      <h2 className="section-heading">Ways to Tour Chennai</h2>
      <p className="section-description">
        Book these experiences for a close-up look at Chennai (Madras).
      </p>
      <div className="card-container">
        {tours.map((tour, index) => (
          <div className="tour-card" key={index}>
            <img src={tour.image} alt={tour.title} className="tour-image" />
            <div className="tour-info">
              <h3>{tour.title}</h3>
              <p>{tour.price}</p>
              <button>View Details</button>
            </div>
          </div>
        ))}
      </div>
      <section className="top-destinations">
        <h2>Top destinations for your next holiday</h2>
        <p>Here's where your fellow travellers are headed</p>
        <div className="destinations-grid">
          {destinations.map((destination, index) => (
            <div key={index} className="destination-card">
              <img src={destination.image} alt={destination.name} />
              <div className="destination-name">{destination.name}</div>
            </div>
          ))}
        </div>
      </section>
      <footer className="footer">
        <div className="footer-section">
          <h3>About Destinify</h3>
          <ul>
            <li>
              <a href="#1">About Us</a>
            </li>
            <li>
              <a href="#2">Press</a>
            </li>
            <li>
              <a href="#3">Resources and Policies</a>
            </li>
            <li>
              <a href="#4">Careers</a>
            </li>
            <li>
              <a href="#5">Trust & Safety</a>
            </li>
            <li>
              <a href="#6">Contact Us</a>
            </li>
            <li>
              <a href="#7">Accessibility Statement</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li>
              <a href="#8">Write a Review</a>
            </li>
            <li>
              <a href="#9">Add a Place</a>
            </li>
            <li>
              <a href="#10">Join</a>
            </li>
            <li>
              <a href="#11">Travellers' Choice</a>
            </li>
            <li>
              <a href="#12">GreenLeaders</a>
            </li>
            <li>
              <a href="#13">Help Centre</a>
            </li>
            <li>
              <a href="#14">Travel Articles</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Do Business With Us</h3>
          <ul>
            <li>
              <a href="#15">Owners & DMO/CVB</a>
            </li>
            <li>
              <a href="#16">Business Advantage</a>
            </li>
            <li>
              <a href="#17">Sponsored Placements</a>
            </li>
            <li>
              <a href="#18">Access our Content API</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Get The App</h3>
          <ul>
            <li>
              <a href="#19">iPhone App</a>
            </li>
            <li>
              <a href="#20">Android App</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Destinify Sites</h3>
          <p>Book tours and attraction tickets on Viator</p>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Destinify LLC All rights reserved.</p>
          <div className="footer-links">
            <a href="#1">Terms of Use</a> |
            <a href="#2">Privacy and Cookies Statement</a> |
            <a href="#3">Cookie Consent</a> |<a href="#">Site Map</a> |
            <a href="#4">How the Site Works</a> |<a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Homepage;
