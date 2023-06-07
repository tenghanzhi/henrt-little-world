import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Descriptions,
  Space,
  Typography,
  Col,
  Row,
  Image,
  Popconfirm,
  Button,
  Input,
  message,
} from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import failPicture from "../common/failPicture";
import password from "../common/password";
import { SET_EDIT_PORTFOLIO_ID } from "../../redux/constants";
import style from "./style/PortfolioCard.module.css";

const PortfolioCard = (props) => {
  //Props
  const isLoading = props.isLoading ? props.isLoading : false;
  const dataId = props.dataId ? props.dataId : null;

  //Data
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
  const startDate =
    props.data.startDate && props.data.startDate !== ""
      ? props.data.startDate
      : "None";
  const endDate =
    props.data.endDate && props.data.endDate !== ""
      ? props.data.endDate
      : "Present";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputPassword, setInputPassword] = useState(null);

  const handleMessage = (key, type) => {
    const messageDuration = 2;

    switch (type) {
      case "success": {
        message.success({
          key: key,
          content: messageMatrix.PASSWORD_RESULT_SCCESS,
          duration: messageDuration,
        });
        break;
      }
      case "error": {
        message.error({
          key: key,
          content: messageMatrix.PASSWORD_RESULT_ERROR,
          duration: messageDuration,
        });
        break;
      }
      default:
        return null;
    }
  };

  const handlePasswordValueChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleConfirmPassword = () => {
    if (inputPassword !== null && inputPassword === password) {
      handleMessage("passwordResult", "success");
      dispatch({ type: SET_EDIT_PORTFOLIO_ID, payload: dataId });
      navigate(`/${categoryMatrix.PORTFOLIO.toLowerCase()}/editPortfolio`);
    } else {
      handleMessage("passwordResult", "error");
      setInputPassword(null);
    }
  };

  const handleCancelPassword = () => {
    setInputPassword(null);
  };

  return (
    <>
      <Card
        className={style.lw_portfolio_card}
        id={name.replace(/\s/g, "").replace(",", "").replace(".", "")}
        key={name.replace(/\s/g, "").replace(",", "").replace(".", "")}
        loading={isLoading}
        extra={
          <Popconfirm
            title={"Edit portfolio " + name + " " + jobTitle + "?"}
            placement="topRight"
            description={
              <>
                <div>Please input password to edit.</div>
                <Input.Password
                  placeholder="Input password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={(e) => handlePasswordValueChange(e)}
                  allowClear={true}
                  value={inputPassword}
                  onPressEnter={handleConfirmPassword}
                />
              </>
            }
            onConfirm={handleConfirmPassword}
            onCancel={handleCancelPassword}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Button type="default">Edit</Button>
          </Popconfirm>
        }
      >
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
          <Descriptions.Item label="Start Date" span={4}>
            {startDate}
          </Descriptions.Item>
          <Descriptions.Item label="End Date" span={4}>
            {endDate}
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
    </>
  );
};

export default PortfolioCard;
