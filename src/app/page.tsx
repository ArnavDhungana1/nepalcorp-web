'use client';


import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';


interface UserProfile {
  email: string;
  username: string;
  password: string;
}


const content = {
  en: {
    nav: {
      home: 'Home',
      projects: 'Projects',
      organizations: 'Organizations',
      impact: 'Impact',
      signUp: 'Sign Up',
      language: 'EN/ने',
      getStarted: 'Get Started',
      placeholderAlert: 'Get Started clicked',
    },
    heading: 'Make a Lasting Impact in Nepal',
    description:
      'Connect your skills with Nepal’s development needs. Verified organizations. Measured results. One community for change.',
    signUpTitle: 'Sign Up',
    email: 'Email:',
    username: 'Username:',
    password: 'Password:',
    signOut: 'Sign Out',
  },
  ne: {
    nav: {
      home: 'गृहपृष्ठ',
      projects: 'परियोजनाहरू',
      organizations: 'संस्थाहरू',
      impact: 'प्रभाव',
      signUp: 'साइन अप',
      language: 'ने/EN',
      getStarted: 'सुरु गर्नुहोस्',
      placeholderAlert: 'सुरु गर्नुहोस् क्लिक गरियो',
    },
    heading: 'नेपालमा दीर्घकालीन प्रभाव पार्नुहोस्',
    description:
      'तपाईंका सीपहरूलाई नेपालको विकास आवश्यकतासँग जोड्नुहोस्। प्रमाणित संस्था। मापन गरिएका परिणामहरू। परिवर्तनको लागि एउटा समुदाय।',
    signUpTitle: 'साइन अप',
    email: 'इमेल:',
    username: 'प्रयोगकर्ता नाम:',
    password: 'पासवर्ड:',
    signOut: 'साइन आउट',
  },
};


export default function Home() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showSignup, setShowSignup] = useState(false);
  const [formData, setFormData] = useState<UserProfile>({
    email: '',
    username: '',
    password: '',
  });
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ne'>('en');


  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Handle signup form submission
  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.username.trim() || !formData.password.trim()) {
      alert(language === 'en' ? 'Please fill all fields' : 'कृपया सबै क्षेत्रहरू भर्नुहोस्');
      return;
    }
    setUser(formData);
    setFormData({ email: '', username: '', password: '' });
    setShowSignup(false);
  };


  // Toggle profile dropdown visibility
  const toggleProfileDropdown = () => {
    setShowProfileDropdown((prev) => !prev);
  };


  // Close dropdown on outside click
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  // Sign out function
  const handleSignOut = () => {
    setUser(null);
    setShowProfileDropdown(false);
  };


  // Toggle language
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ne' : 'en'));
  };


  const langContent = content[language];


  // Define professional color palette
  const primaryColor = '#2C3E50';
  const secondaryColor = '#34495E';
  const accentColor = '#3498DB';
  const backgroundColor = '#F7F9FA';
  const textColor = primaryColor;


  return (
    <div
      style={{
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        backgroundColor: backgroundColor,
        color: textColor,
        minHeight: '100vh',
      }}
    >
      {/* Top Bar */}
      <nav
        style={{
          background: primaryColor,
          color: '#fff',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <h1 style={{ fontWeight: 'bold', fontSize: '1.5rem', margin: 0 }}>NepalCorp</h1>


        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>
            {langContent.nav.home}
          </a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>
            {langContent.nav.projects}
          </a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>
            {langContent.nav.organizations}
          </a>
          <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}>
            {langContent.nav.impact}
          </a>


          {!user ? (
            <button
              onClick={() => setShowSignup(true)}
              style={{
                backgroundColor: accentColor,
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2980B9')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accentColor)}
            >
              {langContent.nav.signUp}
            </button>
          ) : (
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                aria-label="User Profile"
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  border: 'none',
                  cursor: 'pointer',
                  color: primaryColor,
                  fontWeight: 'bold',
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  userSelect: 'none',
                }}
                title={user.username}
              >
                {user.username[0].toUpperCase()}
              </button>
              {showProfileDropdown && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    backgroundColor: '#fff',
                    color: primaryColor,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                    borderRadius: '6px',
                    width: 200,
                    zIndex: 100,
                    padding: '1rem',
                    fontSize: '0.9rem',
                  }}
                >
                  <p><strong>{user.username}</strong></p>
                  <p style={{ wordBreak: 'break-word' }}>{user.email}</p>
                  <button
                    onClick={handleSignOut}
                    style={{
                      marginTop: '0.5rem',
                      backgroundColor: '#E74C3C',
                      color: '#fff',
                      border: 'none',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      width: '100%',
                      fontWeight: 'bold',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C0392B')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E74C3C')}
                  >
                    {langContent.signOut}
                  </button>
                </div>
              )}
            </div>
          )}


          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            style={{
              background: '#fff',
              color: primaryColor,
              border: 'none',
              borderRadius: '3px',
              padding: '0.3rem 0.8rem',
              cursor: 'pointer',
              fontWeight: '600',
            }}
            title="Toggle Language"
          >
            {langContent.nav.language}
          </button>
        </div>
      </nav>


      {/* Sign Up Modal */}
      {showSignup && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
          }}
          onClick={() => setShowSignup(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '2rem',
              width: '360px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              position: 'relative',
              color: primaryColor,
            }}
          >
            <h2 style={{ marginTop: 0 }}>{langContent.signUpTitle}</h2>
            <form onSubmit={handleSignupSubmit}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                {langContent.email}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.25rem',
                    marginBottom: '1rem',
                    borderRadius: '4px',
                    border: `1px solid ${primaryColor}`,
                    fontSize: '1rem',
                  }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                {langContent.username}
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.25rem',
                    marginBottom: '1rem',
                    borderRadius: '4px',
                    border: `1px solid ${primaryColor}`,
                    fontSize: '1rem',
                  }}
                />
              </label>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                {langContent.password}
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.25rem',
                    marginBottom: '1rem',
                    borderRadius: '4px',
                    border: `1px solid ${primaryColor}`,
                    fontSize: '1rem',
                  }}
                />
              </label>
              <button
                type="submit"
                style={{
                  backgroundColor: accentColor,
                  color: '#fff',
                  border: 'none',
                  padding: '0.7rem 1.5rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2980b9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accentColor)}
              >
                {langContent.nav.signUp}
              </button>
            </form>
          </div>
        </div>
      )}


      {/* Main homepage content */}
      <section
        style={{
          padding: '3rem 2rem 5rem',
          maxWidth: 960,
          margin: '0 auto',
          color: textColor,
        }}
      >
        <h1 style={{ fontWeight: '700', fontSize: '2.5rem', marginBottom: '1rem', color: primaryColor }}>
          {langContent.heading}
        </h1>
        <p style={{ fontSize: '1.25rem', color: secondaryColor, maxWidth: 600, lineHeight: 1.6 }}>
          {langContent.description}
        </p>
        <button
          style={{
            backgroundColor: accentColor,
            color: '#fff',
            fontWeight: '600',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1.15rem',
            padding: '1rem 3rem',
            marginTop: '2rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(52, 152, 219, 0.4)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2980b9')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accentColor)}
          onClick={() => alert(langContent.nav.placeholderAlert)}
        >
          {langContent.nav.getStarted}
        </button>
      </section>
    </div>
  );
}


const primaryColor = '#2C3E50'; // Dark Blue-Gray
const secondaryColor = '#34495E'; // Slightly lighter dark blue-gray
const accentColor = '#3498DB'; // Bright blue for buttons and highlights
const backgroundColor = '#F7F9FA'; // Very light gray for backgrounds
const textColor = primaryColor;



