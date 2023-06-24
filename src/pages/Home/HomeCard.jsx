import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "antd";
import { Link } from "react-router-dom";
import HomeCardList from "./HomeCardList";
import categoryMatrix from "../common/categoryMatrix";
import globalStyleMatrix from "../common/globalStyleMatrix";
import sortArrayObjByDate from "../utils/sortArrayObjByDate";
import sortArrayObjByNumber from "../utils/sortArrayObjByNumber";
import style from "./style/HomeCard.module.css";

const HomeCard = (props) => {
  const { title, extra, isLoading } = props;
  const wipSpan = <span>This card is still WIP...</span>;
  const cardTitle = title ? title : "New Card";
  const cardExtra = extra ? (
    <Link to={extra.toLowerCase()} className={style.lw_homecard_link}>
      Explore
    </Link>
  ) : null;
  const portfolioData = useSelector((state) => state.portfolioData);
  const leetcodeData = useSelector((state) => state.leetcodeData);
  const applicationData = useSelector((state) => state.applicationData);
  const componentData = useSelector((state) => state.componentData);
  const favoriteData = useSelector((state) => state.favoriteData);
  const [cardContents, setCardContents] = useState(wipSpan);

  useEffect(() => {
    getCardContents();
    // eslint-disable-next-line
  }, [
    portfolioData,
    leetcodeData,
    applicationData,
    componentData,
    favoriteData,
  ]);

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
      case categoryMatrix.FAVORITES: {
        setCardContents(
          <HomeCardList
            data={sortArrayObjByNumber(favoriteData.data)}
            type={categoryMatrix.FAVORITES}
          />
        );
        break;
      }
      default:
        setCardContents(wipSpan);
    }
  };

  const getCardCover = () => {
    switch (title && title.props.children[1].toString()) {
      case categoryMatrix.COMPONENTS: {
        return (
          <>
            <p className={style.lw_homecard_flipcard_front_title}>Components</p>
            <div>
              "Here are lots of awesome components could copy & past to new
              projects!"
            </div>
          </>
        );
      }
      case categoryMatrix.APPLICATIONS: {
        return (
          <>
            <p className={style.lw_homecard_flipcard_front_title}>
              Applications
            </p>
            <div>
              "It just calls Applications, but not just Applications..."
            </div>
          </>
        );
      }
      case categoryMatrix.LEETCODES: {
        return (
          <>
            <p className={style.lw_homecard_flipcard_front_title}>Leetcodes</p>
            <div>"I tried so hard and got so far</div>
            <div>But in the end, it doesn't even matter"</div>
          </>
        );
      }
      case categoryMatrix.FAVORITES: {
        return (
          <>
            <p className={style.lw_homecard_flipcard_front_title}>Favorites</p>
            <div>"Normally I won't share my favorite to other people..."</div>
          </>
        );
      }
      case categoryMatrix.PORTFOLIO: {
        return (
          <>
            <p className={style.lw_homecard_flipcard_front_title}>Portfolio</p>
            <div>"Nobody will care about your backgrounds!"</div>
            <div>---Katherine</div>
          </>
        );
      }
      default:
        return "";
    }
  };

  return (
    <>
      <div class={style.lw_homecard_flipcard}>
        <div class={style.lw_homecard_flipcard_inner}>
          <div class={style.lw_homecard_flipcard_frontSide}>
            {getCardCover()}
          </div>
          <div class={style.lw_homecard_flipcard_backSide}>
            <Card
              className={style.lw_homecard}
              title={cardTitle}
              extra={cardExtra}
              bordered={false}
              loading={isLoading}
              headStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
              bodyStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
            >
              {cardContents}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
