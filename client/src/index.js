import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import Login from './views/Login';
import Logout from './views/Logout';
import Register from './views/Register';
import Home from './views/Home';

import 'antd/dist/antd.css';
import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render( 
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} /> 
            <Route path="register" element={<Register />} /> 
      </Routes>
    </BrowserRouter>
  );
