import { useEffect, useState } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import HomeCardList from "./HomeCardList";
import categoryMatrix from "../common/categoryMatrix";
import portfolioData from "../../data/portfolioData";
import style from "./style/HomeCard.module.css";

const HomeCard = (props) => {
  const { title, extra } = props;

  const wipSpan = <span>This card is still WIP...</span>;
  const [cardContents, setCardContents] = useState(wipSpan);

  const cardTitle = title ? title : "New Card";
  const cardExtra = extra ? <Link to={extra.toLowerCase()}>More</Link> : null;

  useEffect(() => {
    getCardContents();
    // eslint-disable-next-line
  }, []);

  const getCardContents = () => {
    switch (title && title.props.children[1].toString()) {
      case categoryMatrix.PORTFOLIO: {
        setCardContents(
          <HomeCardList data={portfolioData} type={categoryMatrix.PORTFOLIO} />
        );
        break;
      }
      case categoryMatrix.COMPONENTS: {
        return null;
      }
      case categoryMatrix.APPLICATIONS: {
        return null;
      }
      case categoryMatrix.LEETCODES: {
        return null;
      }
      case categoryMatrix.GITHUB: {
        return null;
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
    >
      {cardContents}
    </Card>
  );
};

export default HomeCard;
