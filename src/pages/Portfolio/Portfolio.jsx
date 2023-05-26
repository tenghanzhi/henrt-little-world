import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PortfolioCard from "./PortfolioCard";
import LwLayout from "../common/LwLayout";

const Portfolio = () => {
  const portfolioData = useSelector((state) => state.portfolioData);
  const clickedHomePageItemId = useSelector(
    (state) => state.clickedHomePageItemId
  );

  useEffect(() => {
    handleClickLinkFromHome();
  }, [clickedHomePageItemId]);

  const handleClickLinkFromHome = () => {
    if (clickedHomePageItemId) {
      const element = document.querySelector("#" + clickedHomePageItemId);
      const yOffset = -74;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const pageContent = portfolioData.map((item, index) => {
    return <PortfolioCard data={item.attributes} key={index} />;
  });

  return <LwLayout content={pageContent} />;
};

export default Portfolio;
