import React, { useState, useEffect } from 'react';

const GovernmentSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/government-schemes');
        const data = await response.json();
        if (data.success) {
          setSchemes(data.data);
        } else {
          setError('Failed to fetch schemes');
        }
      } catch (err) {
        setError('Error fetching schemes: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemes();
  }, []);

  if (loading) {
    return (
      <div className="government-schemes">
        <h2>Government Schemes</h2>
        <p>Loading schemes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="government-schemes">
        <h2>Government Schemes</h2>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="government-schemes">
      <h2>Government Schemes</h2>
      <p>Explore various government schemes and programs for farmers in India.</p>
      <div className="schemes-list">
        {schemes.map((scheme, index) => (
          <div key={index} className="card">
            <h3>{scheme.name}</h3>
            <p><strong>Description:</strong> {scheme.description}</p>
            <p><strong>Eligibility:</strong> {scheme.eligibility}</p>
            <p><strong>Benefits:</strong> {scheme.benefits}</p>
            <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="scheme-link">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GovernmentSchemes;
