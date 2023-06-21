import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, Button, Popconfirm, Input, message } from "antd";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
import password from "../common/password";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import style from "./style/ComponentsCard.module.css";

import { SET_SELECTED_COMPONENT_ID } from "../../redux/constants";

const ComponentsCard = (props) => {
  const data = props?.data ? props.data : null;
  const cssCode = data?.attributes?.cssCode;
  const jsCode = data?.attributes?.jsCode;
  const htmlCode = data?.attributes?.htmlCode;

  const indexHead = htmlCode.indexOf("</head>");
  const combinedCssCode = `${htmlCode.slice(0, indexHead)}
  <style>${cssCode}</style>
  ${htmlCode.slice(indexHead)}`;

  const indexBody = combinedCssCode.indexOf("</body>");
  const combinedJsCode = `${combinedCssCode.slice(0, indexBody)}
  <script>${jsCode}</script>
  ${combinedCssCode.slice(indexBody)}`;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputPassword, setInputPassword] = useState(null);

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

  const handlePasswordValueChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleConfirmPassword = () => {
    if (inputPassword !== null && inputPassword === password) {
      handleMessage("passwordResult", "success");
      dispatch({ type: SET_SELECTED_COMPONENT_ID, payload: data.id });
      navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}/editComponents`);
    } else {
      handleMessage("passwordResult", "error");
      setInputPassword(null);
    }
  };

  const handleCancelPassword = () => {
    setInputPassword(null);
  };

  const handleDetailBtnOnClick = () => {
    dispatch({ type: SET_SELECTED_COMPONENT_ID, payload: data.id });
    navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}/reviewComponents`);
  };

  const cardExtra = (
    <>
      <Popconfirm
        title={"Please input password to edit."}
        placement="topRight"
        description={
          <>
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
        <Button className={style.lw_components_card_extra_btn} type="default">
          Edit
        </Button>
      </Popconfirm>
      <Button
        className={style.lw_components_card_extra_btn}
        type="primary"
        onClick={handleDetailBtnOnClick}
      >
        Detail
      </Button>
    </>
  );

  return (
    <Card
      className={style.lw_components_homecard}
      title={data?.attributes?.name}
      extra={cardExtra}
      bordered={false}
      loading={!data}
    >
      <iframe
        className={style.lw_components_homecard_iframe}
        title={data?.attributes?.name}
        srcDoc={combinedJsCode}
      >
        <p>Your broser does not support iframe tag</p>
      </iframe>
    </Card>
  );
};

export default ComponentsCard;
