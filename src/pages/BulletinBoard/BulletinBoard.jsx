import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  message,
  Avatar,
  List,
  Typography,
  Input,
  Button,
  Pagination,
  Select,
} from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import LwLayout from "../common/LwLayout";
import {
  SET_BULLETINBOARD_DATA,
  SET_BULLETINBOARD_TABLE_PAGENATION,
  SET_BULLETINBOARD_TABLE_SORTER,
} from "../../redux/constants";
import style from "./style/BulletinBoard.module.css";

const Portfolio = () => {
  const dispatch = useDispatch();
  const userInfoData = useSelector((state) => state.userInfoData);
  const bulletinboardData = useSelector((state) => state.bulletinboardData);
  const bulletinboardTablePagenation = useSelector(
    (state) => state.bulletinboardTablePagenation
  );
  const bulletinboardTableSorter = useSelector(
    (state) => state.bulletinboardTableSorter
  );
  const [messageValue, setMessageValue] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    handleGetBulletinboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bulletinboardTablePagenation, bulletinboardTableSorter]);

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

  const handleGetBulletinboardData = () => {
    const messageKey = "loadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.BULLETINBOARD_GET_ALL}?pagination[page]=${bulletinboardTablePagenation.current}&pagination[pageSize]=${bulletinboardTablePagenation.size}&sort=${bulletinboardTableSorter.sort}${bulletinboardTableSorter.order}`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_BULLETINBOARD_DATA, payload: response });
        }
      })
      .catch((error) => {
        handleMessage(messageKey, "error", error);
      });
  };

  const handleMessageAreaOnChange = (value) => {
    setMessageValue(value);
  };

  const handleSubmitMessage = () => {
    const messageKey = "uploadingDataMessage";
    handleMessage(
      messageKey,
      "loading",
      messageMatrix.UPLOAD_UPDATED_DATA_MESSAGE_LOADING
    );

    const data = {
      data: {
        message: messageValue,
        user: userInfoData?.user?.username,
      },
    };

    (async () => {
      const response = await fetch(apiMatrix.BULLETINBOARD_CREATE_NEW, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfoData.jwt}`,
        },
      });
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          handleMessage(
            messageKey,
            "success",
            messageMatrix.UPLOAD_UPDATED_DATA_MESSAGE_SUCCESS
          );
          setMessageValue(null);
          handleGetBulletinboardData();
        }
      })
      .catch((error) => {
        handleMessage(
          messageKey,
          "error",
          `${messageMatrix.LOADING_MESSAGE_ERROR}${error}`
        );
        setIsUploading(false);
      });
  };

  const handleLeaveMessaeOnClick = () => {
    handleSubmitMessage();
  };

  const handleSorterChange = (value) => {
    dispatch({
      type: SET_BULLETINBOARD_TABLE_SORTER,
      payload: { ...bulletinboardTableSorter, order: value },
    });
  };

  const handlePaginationChange = (current, size) => {
    dispatch({
      type: SET_BULLETINBOARD_TABLE_PAGENATION,
      payload: { current: current, size: size },
    });
  };

  const pageContent = (
    <>
      <Typography.Title level={1} className={style.lw_bulletinboard_header}>
        Bulletin Board
      </Typography.Title>
      <Typography.Title level={5} className={style.lw_bulletinboard_header}>
        Why not leave a message here. Maybe someone will reply you!😊
      </Typography.Title>
      <div className={style.lw_bulletinboard_content_wrapper}>
        {userInfoData.jwt && (
          <div className={style.lw_bulletinboard_content_leavemessage_wrapper}>
            <Input.TextArea
              className={style.lw_bulletinboard_content_item}
              value={messageValue}
              onChange={(e) => handleMessageAreaOnChange(e.target.value)}
              allowClear
            />
            <div className={style.lw_bulletinboard_content_btns_wrapper}>
              <Button
                type="primary"
                className={style.lw_bulletinboard_content_btn}
                onClick={handleLeaveMessaeOnClick}
                disabled={!messageValue || isUploading}
              >
                {messageValue
                  ? `Leave Message as ${userInfoData?.user?.username}`
                  : `Input Some Mssage to Submit`}
              </Button>
            </div>
          </div>
        )}
        <List
          itemLayout="horizontal"
          dataSource={bulletinboardData.data}
          size="large"
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                }
                title={
                  <>
                    {item.attributes.user}{" "}
                    <span className={style.lw_bulletinboard_list_title}>
                      left this message on{" "}
                      {new Date(item.attributes.createdAt).toLocaleString()}
                    </span>
                  </>
                }
                description={item.attributes.message}
              />
            </List.Item>
          )}
          footer={
            <div className={style.lw_bulletinboard_footer_wrapper}>
              <div className={style.lw_bulletinboard_footer_sorter_title}>
                Sort by Date on:
              </div>
              <Select
                defaultValue="Descent"
                options={[
                  {
                    value: ":desc",
                    label: "Descent",
                  },
                  {
                    value: ":asc",
                    label: "Ascent",
                  },
                ]}
                onChange={(value) => handleSorterChange(value)}
                className={style.lw_bulletinboard_footer_sorter_selector}
              />
              <Pagination
                className={style.lw_bulletinboard_footer_pagination}
                showSizeChanger={true}
                showQuickJumper={true}
                defaultPageSize={
                  bulletinboardTablePagenation?.size
                    ? bulletinboardTablePagenation.size
                    : 20
                }
                defaultCurrent={
                  bulletinboardTablePagenation?.current
                    ? bulletinboardTablePagenation.current
                    : 1
                }
                total={bulletinboardData.meta?.pagination?.total}
                onChange={(current, size) =>
                  handlePaginationChange(current, size)
                }
              />
            </div>
          }
        />
      </div>
    </>
  );

  return <LwLayout content={pageContent} />;
};

export default Portfolio;
