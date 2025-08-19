'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface Profile {
  name: string;
  skills: string;
  availability: string;
}

export default function VolunteerProfileForm() {
  const [formData, setFormData] = useState<Profile>({
    name: '',
    skills: '',
    availability: ''
  });

  const [profiles, setProfiles] = useState<Profile[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    setProfiles(prev => [...prev, formData]);
    setFormData({ name: '', skills: '', availability: '' });
  };

  return (
    <section style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#fef7ee', borderRadius: '10px', margin: '2rem 0' }}>
      <h2>Volunteer Profile (MVP Feature)</h2>
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
          style={{ backgroundColor: '#ff7300', color: 'white', padding: '0.7rem 1.5rem', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
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
    </section>
  );
}
