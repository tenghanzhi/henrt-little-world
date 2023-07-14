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
  Popconfirm,
} from "antd";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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
  const [editItemId, setEditItemId] = useState(null);
  const [editItemValue, setEditItemValue] = useState(null);

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

  const handleEditMessageAreaOnChange = (value) => {
    setEditItemValue(value);
  };

  const handleSubmitMessage = (type) => {
    const messageKey = "uploadingDataMessage";
    handleMessage(
      messageKey,
      "loading",
      messageMatrix.UPLOAD_UPDATED_DATA_MESSAGE_LOADING
    );

    const data = {
      data: {
        message: type === "create" ? messageValue : editItemValue,
        user: userInfoData?.user?.username,
      },
    };

    if (type.toLowerCase() === "create") {
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
    } else if (type.toLowerCase() === "edit") {
      (async () => {
        const response = await fetch(
          `${apiMatrix.BULLETINBOARD_UPDATE_BY_ID}/${editItemId}`,
          {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfoData.jwt}`,
            },
          }
        );
        return response.json();
      })()
        .then((response) => {
          if (response && response.error) {
            throw new Error(response.error.message);
          } else {
            handleMessage(
              messageKey,
              "success",
              messageMatrix.UPDATING_MESSAGE_SUCCESS
            );
            setEditItemId(null);
            setEditItemValue(null);
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
    }
  };

  const handleDeleteMessage = (id) => {
    const messageKey = "deleteDataMessage";
    handleMessage(
      messageKey,
      "loading",
      messageMatrix.DELETING_MESSAGE_LOADING
    );
    setIsUploading(true);

    (async () => {
      const response = await fetch(
        `${apiMatrix.BULLETINBOARD_DELETE_BY_ID}/${id}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfoData.jwt}`,
          },
        }
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          handleMessage(
            messageKey,
            "success",
            messageMatrix.DELETING_MESSAGE_SUCCESS
          );
          handleGetBulletinboardData();
          setIsUploading(false);
        }
      })
      .catch((error) => {
        handleMessage(
          messageKey,
          "error",
          `${messageMatrix.DELETING_MESSAGE_ERROR}${error}`
        );
        setIsUploading(false);
      });
  };

  const handleLeaveMessaeOnClick = () => {
    handleSubmitMessage("create");
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

  const handleMessageBtnOnClick = (type, item) => {
    switch (type.toLowerCase()) {
      case "edit": {
        setEditItemId(item.id);
        setEditItemValue(item.attributes.message);
        break;
      }
      case "cancel": {
        setEditItemId(null);
        setEditItemValue(null);
        break;
      }
      case "submit": {
        handleSubmitMessage("edit");
        break;
      }
      case "delete": {
        handleDeleteMessage(item.id);
        break;
      }
      default:
        return null;
    }
  };

  const pageContent = (
    <div className={style.lw_bulletinboard_wrapper}>
      <Typography.Title level={2} className={style.lw_bulletinboard_header}>
        Bulletin Board
      </Typography.Title>
      <Typography.Title level={5} className={style.lw_bulletinboard_header}>
        Why not leave a message here. Maybe someone will reply you!😊
      </Typography.Title>
      <div className={style.lw_bulletinboard_content_wrapper}>
        {userInfoData.jwt && (
          <div className={style.lw_bulletinboard_content_leavemessage_wrapper}>
            <Input.TextArea
              className={style.lw_bulletinboard_content_leavemessage_textarea}
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
            <List.Item
              className={style.lw_bulletinboard_content_message_wrapper}
            >
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
                    {item.attributes.user === userInfoData?.user?.username && (
                      <span>
                        {item.id !== editItemId && (
                          <>
                            <Button
                              type="text"
                              size="small"
                              className={style.lw_bulletinboard_list_title_btns}
                              onClick={() => {
                                handleMessageBtnOnClick("edit", item);
                              }}
                            >
                              Edit
                            </Button>
                            <Popconfirm
                              title={`Confirm to delete this message?`}
                              placement="top"
                              onConfirm={() => {
                                handleMessageBtnOnClick("delete", item);
                              }}
                              okText="Confirm"
                              cancelText="Cancel"
                              disabled={isUploading}
                            >
                              <Button
                                type="text"
                                size="small"
                                className={
                                  style.lw_bulletinboard_list_title_btns
                                }
                              >
                                Delete
                              </Button>
                            </Popconfirm>
                          </>
                        )}
                        {item.id === editItemId && (
                          <>
                            <Button
                              type="text"
                              size="small"
                              className={style.lw_bulletinboard_list_title_btns}
                              onClick={() => {
                                handleMessageBtnOnClick("cancel", item);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              type="text"
                              size="small"
                              className={style.lw_bulletinboard_list_title_btns}
                              onClick={() => {
                                handleMessageBtnOnClick("submit", item);
                              }}
                              disabled={
                                item.attributes.message.toString() ===
                                  editItemValue.toString() || isUploading
                              }
                            >
                              Submit
                            </Button>
                          </>
                        )}
                      </span>
                    )}
                  </>
                }
                description={
                  <>
                    {item.id !== editItemId && (
                      <ReactMarkdown
                        children={item.attributes.message}
                        remarkPlugins={[remarkGfm]}
                      />
                    )}
                    {item.id === editItemId && (
                      <Input.TextArea
                        className={style.lw_bulletinboard_list_edit_textarea}
                        defaultValue={item.attributes.message}
                        value={editItemValue}
                        onChange={(e) =>
                          handleEditMessageAreaOnChange(e.target.value)
                        }
                        autoSize
                        allowClear
                      />
                    )}
                  </>
                }
              />
            </List.Item>
          )}
          footer={
            <div className={style.lw_bulletinboard_footer_wrapper}>
              <div className={style.lw_bulletinboard_footer_sorter_title}>
                Sort by Date on:
              </div>
              <Select
                value={bulletinboardTableSorter.order}
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
                    : 25
                }
                defaultCurrent={
                  bulletinboardTablePagenation?.current
                    ? bulletinboardTablePagenation.current
                    : 1
                }
                total={
                  bulletinboardData.meta?.pagination?.total
                    ? bulletinboardData.meta?.pagination?.total
                    : 0
                }
                onChange={(current, size) =>
                  handlePaginationChange(current, size)
                }
              />
            </div>
          }
        />
      </div>
    </div>
  );

  return <LwLayout content={pageContent} />;
};

export default Portfolio;
