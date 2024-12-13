import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-semibold">Weather Task Manager</Link>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
            <li><Link to="/about" className="hover:text-blue-200">About</Link></li>
            <li><Link to="/features" className="hover:text-blue-200">Features</Link></li>
            <li><Link to="/contact" className="hover:text-blue-200">Contact</Link></li>
            {user ? (
              <>
                <li><Link to="/tasks" className="hover:text-blue-200">Tasks</Link></li>
                <li><Link to="/add-task" className="hover:text-blue-200">Add Task</Link></li>
                <li><button onClick={logout} className="hover:text-blue-200">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="hover:text-blue-200">Login</Link></li>
                <li><Link to="/signup" className="hover:text-blue-200">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;







