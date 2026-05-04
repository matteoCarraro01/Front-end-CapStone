import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import GameDetail from './pages/GameDetail';
import Footer from './components/Footer';
import Home from './pages/Home';





function App() {
    return (
        <BrowserRouter>
            <div className='app-container'>

                <div className='main-content'>



                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/game/:id" element={<GameDetail />} />

                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    )

}

export default App;
