'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Profile {
  name: string;
  skills: string;
  availability: string;
}

export default function Home() {
  const [formData, setFormData] = useState<Profile>({
    name: '',
    skills: '',
    availability: ''
  });

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showProfileForm, setShowProfileForm] = useState(false);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle profile form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    setProfiles(prev => [...prev, formData]);
    setFormData({ name: '', skills: '', availability: '' });
    setShowProfileForm(false); // Hide form after successful submission
  };

  // Show profile form
  const openProfileForm = () => {
    setShowProfileForm(true);
  };

  // Hide profile form (return to home)
  const backToHome = () => {
    setShowProfileForm(false);
  };

  return (
    <div>
      {/* Top Bar */}
      <nav
        style={{
          background: '#089ff8',
          color: '#fff',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          {/* Home button on left */}
          {showProfileForm ? (
            <button
              onClick={backToHome}
              style={{
                backgroundColor: '#fff',
                color: '#089ff8',
                border: 'none',
                borderRadius: '3px',
                padding: '0.3rem 0.8rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              Home
            </button>
          ) : (
            <span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>NepalCorp</span>
          )}
        </div>

        <div>
          {/* Right side navigation */}
          {!showProfileForm && (
            <button
              onClick={openProfileForm}
              style={{
                backgroundColor: '#ff7300',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                fontWeight: 'bold',
                marginRight: '1rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Create Profile
            </button>
          )}

          <a href="#" style={{ color: '#fff', margin: '0 1rem' }}>
            Projects
          </a>
          <a href="#" style={{ color: '#fff', margin: '0 1rem' }}>
            Organizations
          </a>
          <a href="#" style={{ color: '#fff', margin: '0 1rem' }}>
            Impact
          </a>
          <a href="#" style={{ color: '#fff', margin: '0 1rem' }}>
            About
          </a>
          <a href="#" style={{ color: '#fff', margin: '0 1rem' }}>
            Contact
          </a>
          <button
            style={{
              marginLeft: '1rem',
              background: '#fff',
              color: '#089ff8',
              border: 'none',
              borderRadius: '3px',
              padding: '0.3rem 0.8rem',
            }}
          >
            EN/ने
          </button>
        </div>
      </nav>

      {/* Main content conditional */}
      {showProfileForm ? (
        <main
          style={{
            padding: '2rem',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#fef7ee',
            borderRadius: '10px',
            margin: '2rem',
          }}
        >
          <h2>Create Volunteer Profile</h2>
          <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
            <label>
              Name:<br />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
              />
            </label>
            <label>
              Skills (comma separated):<br />
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. Teaching, Healthcare"
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
              />
            </label>
            <label>
              Availability:<br />
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder="e.g. Weekends, Full-time"
                style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
              />
            </label>
            <button
              type="submit"
              style={{
                backgroundColor: '#ff7300',
                color: 'white',
                padding: '0.7rem 1.5rem',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Save Profile
            </button>
          </form>
          <h3>Saved Volunteer Profiles</h3>
          {profiles.length === 0 ? (
            <p>No profiles saved yet.</p>
          ) : (
            <ul>
              {profiles.map((p, idx) => (
                <li
                  key={idx}
                  style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}
                >
                  <strong>Name:</strong> {p.name} <br />
                  <strong>Skills:</strong> {p.skills || 'N/A'} <br />
                  <strong>Availability:</strong> {p.availability || 'N/A'}
                </li>
              ))}
            </ul>
          )}
        </main>
      ) : (
        <>
          {/* Add homepage content here */}
          <section style={{ background: '#fff3e0', padding: '3rem', textAlign: 'center' }}>
            <h1>Make a Lasting Impact in Nepal</h1>
            <p style={{ fontSize: '1.2rem' }}>
              Connect your skills with Nepal’s development needs. Verified organizations. Measured results.
              <br />
              One community for change.
            </p>
            <button
              style={{
                background: '#ff7300',
                color: '#fff',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1rem',
                padding: '1rem 2rem',
                margin: '1.5rem 0',
              }}
            >
              Get Started
            </button>
            <br />
            <a href="#" style={{ margin: '0 1rem', textDecoration: 'underline', color: '#3066be' }}>
              Browse Projects
            </a>
            <a href="#" style={{ margin: '0 1rem', textDecoration: 'underline', color: '#3066be' }}>
              Learn More
            </a>
          </section>

          {/* Why NepalCorp */}
          <section
            style={{ display: 'flex', justifyContent: 'space-around', padding: '2rem', background: '#f1f9fd', flexWrap: 'wrap' }}
          >
            {[
              { title: 'Impact Dashboards', desc: 'See real project results and impact metrics.' },
              { title: 'Verified Partners', desc: 'All organizations are thoroughly vetted for trust and transparency.' },
              { title: 'Personal Matching', desc: 'Match with projects that fit you best, based on skills and interests.' },
              { title: 'Holistic Support', desc: 'Orientation, live support, and an emergency hotline for peace of mind.' },
            ].map(({ title, desc }, i) => (
              <div
                key={i}
                style={{ flex: '1 1 200px', margin: '1rem', padding: '1rem', background: '#fff', borderRadius: '7px', boxShadow: '0 0 8px #deebf7' }}
              >
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </section>

          {/* Featured Projects */}
          <section style={{ padding: '2rem', background: '#fff' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Featured Projects</h2>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  style={{
                    width: 300,
                    margin: '1rem',
                    background: '#fafafa',
                    border: '1px solid #ff7300',
                    borderRadius: 10,
                    boxShadow: '0 0 10px #fceab9',
                    padding: '1.2rem',
                  }}
                >
                  <h4>Project Title {num}</h4>
                  <p>Location: Kathmandu</p>
                  <p>
                    <b>Urgent</b> | Skill: Education
                  </p>
                  <p>Work with local schools to support digital literacy.</p>
                  <button
                    style={{ background: '#089ff8', color: '#fff', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Search Organizations */}
          <section style={{ background: '#f1f9fd', padding: '2rem', textAlign: 'center' }}>
            <h2>Find Organizations</h2>
            <input
              type="text"
              placeholder="Search organizations"
              style={{ padding: '0.8rem', width: '300px', margin: '1rem 0.5rem', border: '1px solid #ccc', borderRadius: '5px' }}
            />
            <button
              style={{
                background: '#ff7300',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                padding: '0.8rem 1.2rem',
              }}
            >
              Search
            </button>
            <div style={{ marginTop: '1.5rem' }}>
              {['Education', 'Healthcare', 'Environment', 'Kathmandu', 'Pokhara', 'Rural Nepal'].map((tag, i) => (
                <span key={i} style={{ margin: '0 0.6rem', color: '#089ff8', textDecoration: 'underline' }}>
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Latest Impact */}
          <section
            style={{ background: '#fff', padding: '2rem', borderTop: '1px solid #e6e6e6', borderBottom: '1px solid #e6e6e6', textAlign: 'center' }}
          >
            <h2>Latest Impact</h2>
            <div style={{ display: 'flex', justifyContent: 'center', margin: '1.5rem 0', gap: '3rem', flexWrap: 'wrap' }}>
              <div>
                <h3>1,200+</h3>
                <p>Volunteers Matched</p>
              </div>
              <div>
                <h3>320+</h3>
                <p>Projects Completed</p>
              </div>
              <div>
                <h3>40,000+</h3>
                <p>Beneficiaries Impacted</p>
              </div>
            </div>
            <h4>Volunteer Stories</h4>
            <em>“I grew as a person and helped a Nepali school go digital.” – Recent Volunteer</em>
          </section>

          {/* How it Works */}
          <section style={{ padding: '2rem', background: '#f1f9fd', textAlign: 'center' }}>
            <h2>How it Works</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ maxWidth: 200 }}>
                <b>1. Sign Up & Build Your Profile</b>
              </div>
              <div style={{ maxWidth: 200 }}>
                <b>2. Get Matched to Projects</b>
              </div>
              <div style={{ maxWidth: 200 }}>
                <b>3. Track Your Impact & Stay Supported</b>
              </div>
            </div>
          </section>

          {/* Safety & Support */}
          <section style={{ background: '#fff', padding: '2rem', textAlign: 'center' }}>
            <h2>Safety & Support</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>✔ Tiered Verification Badges</li>
              <li>✔ 24/7 Emergency Hotline</li>
              <li>✔ Pre-Departure Toolkit</li>
              <li>✔ Moderated Messaging Platform</li>
            </ul>
          </section>

          {/* Footer */}
          <footer style={{ background: '#089ff8', color: '#fff', padding: '2rem', textAlign: 'center' }}>
            <div style={{ marginBottom: '1rem' }}>Privacy Policy | Terms | Help Desk | Contact</div>
            <div>“Building a brighter Nepal—together.”</div>
          </footer>
        </>
      )}
    </div>
  );
}
