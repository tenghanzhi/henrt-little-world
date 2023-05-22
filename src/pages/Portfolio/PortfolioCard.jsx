import { Card, Descriptions, Space, Typography, Col, Row, Image } from "antd";
import failPicture from "../common/failPicture";
import style from "./style/PortfolioCard.module.css";

const PortfolioCard = (props) => {
  const name =
    props.data.name && props.data.name !== "" ? props.data.name : "None";
  const jobTitle =
    props.data.jobTitle && props.data.jobTitle !== ""
      ? props.data.jobTitle
      : "None";
  const projectName =
    props.data.projectName && props.data.projectName !== ""
      ? props.data.projectName
      : "None";
  const period =
    props.data.period && props.data.period !== "" ? props.data.period : "None";
  const location =
    props.data.location && props.data.location !== ""
      ? props.data.location
      : "None";
  const keySkills =
    props.data.keySkills && props.data.keySkills !== ""
      ? props.data.keySkills
      : "None";
  const description =
    props.data.description && props.data.description !== ""
      ? props.data.description
      : "None";
  const jobContent = props.data.jobContent
    ? props.data.jobContent.split("- ").map((item, index) => {
        if (item !== "")
          return (
            <div key={index}>
              <span>- </span>
              {item} <br />
            </div>
          );
        else return null;
      })
    : "None";
  const icon =
    props.data.icon && props.data.icon !== "" ? props.data.icon : "error";

  return (
    <Card className={style.lw_portfolio_card}>
      <Space align="start" direction="horizontal" wrap={true}>
        <Row>
          <Col className={style.lw_portfolio_card_grid} flex="100px">
            <Image
              width={100}
              height={100}
              src={icon}
              fallback={failPicture}
              preview={false}
            />
          </Col>
          <Col className={style.lw_portfolio_card_grid} flex="auto">
            <Typography.Title
              level={3}
              className={style.lw_portfolio_card_title_company_name}
            >
              {name}
            </Typography.Title>
            <Typography.Title
              level={5}
              className={style.lw_portfolio_card_title_job_title}
            >
              {jobTitle}
            </Typography.Title>
          </Col>
        </Row>
      </Space>
      <Descriptions
        className={style.lw_portfolio_card_outter}
        bordered
        column={4}
      >
        <Descriptions.Item label="Project Name" span={4}>
          {projectName}
        </Descriptions.Item>
        <Descriptions.Item label="Period" span={4}>
          {period}
        </Descriptions.Item>
        <Descriptions.Item label="Location" span={4}>
          {location}
        </Descriptions.Item>
        <Descriptions.Item label="Key Skills" span={4}>
          {keySkills}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={4}>
          {description}
        </Descriptions.Item>
        <Descriptions.Item label="Job Contents" span={4}>
          {jobContent}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default PortfolioCard;
