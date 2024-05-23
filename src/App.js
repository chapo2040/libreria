import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';

import Libreria from './Libreria';
import Login from './Login';
import Agregar from './Agregar';

function App() 
{
  return (    
    <div className="App">

       <Router>
          <Routes>    
            <Route path="/" element={<Libreria />} />            
            <Route path="/login" element={<Login />} />
            <Route path="/agregar" element={<Agregar />} />
          </Routes>
        </Router>

    </div>
  );
}

export default App;
