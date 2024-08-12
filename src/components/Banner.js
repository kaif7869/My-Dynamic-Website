import React, { useEffect, useState } from 'react';
import './Banner.css';

const Banner = ({ isVisible, description, link, timer }) => {
  const [timeLeft, setTimeLeft] = useState(timer);

  useEffect(() => {
    if (!isVisible || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isVisible]);

  if (!isVisible || timeLeft <= 0) return null;

  return (
    <div className="banner">
      <p>{description}</p>
      {link && <a href={link} target="_blank" rel="noopener noreferrer">Learn More</a>}
      <p>{`Time Left: ${timeLeft}s`}</p>
    </div>
  );
};

export default Banner;