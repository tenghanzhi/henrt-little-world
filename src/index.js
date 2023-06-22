import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import categoryMatrix from "./pages/common/categoryMatrix";
import "./index.css";
import LwHeader from "./pages/common/LwHeader";
import LwFooter from "./pages/common/LwFooter";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import EditPortfolio from "./pages/Portfolio/EditPortfolio";
import ReviewPortfolio from "./pages/Portfolio/ReviewPortfolio";
import LeetCodes from "./pages/LeetCodes";
import CreateLeetCodes from "./pages/LeetCodes/CreateLeetCodes";
import EditLeetCodes from "./pages/LeetCodes/EditLeetCodes";
import ReviewLeetCodes from "./pages/LeetCodes/ReviewLeetCodes";
import Applications from "./pages/Applications";
import CreateApplications from "./pages/Applications/CreateApplication";
import EditApplications from "./pages/Applications/EditApplication";
import ReviewApplications from "./pages/Applications/ReviewApplication";
import Components from "./pages/Components";
import CreateComponents from "./pages/Components/CreateComponents";
import EditComponents from "./pages/Components/EditComponents";
import ReviewComponents from "./pages/Components/ReviewComponents";
import Favorites from "./pages/Favorites";

const Main = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <LwHeader />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route
              path={categoryMatrix.PORTFOLIO.toLowerCase()}
              element={<Portfolio />}
            />
            <Route
              path={`${categoryMatrix.PORTFOLIO.toLowerCase()}/editPortfolio`}
              element={<EditPortfolio />}
            />
            <Route
              path={`${categoryMatrix.PORTFOLIO.toLowerCase()}/reviewPortfolio`}
              element={<ReviewPortfolio />}
            />
            <Route
              path={categoryMatrix.LEETCODES.toLowerCase()}
              element={<LeetCodes />}
            />
            <Route
              path={`${categoryMatrix.LEETCODES.toLowerCase()}/createLeetCodes`}
              element={<CreateLeetCodes />}
            />
            <Route
              path={`${categoryMatrix.LEETCODES.toLowerCase()}/editLeetCodes`}
              element={<EditLeetCodes />}
            />
            <Route
              path={`${categoryMatrix.LEETCODES.toLowerCase()}/reviewLeetCodes`}
              element={<ReviewLeetCodes />}
            />
            <Route
              path={categoryMatrix.APPLICATIONS.toLowerCase()}
              element={<Applications />}
            />
            <Route
              path={`${categoryMatrix.APPLICATIONS.toLowerCase()}/createApplications`}
              element={<CreateApplications />}
            />
            <Route
              path={`${categoryMatrix.APPLICATIONS.toLowerCase()}/editApplications`}
              element={<EditApplications />}
            />
            <Route
              path={`${categoryMatrix.APPLICATIONS.toLowerCase()}/reviewApplications`}
              element={<ReviewApplications />}
            />
            <Route
              path={categoryMatrix.COMPONENTS.toLowerCase()}
              element={<Components />}
            />
            <Route
              path={`${categoryMatrix.COMPONENTS.toLowerCase()}/createComponents`}
              element={<CreateComponents />}
            />
            <Route
              path={`${categoryMatrix.COMPONENTS.toLowerCase()}/editComponents`}
              element={<EditComponents />}
            />
            <Route
              path={`${categoryMatrix.COMPONENTS.toLowerCase()}/reviewComponents`}
              element={<ReviewComponents />}
            />
            <Route
              path={categoryMatrix.FAVORITES.toLowerCase()}
              element={<Favorites />}
            />
          </Route>
        </Routes>
        <LwFooter />
      </BrowserRouter>
    </Provider>
  );
};
export default Main;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
