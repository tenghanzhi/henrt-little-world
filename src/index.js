import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LwHeader from './pages/common/LwHeader';
import LwFooter from './pages/common/LwFooter';
import Home from './pages/Home/Home'
import Portfolio from './pages/Portfolio/Portfolio';
import Applications from './pages/Applications/Applications';
import Components from './pages/Components/Components';
import Leetcodes from './pages/Leetcodes/Leetcodes';
import GitHub from './pages/GitHub/GitHub';
import More from './pages/More/More';
import categoryMatrix from './pages/common/categoryMatrix'
import './index.css';

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/henry-little-world/" element={<LwHeader />}>
          <Route index element={<Home />} />
          <Route path={categoryMatrix.PORTFOLIO.toLowerCase()} element={<Portfolio />} />
          <Route path={categoryMatrix.APPLICATIONS.toLowerCase()} element={<Applications />} />
          <Route path={categoryMatrix.COMPONENTS.toLowerCase()} element={<Components />} />
          <Route path={categoryMatrix.LEETCODES.toLowerCase()} element={<Leetcodes />} />
          <Route path={categoryMatrix.GITHUB.toLowerCase()} element={<GitHub />} />
          <Route path={categoryMatrix.MORE.toLowerCase()} element={<More />} />
        </Route>
      </Routes>
      <LwFooter />
    </BrowserRouter>
  );
}
export default Main

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

