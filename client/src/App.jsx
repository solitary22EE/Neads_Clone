//App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Blog from "./pages/Blog";
// import Services from "./pages/Services";
// import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

         <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            {/* <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />  */}
          </Routes>
        </main> 

        <Footer />
      </div>
    </Router>
  );
}

export default App;
