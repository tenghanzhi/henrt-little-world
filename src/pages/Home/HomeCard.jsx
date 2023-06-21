import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";
import { Link } from "react-router-dom";
import HomeCardList from "./HomeCardList";
import categoryMatrix from "../common/categoryMatrix";
import sortArrayObjByDate from "../utils/sortArrayObjByDate";
import sortArrayObjByNumber from "../utils/sortArrayObjByNumber";
import style from "./style/HomeCard.module.css";

const HomeCard = (props) => {
  const { title, extra, isLoading } = props;
  const wipSpan = <span>This card is still WIP...</span>;
  const cardTitle = title ? title : "New Card";
  const cardExtra = extra ? <Link to={extra.toLowerCase()}>More</Link> : null;
  const portfolioData = useSelector((state) => state.portfolioData);
  const leetcodeData = useSelector((state) => state.leetcodeData);
  const applicationData = useSelector((state) => state.applicationData);
  const componentData = useSelector((state) => state.componentData);
  const [cardContents, setCardContents] = useState(wipSpan);

  useEffect(() => {
    getCardContents();
    // eslint-disable-next-line
  }, [portfolioData, leetcodeData, applicationData, componentData]);

  const getCardContents = () => {
    switch (title && title.props.children[1].toString()) {
      case categoryMatrix.PORTFOLIO: {
        setCardContents(
          <HomeCardList
            data={sortArrayObjByDate(portfolioData.data)}
            type={categoryMatrix.PORTFOLIO}
          />
        );
        break;
      }
      case categoryMatrix.COMPONENTS: {
        setCardContents(
          <HomeCardList
            data={sortArrayObjByNumber(componentData.data)}
            type={categoryMatrix.COMPONENTS}
          />
        );
        break;
      }
      case categoryMatrix.APPLICATIONS: {
        setCardContents(
          <HomeCardList
            data={applicationData.data}
            type={categoryMatrix.APPLICATIONS}
          />
        );
        break;
      }
      case categoryMatrix.LEETCODES: {
        setCardContents(
          <HomeCardList
            data={sortArrayObjByNumber(leetcodeData.data)}
            type={categoryMatrix.LEETCODES}
          />
        );
        break;
      }
      case categoryMatrix.MORE: {
        return null;
      }
      default:
        setCardContents(wipSpan);
    }
  };

  return (
    <Card
      className={style.lw_homecard}
      title={cardTitle}
      extra={cardExtra}
      bordered={false}
      loading={isLoading}
    >
      {cardContents}
    </Card>
  );
};

export default HomeCard;
