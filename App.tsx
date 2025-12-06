
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import ChatBot from './components/ChatBot';
import { loadDatabase, checkSystemHealth } from './services/dataService';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Services from './pages/Services';
import Tracking from './pages/Tracking';
import About from './pages/About';
import Contact from './pages/Contact';
import Account from './pages/Account';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import Wishlist from './pages/Wishlist';

const App = () => {
  useEffect(() => {
    // Attempt to load the database in background when app opens
    const init = async () => {
      await checkSystemHealth();
      loadDatabase().catch(console.error);
    };
    init();
  }, []);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/services" element={<Services />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Wishlist />} />
          
          {/* Admin Route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
      <ChatBot />
    </HashRouter>
  );
};

export default App;
