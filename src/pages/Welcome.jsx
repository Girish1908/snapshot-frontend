import React from "react";
import "./Welcome.css";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const team = [
  {
    name: "D.Girish",
    img: "/girish.jpg",
    github: "https://github.com/Girish1908",
    linkedin: "http://www.linkedin.com/in/dogiparthi-girish-b0a4bb259",
  },
  {
    name: "N.Prasad Rao",
    img: "/prasad.jpg",
    github: "https://github.com/Prasadrao912",
    linkedin: "https://www.linkedin.com/in/nagaram-prasad-rao-26a6b7280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
  {
    name: "T.Ramesh",
    img: "/ramesh.jpg",
    github: "https://github.com/tippanaboinaramesh",
    linkedin: "https://www.linkedin.com/in/tippanaboina-ramesh-311b5024b/",
  },
  {
    name: "G.Naveen Kumar",
    img: "/farewell_naveen_pic.jpg",
    github: "https://github.com/GAIRUBOINANAVEENKUMAR",
    linkedin: "https://www.linkedin.com/in/naveen-kumar-gairuboina-754649276/",
  },
  {
    name: "PV Naveen",
    img: "/pvnaveen.jpg",
    github: "https://github.com/pvnaveenjrs",
    linkedin: "https://www.linkedin.com/in/palutla-venkata-naveen",
  },
];

const Welcome = () => {
  return (
    <div className="welcome-page">
{/* Section 1: Hero */}
<section className="hero">
  <div className="overlay" />
  <div className="hero-content">
    <img src="public\snapshare.jpg" alt="SnapShare Logo" className="hero-logo" />
    <h1>Welcome to SnapShare 📸</h1>
    <p className="quote">
      "Capture the moments. <br />
      Share your story. <br />
      Connect beautifully with the world."
    </p>
  </div>
</section>


      {/* Section 2: Services */}
      <section className="services">
        <h2>Our Services</h2>
        <p>📷 Upload your best memories</p>
        <p>❤ Like & comment on your friends’ photos</p>
        <p>🔍 Search by tags or users</p>
        <p>🔐 Secure login and feedback system</p>
      </section>

      {/* Section 3: Team */}
      <section className="team">
        <h2>Our Team</h2>
        <div className="team-members">
          {team.map((member, i) => (
            <div className="member" key={i}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <div className="icons">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 SnapShare. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Welcome;
