// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import './Dashboard.css';

// const Dashboard = ({ onUpdateBanner }) => {
//   const [bannerSettings, setBannerSettings] = useState({
//     isVisible: false,
//     description: '',
//     link: '',
//     timer: 60,
//   });

//   useEffect(() => {
//     // Fetch the initial banner settings from the server
//     axios.get('http://localhost:5000/api/banner').then((response) => {
//       setBannerSettings(response.data);
//     });
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setBannerSettings((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:5000/api/banner', bannerSettings).then(() => {
//       onUpdateBanner(bannerSettings);
//       window.location.reload();
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Banner On/Off:
//         <input
//           type="checkbox"
//           name="isVisible"
//           checked={bannerSettings.isVisible}
//           onChange={handleInputChange}
//         />
//       </label>

//       <label>
//         Banner Description:
//         <textarea
//           name="description"
//           value={bannerSettings.description}
//           onChange={handleInputChange}
//         />
//       </label>

//       <label>
//         Banner Timer (seconds):
//         <input
//           type="number"
//           name="timer"
//           value={bannerSettings.timer}
//           onChange={handleInputChange}
//         />
//       </label>

//       <label>
//         Banner Link:
//         <input
//           type="text"
//           name="link"
//           value={bannerSettings.link}
//           onChange={handleInputChange}
//         />
//       </label>

//       <button type="submit">Update Banner</button>
//     </form>
//   );
// };

// export default Dashboard;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ onUpdateBanner }) => {
  const [bannerSettings, setBannerSettings] = useState({
    isVisible: false,
    description: '',
    link: '',
    timer: 60,
  });
  const [countdown, setCountdown] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    // Fetch the initial banner settings from the server
    axios.get('http://localhost:5000/api/banner').then((response) => {
      setBannerSettings(response.data);
    });
  }, []);

  useEffect(() => {
    let timerId;
    if (countdown > 0) {
      timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      // When countdown reaches 0, you can add additional logic here
      alert('Timer ended!');
      setCountdown(null); // Stop the timer
    }
    return () => clearTimeout(timerId);
  }, [countdown]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/banner', bannerSettings).then(() => {
      onUpdateBanner(bannerSettings);
      setCountdown(bannerSettings.timer); // Start the countdown
      setSuccessMessage('Ad updated successfully!'); // Display success message

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Banner On/Off:
          <input
            type="checkbox"
            name="isVisible"
            checked={bannerSettings.isVisible}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Banner Description:
          <textarea
            name="description"
            value={bannerSettings.description}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Banner Timer (seconds):
          <input
            type="number"
            name="timer"
            value={bannerSettings.timer}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Banner Link:
          <input
            type="text"
            name="link"
            value={bannerSettings.link}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Update Banner</button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}

      {countdown !== null && (
        <div className="countdown-timer">
          Countdown: {countdown} seconds
        </div>
      )}
    </div>
  );
};

export default Dashboard;
