import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { message, Timeline, Card, Col, Row, Descriptions } from "antd";
import {
  UserOutlined,
  ToolOutlined,
  LaptopOutlined,
  ExperimentOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import apiMatrix from "../common/apiMatrix";
import globalStyleMatrix from "../common/globalStyleMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import sortArrayObjByDate from "../utils/sortArrayObjByDate";
import LwLayout from "../common/LwLayout";
import {
  SET_PORTFOLIO_DATA,
  SET_SELECTED_PORTFOLIO_ID,
} from "../../redux/constants";
import style from "./style/Portfolio.module.css";

const Portfolio = () => {
  const dispatch = useDispatch();
  const portfolioData = useSelector((state) => state.portfolioData);

  useEffect(() => {
    handleGetPortfolioData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessage = (key, type, content) => {
    const messageDuration = 2;

    switch (type) {
      case "loading": {
        message.loading({
          key: key,
          content: messageMatrix.LOADING_MESSAGE_LOADING,
        });
        break;
      }
      case "success": {
        message.success({
          key: key,
          content: messageMatrix.LOADING_MESSAGE_SUCCESS,
          duration: messageDuration,
        });
        break;
      }
      case "error": {
        message.error({
          key: key,
          content: `${messageMatrix.LOADING_MESSAGE_ERROR}${content}`,
          duration: messageDuration,
        });
        break;
      }
      default:
        return null;
    }
  };

  const handleGetPortfolioData = () => {
    const messageKey = "loadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.PORTFOLIOS_GET_ALL}?pagination[withCount]=false`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_PORTFOLIO_DATA, payload: response });
        }
      })
      .catch((error) => {
        handleMessage(messageKey, "error", error);
      });
  };

  const handleTimelineTitleOnClick = (id) => {
    dispatch({ type: SET_SELECTED_PORTFOLIO_ID, payload: id });
  };

  const handleGetWorkTimelineItems = () => {
    let timelineItem = [];
    sortArrayObjByDate(portfolioData.data).map((item) => {
      timelineItem.push({
        label: `${item.attributes.startDate.slice(0, 7)} ~ ${
          item.attributes.endDate
            ? item.attributes.endDate.slice(0, 7)
            : "Present"
        }`,
        children: (
          <Link
            to={`/${categoryMatrix.PORTFOLIO.toLowerCase()}/reviewPortfolio`}
            onClick={() => handleTimelineTitleOnClick(item.id)}
          >
            <div>
              <HomeOutlined className={style.lw_portfolio_card_title_icon} />
              {item.attributes.name}
            </div>
            <div>
              <UserOutlined className={style.lw_portfolio_card_title_icon} />
              {item.attributes.jobTitle}
            </div>
          </Link>
        ),
        color: item.attributes.endDate ? "red" : "green",
      });
      return null;
    });
    return timelineItem;
  };

  const schoolTimelineItems = [
    {
      label: "2018-01 ~ 2019-09",
      children: "University of Alabama at Birminghan | M.S.E.E.",
      color: "blue",
    },
    {
      label: "2012-09 ~ 2016-06",
      children: "Xiamen University | B.S.E.E.",
      color: "blue",
    },
    {
      label: "2009-09 ~ 2012-06",
      children: "Harbin No. 3 High School",
      color: "blue",
    },
    {
      label: "2005-09 ~ 2019-06",
      children: "Harbin No. 47 Middle School",
      color: "blue",
    },
  ];

  const pageContent = (
    <Row gutter={[15, 25]}>
      <Col>
        <Card
          className={style.lw_portfolio_card}
          headStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          bodyStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          title={
            <>
              <UserOutlined className={style.lw_portfolio_card_title_icon} />{" "}
              Background
            </>
          }
        >
          <Descriptions
            layout="vertical"
            labelStyle={{
              color: globalStyleMatrix.COLORS.titleFontColor,
              fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeight,
            }}
            contentStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          >
            <Descriptions.Item label="Master Degree" span={3}>
              M.S.E.E. on University of Alabama At birmingham
            </Descriptions.Item>
            <Descriptions.Item label="Bechler  Degree" span={3}>
              B.S.E.E on Xiamen University
            </Descriptions.Item>
            <Descriptions.Item label="Years on SDE" span={3}>
              2020 - Present
            </Descriptions.Item>
            <Descriptions.Item label="Years on EE" span={3}>
              2016 - 2020
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col>
        <Card
          className={style.lw_portfolio_card}
          headStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          bodyStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          title={
            <>
              <ToolOutlined className={style.lw_portfolio_card_title_icon} />
              Key Skills
            </>
          }
        >
          <Descriptions
            layout="vertical"
            labelStyle={{
              color: globalStyleMatrix.COLORS.titleFontColor,
              fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeight,
            }}
            contentStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          >
            <Descriptions.Item label="Proficient on" span={3}>
              HTML, CSS, JavaScript, React, React-Router, Redux, Ant Design,
              GitHub
            </Descriptions.Item>
            <Descriptions.Item label="Advanced on" span={3}>
              Node.JS, Restful, API Strapi, Heroku, Material UI, Element UI,
              Bootstrap, Webpack, Jest, Jasmine
            </Descriptions.Item>
            <Descriptions.Item label="Beginner on" span={3}>
              TypeScript, SQL, Apache Tomcat, Gradle Build Tool,
            </Descriptions.Item>
            <Descriptions.Item label="Majored on" span={3}>
              Microcontroller, Sensors, IC & PCB Design, MQTT, PLC
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col>
        <Card
          className={style.lw_portfolio_card}
          headStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          bodyStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          title={
            <>
              <LaptopOutlined className={style.lw_portfolio_card_title_icon} />
              Work Timeline
            </>
          }
        >
          <Timeline
            mode="left"
            items={handleGetWorkTimelineItems()}
            className={style.lw_portfolio_card_timeline}
          />
        </Card>
      </Col>
      <Col>
        <Card
          className={style.lw_portfolio_card}
          headStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          bodyStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          title={
            <>
              <ExperimentOutlined
                className={style.lw_portfolio_card_title_icon}
              />
              School Timeline
            </>
          }
        >
          <Timeline
            mode="left"
            items={schoolTimelineItems}
            className={style.lw_portfolio_card_timeline}
          />
        </Card>
      </Col>
    </Row>
  );

  return <LwLayout content={pageContent} pageKey={categoryMatrix.PORTFOLIO} />;
};

export default Portfolio;
