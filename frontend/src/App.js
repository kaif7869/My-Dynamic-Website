import React, { useState } from 'react';
import Banner from './components/Banner';
import Dashboard from './components/Dashboard';

const App = () => {
  const [bannerData, setBannerData] = useState({
    isVisible: false,
    description: '',
    link: '',
    timer: 0,
  });

  const handleUpdateBanner = (data) => {
    setBannerData(data);
  };


  return(
    <div className='App'>
      <Banner 
        isVisible={bannerData.isVisible}
        description={bannerData.description}
        link={bannerData.link}
        timer={bannerData.timer}
      />
      <Dashboard onUpdateBanner={handleUpdateBanner}/>
    </div>
  )

}

export default App;