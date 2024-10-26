import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Timeline, Card, Col, Row, Descriptions, List } from "antd";
import {
  UserOutlined,
  ToolOutlined,
  LaptopOutlined,
  ExperimentOutlined,
  HomeOutlined,
  AppstoreAddOutlined,
  ProjectTwoTone,
} from "@ant-design/icons";
import apiMatrix from "../common/apiMatrix";
import globalStyleMatrix from "../common/globalStyleMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import sortArrayObjByDate from "../utils/sortArrayObjByDate";
import handleMessage from "../utils/handleMessage";
import LwLayout from "../common/LwLayout";
import {
  SET_PORTFOLIO_DATA,
  SET_PROJECT_DATA,
  SET_SELECTED_PORTFOLIO_ID,
  SET_SELECTED_PROJECT_ID,
  SET_PROJECT_PAGENATION,
} from "../../redux/constants";
import style from "./style/Portfolio.module.css";

const Portfolio = () => {
  const dispatch = useDispatch();
  const portfolioData = useSelector((state) => state.portfolioData);
  const projectData = useSelector((state) => state.projectData);
  const projectPagenation = useSelector((state) => state.projectPagenation);

  useEffect(() => {
    handleFetchData();
  }, [dispatch, projectPagenation]);

  const handleFetchData = async () => {
    const messageKey = "loadingMessage";
    const PORTFOLIOS_PAGINATION_SETUP = "?pagination[withCount]=false";
    const PROJECT_PAGINATION_SETUP = `?pagination[page]=${projectPagenation.current}&pagination[pageSize]=${projectPagenation.size}&sort=updatedAt:desc`;

    await Promise.all([
      fetch(
        `${apiMatrix.PORTFOLIOS_GET_ALL}${PORTFOLIOS_PAGINATION_SETUP}`
      ).then((response) => response.json()),
      fetch(`${apiMatrix.PROJECTS_GET_ALL}${PROJECT_PAGINATION_SETUP}`).then(
        (response) => response.json()
      ),
    ])
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_PORTFOLIO_DATA, payload: response[0] });
          dispatch({ type: SET_PROJECT_DATA, payload: response[1] });
        }
      })
      .catch((error) => {
        handleMessage(
          messageKey,
          "error",
          `${messageMatrix.LOADING_MESSAGE_ERROR}${error}`
        );
      });
  };

  const handleTimelineTitleOnClick = (type, id) => {
    switch (type) {
      case "work":
        dispatch({ type: SET_SELECTED_PORTFOLIO_ID, payload: id });
        break;
      case "project":
        dispatch({ type: SET_SELECTED_PROJECT_ID, payload: id });
        break;
      default:
        break;
    }
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
            to={`/${categoryMatrix.PORTFOLIO.toLowerCase()}/reviewPortfolio/${
              item.id
            }`}
            onClick={() => handleTimelineTitleOnClick("work", item.id)}
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
        color: item.attributes.endDate ? "#FF4D4D" : "#00FF9A",
      });
      return null;
    });
    return timelineItem;
  };

  const schoolTimelineItems = [
    {
      label: "2018-01 ~ 2019-09",
      children: "University of Alabama at Birmingham | M.S.E.E.",
      color: "#00EFFF",
    },
    {
      label: "2012-09 ~ 2016-06",
      children: "Xiamen University | B.S.E.E.",
      color: "#00EFFF",
    },
    {
      label: "2009-09 ~ 2012-06",
      children: "Harbin No. 3 High School",
      color: "#00EFFF",
    },
    {
      label: "2005-09 ~ 2019-06",
      children: "Harbin No. 47 Middle School",
      color: "#00EFFF",
    },
  ];

  const handlePaginationChange = (current, size) => {
    dispatch({
      type: SET_PROJECT_PAGENATION,
      payload: { current: current, size: size },
    });
  };

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
      <Col>
        <Card
          className={style.lw_portfolio_card}
          headStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          bodyStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
          title={
            <>
              <AppstoreAddOutlined
                className={style.lw_portfolio_card_title_icon}
              />
              Project Samples
            </>
          }
        >
          <List
            pagination={{
              showQuickJumper: true,
              defaultPageSize: projectPagenation?.size
                ? projectPagenation.size
                : 10,
              defaultCurrent: projectPagenation?.current
                ? projectPagenation.current
                : 1,
              total: projectData?.meta?.pagination?.total
                ? projectData?.meta?.pagination?.total
                : 0,
              onChange: (current, size) =>
                handlePaginationChange(current, size),
              className: style.lw_portfolio_card_table_pagination,
            }}
            dataSource={projectData?.data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    item.attributes?.pageUrl ? (
                      <a href={item.attributes?.pageUrl} target="_blank">
                        {item.attributes?.name} ({item.attributes?.type})
                      </a>
                    ) : (
                      <div>
                        {item.attributes?.name} ({item.attributes?.type})
                      </div>
                    )
                  }
                />
                <a href={item.attributes?.githubUrl} target="_blank">
                  Check on GitHub
                </a>
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );

  return <LwLayout content={pageContent} pageKey={categoryMatrix.PORTFOLIO} />;
};

export default Portfolio;
