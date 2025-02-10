
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Post from './components/Post';
import Login from './components/Login';
import Admin from './components/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App
