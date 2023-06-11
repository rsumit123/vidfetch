import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InstagramVideoDownloader from './components/InstagramDownloader';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InstagramVideoDownloader />} />
        {/* Add more routes here if needed */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
