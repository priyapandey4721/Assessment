import React,{Suspense} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const  Register =React.lazy(()=>import('./Components/Register'));
const Navbar =React.lazy(()=>import('./Components/Navbar'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div><img src='../Media/Loading.gif' alt="Loading..."/></div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
  </Suspense>
    </div>
  );
}
export default App;