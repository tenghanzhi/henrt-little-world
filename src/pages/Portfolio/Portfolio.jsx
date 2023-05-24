import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import PortfolioCard from "./PortfolioCard";
import LwLayout from "../common/LwLayout";
import portfolioData from "../../data/portfolioData";

const Portfolio = () => {
  const clickedHomePageItem = useSelector((state) => state.clickedHomePageItem);

  useEffect(() => {
    if (clickedHomePageItem) {
      const element = document.querySelector("#" + clickedHomePageItem);
      const yOffset = -74; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  }, [clickedHomePageItem]);

  const pageContent = portfolioData.map((item, index) => {
    return <PortfolioCard data={item} key={index} />;
  });

  return <LwLayout content={pageContent} />;
};

export default Portfolio;
