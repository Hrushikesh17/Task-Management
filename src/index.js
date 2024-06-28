// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import {BrowserRouter, Route, Routes} from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';
// import Edit from './Edit';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode style={{color_scheme:"dark"}}>
//     <BrowserRouter>
//     <h1 style={{textAlign:"center"}}>TASK MANGEMENT</h1>
//     <Routes>
//       <Route path='/' element={ <App />}/>
//       <Route path="/edit/:id" element={<Edit/>}/>
//     </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Edit from './Edit';

const root = ReactDOM.createRoot(document.getElementById('root'));

const RootApp = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <React.StrictMode>
      <div className={theme === 'dark' ? 'dark-theme' : ''}>
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        <BrowserRouter>
          <h1 style={{ textAlign: "center" }}>TASK MANAGEMENT</h1>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Routes>
        </BrowserRouter>
      </div>
    </React.StrictMode>
  );
};

root.render(<RootApp />);

reportWebVitals();

