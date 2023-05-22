import React from 'react';
import PortfolioCard from "./PortfolioCard";
import LwLayout from "../common/LwLayout";
import portfolioData from "../../data/portfolioData";

const pageContent = portfolioData.map((item, index) => {
  return (
    <PortfolioCard data={item} key={index} />
  );
});

const Portfolio = () => {
  return (
    <LwLayout content={pageContent} />
  );
};

export default Portfolio;
