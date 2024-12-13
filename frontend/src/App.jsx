import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
              <Route path="/add-task" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
              <Route path="/edit-task/:id" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;









