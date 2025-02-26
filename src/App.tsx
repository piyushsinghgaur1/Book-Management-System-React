import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Hompages';
import Login from './pages/Login';
import BookManager from './pages/BookManager';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booklist" element={<BookManager />} />
        
      </Routes>
    </Router>
  );
};

export default App;
