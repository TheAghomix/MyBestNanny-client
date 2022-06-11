import React from "react";
import Navbar from "./Navbar";
import Form from "./Form";
import babysitter from "../img/babysitter1.svg";
import "./WelcomeScreen.css";
import parent from "../img/parent.svg";
import nannyau from "../img/nannyau.png";

const welcomeScreen = () => {
  return (
    <div className="container_navbar_form">
      <Navbar button1="Our services" button2="About Us" />
      <div className="Welcoming_and_image">
        <div className="Welcome_container">
          <div className="Welcome_text">
            <h1 className="welcoming">Welcome to My Best Nanny</h1>
            <p>
              My Best Nanny, aims to connect parents with babysitters and social
              and/or school assistants, qualified, competent and chosen
              according to several criteria.
            </p>
          </div>
          <div className="form">
            <Form />
          </div>
        </div>
        <img className="babySitter_image" src={babysitter} alt="baby Sitter" />
      </div>

      <div>
        <div id="about-us">
          <div className="about-us-text">
            <h1>Who Are We?</h1>
            <br />
            <p>
              Finding a babysitter or nanny is a solution that many couples turn
              to, only that, finding someone they trust, nearby and able to take
              care of a baby or a child. Even from an elderly person is
              something difficult to find. This is why, one day we decided to
              create this social platform in Tunisia, MyBestNanny, which allows
              couples to contact babysitters, and nannies will be delighted to
              take care of their children.
            </p>
          </div>
        </div>
        <div id="services">
          <div className="service-container">
            <div className="service-info">
              <img className="service-image" src={nannyau} alt="nannyau" />
              <h3>For nannies</h3>
              <p>
                Are you a nanny? Have you done a training in the field of early
                childhood? Passionate about this job? Do you love children? We
                have a broad overview of the different babysitting jobs, with
                positions available for your search criteria.
              </p>
            </div>
          </div>
          <div className="service-container">
            <img className="service-image" src={parent} alt="parent" />
            <div className="service-info">
              <h3>For parents</h3>
              <p>
                Are you looking for a reliable nanny? We have a broad overview
                of the different nannies, with nannies available for your search
                criteria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default welcomeScreen;
