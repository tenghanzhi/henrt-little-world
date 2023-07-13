import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Descriptions,
  Button,
  Popconfirm,
  Popover,
  Form,
  message,
  Input,
  InputNumber,
  List,
} from "antd";
import globalStyleMatrix from "../common/globalStyleMatrix";
import categoryMatrix from "../common/categoryMatrix";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import { SET_USER_INFO_DATA, SET_QUICK_LINK_DATA } from "../../redux/constants";
import style from "./style/ReviewUser.module.css";

const ReviewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const userInfoData = useSelector((state) => state.userInfoData);
  const quickLinkData = useSelector((state) => state.quickLinkData);
  const [filedValue, setFiledValue] = useState(form.getFieldValue());
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openCreateQuickLink, setOpenCreateQuickLink] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState(null);
  const [editItemLink, setEditItemLink] = useState(null);
  const [editItemOrder, setEditItemOrder] = useState(null);

  useEffect(() => {
    handleGetQuickLinkData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMessage = (key, type, content) => {
    const messageDuration = 2;

    switch (type) {
      case "loading": {
        message.loading({
          key: key,
          content: content,
        });
        break;
      }
      case "success": {
        message.success({
          key: key,
          content: content,
          duration: messageDuration,
        });
        break;
      }
      case "error": {
        message.error({
          key: key,
          content: content,
          duration: messageDuration,
        });
        break;
      }
      default:
        return null;
    }
  };

  const handleFormValueChange = () => {
    setFiledValue(form.getFieldValue());
  };

  const handleQuickLinkBtnOnClick = (type, item) => {
    switch (type.toLowerCase()) {
      case "edit": {
        console.log(item);
        setEditItemId(item.id);
        setEditItemName(item.attributes.name);
        setEditItemLink(item.attributes.link);
        setEditItemOrder(item.attributes.order);
        break;
      }
      case "cancel": {
        setEditItemId(null);
        setEditItemName(null);
        setEditItemLink(null);
        setEditItemOrder(null);
        setOpenCreateQuickLink(false);
        break;
      }
      case "update": {
        handleSubmitQuickLink("edit");
        break;
      }
      case "delete": {
        handleDeleteQuickLink(item.id);
        break;
      }
      default:
        return null;
    }
  };

  const handleEditQuickLinkOnChange = (type, value) => {
    switch (type) {
      case "name":
        setEditItemName(value);
        break;
      case "link":
        setEditItemLink(value);
        break;
      case "order":
        setEditItemOrder(value);
        break;
      default:
        break;
    }
  };

  const handleLogoutOnClick = () => {
    dispatch({ type: SET_QUICK_LINK_DATA, payload: { data: [], meta: {} } });

    dispatch({
      type: SET_USER_INFO_DATA,
      payload: {
        jwt: null,
        user: {
          id: null,
          username: null,
          email: null,
          provider: null,
          confirmed: false,
          blocked: false,
          createdAt: null,
          updatedAt: null,
        },
      },
    });
    navigate(`/${categoryMatrix.USER.toLowerCase()}`);
  };

  const handleOpenCreateQuickLink = (newOpen) => {
    setOpenCreateQuickLink(newOpen);
  };

  const handleOpenChangePassword = (newOpen) => {
    setOpenChangePassword(newOpen);
  };

  const handleGetQuickLinkData = () => {
    const messageKey = "loadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.QUICK_LINKS_GET_ALL}${
          userInfoData.user.username
            ? `?filters[user][$eq]=${userInfoData.user.username}&sort=order:asc&pagination[pageSize]=20`
            : ""
        }`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_QUICK_LINK_DATA, payload: response });
        }
      })
      .catch((error) => {
        handleMessage(messageKey, "error", error);
      });
  };

  const handleDeleteQuickLink = (id) => {
    const messageKey = "deleteDataMessage";
    handleMessage(
      messageKey,
      "loading",
      messageMatrix.DELETING_MESSAGE_LOADING
    );
    setIsUploading(true);

    (async () => {
      const response = await fetch(
        `${apiMatrix.QUICK_LINKS_DELETE_BY_ID}/${id}`,
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
          handleGetQuickLinkData();
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

  const handleSubmitQuickLink = (type, values) => {
    const messageKey = "uploadingDataMessage";
    handleMessage(
      messageKey,
      "loading",
      messageMatrix.UPLOAD_UPDATED_DATA_MESSAGE_LOADING
    );

    let data;
    switch (type) {
      case "create":
        data = {
          data: {
            user: userInfoData?.user?.username,
            name: values.name,
            link: values.link,
            order: values.order,
          },
        };
        break;
      case "edit":
        data = {
          data: {
            user: userInfoData?.user?.username,
            name: editItemName,
            link: editItemLink,
            order: editItemOrder,
          },
        };
        break;

      default:
        break;
    }

    if (type.toLowerCase() === "create") {
      (async () => {
        const response = await fetch(apiMatrix.QUICK_LINKS_CREATE_NEW, {
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
            handleGetQuickLinkData();
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
          `${apiMatrix.QUICK_LINKS_UPDATE_BY_ID}/${editItemId}`,
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
            setEditItemName(null);
            setEditItemLink(null);
            setEditItemOrder(null);
            handleGetQuickLinkData();
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

  const handleSubmitChangePassword = (values) => {
    const messageKey = "submittingForm";

    handleMessage(messageKey, "loading", messageMatrix.USER_MESSAGE_CREATING);

    const data = {
      currentPassword: values.currentPassword,
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    };

    (async () => {
      const response = await fetch(apiMatrix.USER_CHANGE_PASSWORD, {
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
            messageMatrix.USER_MESSAGE_CREATING_SUCCESS
          );
        }
      })
      .catch((error) => {
        handleMessage(messageKey, "error", `${error}`);
        setIsUploading(false);
      });
  };

  const onFinishQuickLink = (values) => {
    handleSubmitQuickLink("create", values);
  };

  const onFinishPassword = (values) => {
    handleSubmitChangePassword(values);
  };

  const handleDisableCreateLinkSubmitBtn = () => {
    let isHasError = false;

    if (!!form.getFieldsError().filter(({ errors }) => errors.length).length) {
      isHasError = true;
    } else isHasError = false;

    const isAllRequiredFiled =
      filedValue?.hasOwnProperty("link") && filedValue?.hasOwnProperty("order");

    return isHasError || !isAllRequiredFiled;
  };

  const handleDisableChangePasswordSubmitBtn = () => {
    let isHasError = false;

    if (!!form.getFieldsError().filter(({ errors }) => errors.length).length) {
      isHasError = true;
    } else isHasError = false;

    const isAllRequiredFiled =
      filedValue?.hasOwnProperty("currentPassword") &&
      filedValue?.hasOwnProperty("password") &&
      filedValue?.hasOwnProperty("passwordConfirmation");

    return isHasError || !isAllRequiredFiled;
  };

  const createQuickLinkContent = (
    <Form
      form={form}
      className={style.lw_user_login_loginform}
      name="createQuickLink"
      labelCol={{
        span: 12,
      }}
      wrapperCol={{
        span: 12,
      }}
      onFinish={onFinishQuickLink}
    >
      <Form.Item label="Link Name" name="name">
        <Input onChange={handleFormValueChange} />
      </Form.Item>
      <Form.Item
        label="Link"
        name="link"
        rules={[
          {
            required: true,
            message: "Please input link",
          },
        ]}
      >
        <Input onChange={handleFormValueChange} />
      </Form.Item>
      <Form.Item
        label="Order"
        name="order"
        rules={[
          {
            required: true,
            message: "Please input a number for order, default is 0.",
          },
        ]}
      >
        <InputNumber onChange={handleFormValueChange} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 22,
        }}
        shouldUpdate
      >
        {() => (
          <>
            <Button
              type="default"
              className={style.lw_user_reviewuser_action_buttons}
              onClick={() => handleQuickLinkBtnOnClick("cancel")}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={style.lw_user_reviewuser_action_buttons}
              disabled={handleDisableCreateLinkSubmitBtn() || isUploading}
            >
              Submit
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );

  const changePasswordContent = (
    <Form
      form={form}
      className={style.lw_user_login_loginform}
      name="changePassword"
      labelCol={{
        span: 12,
      }}
      wrapperCol={{
        span: 12,
      }}
      onFinish={onFinishPassword}
    >
      <Form.Item
        label="Current Password"
        name="currentPassword"
        rules={[
          {
            required: true,
            message: "Please input current password",
          },
        ]}
      >
        <Input onChange={handleFormValueChange} type="password" />
      </Form.Item>
      <Form.Item
        label="New Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input new password",
          },
        ]}
      >
        <Input onChange={handleFormValueChange} type="password" />
      </Form.Item>
      <Form.Item
        label="Confirm New Password"
        name="passwordConfirmation"
        rules={[
          {
            required: true,
            message: "Please confirm new password",
          },
        ]}
      >
        <Input onChange={handleFormValueChange} type="password" />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 22,
        }}
        shouldUpdate
      >
        {() => (
          <>
            <Button
              type="default"
              className={style.lw_user_reviewuser_action_buttons}
              onClick={() => setOpenChangePassword(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={style.lw_user_reviewuser_action_buttons}
              disabled={handleDisableChangePasswordSubmitBtn() || isUploading}
            >
              Submit
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );

  return (
    <Descriptions
      bordered
      column={4}
      labelStyle={{
        color: globalStyleMatrix.COLORS.titleFontColor,
        fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeight,
      }}
      contentStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
    >
      <Descriptions.Item label="Username" span={4}>
        {userInfoData?.user?.username?.toString()}
      </Descriptions.Item>
      <Descriptions.Item label="E-Mail" span={4}>
        {userInfoData?.user?.email?.toString()}
      </Descriptions.Item>
      <Descriptions.Item label="Created At" span={4}>
        {userInfoData?.user?.createdAt?.toString().slice(0, 10)}
      </Descriptions.Item>
      <Descriptions.Item label="Updated At" span={4}>
        {userInfoData?.user?.updatedAt?.toString().slice(0, 10)}
      </Descriptions.Item>
      <Descriptions.Item label="Account Confirmation" span={4}>
        {userInfoData?.user?.confirmed ? "Yes" : "No"}
      </Descriptions.Item>
      <Descriptions.Item label="Account Status" span={4}>
        {userInfoData?.user?.blocked ? "Blocked" : "Normal"}
      </Descriptions.Item>
      {userInfoData?.user?.lastName && (
        <Descriptions.Item label="Last Name" span={4}>
          {userInfoData?.user?.lastName?.toString()}
        </Descriptions.Item>
      )}
      {userInfoData?.user?.firstName && (
        <Descriptions.Item label="First Name" span={4}>
          {userInfoData?.user?.firstName?.toString()}
        </Descriptions.Item>
      )}
      {userInfoData?.user?.phoneNumber && (
        <Descriptions.Item label="Phone Number" span={4}>
          {userInfoData?.user?.phoneNumber?.toString()}
        </Descriptions.Item>
      )}
      {userInfoData?.user?.description && (
        <Descriptions.Item label="Description" span={4}>
          {userInfoData?.user?.description?.toString()}
        </Descriptions.Item>
      )}
      {quickLinkData.data.length !== 0 && (
        <Descriptions.Item label="Quick Links" span={4}>
          <List
            dataSource={quickLinkData.data}
            renderItem={(item) => (
              <List.Item>
                {item.id !== editItemId && (
                  <>
                    <span>{`${item.attributes.order}. ${
                      item.attributes.name ? `${item.attributes.name}: ` : ""
                    }${item.attributes.link}`}</span>
                    <span>
                      <Button
                        type="text"
                        size="small"
                        onClick={() => {
                          handleQuickLinkBtnOnClick("edit", item);
                        }}
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title={`Confirm to delete this quick link?`}
                        placement="top"
                        onConfirm={() => {
                          handleQuickLinkBtnOnClick("delete", item);
                        }}
                        okText="Confirm"
                        cancelText="Cancel"
                        disabled={isUploading}
                      >
                        <Button type="text" size="small">
                          Delete
                        </Button>
                      </Popconfirm>
                    </span>
                  </>
                )}
                {item.id === editItemId && (
                  <Form name="editQuickLink">
                    <Form.Item label="Link Name" name="name">
                      <Input
                        onChange={(e) =>
                          handleEditQuickLinkOnChange("name", e.target.value)
                        }
                        defaultValue={item.attributes.name}
                        value={editItemName}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Link"
                      name="link"
                      rules={[
                        {
                          required: true,
                          message: "Please input link",
                        },
                      ]}
                    >
                      <Input
                        onChange={(e) =>
                          handleEditQuickLinkOnChange("link", e.target.value)
                        }
                        defaultValue={item.attributes.link}
                        value={editItemLink}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Order"
                      name="order"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input a number for order, default is 0.",
                        },
                      ]}
                    >
                      <InputNumber
                        onChange={(value) =>
                          handleEditQuickLinkOnChange("order", value)
                        }
                        defaultValue={item.attributes.order}
                        value={editItemOrder}
                      />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      {() => (
                        <>
                          <Button
                            className={style.lw_user_reviewuser_action_buttons}
                            type="default"
                            onClick={() => handleQuickLinkBtnOnClick("cancel")}
                          >
                            Cancel
                          </Button>
                          <Button
                            className={style.lw_user_reviewuser_action_buttons}
                            type="primary"
                            onClick={() => handleQuickLinkBtnOnClick("update")}
                            disabled={
                              (item.attributes.name.toString() ===
                                editItemName.toString() &&
                                item.attributes.link.toString() ===
                                  editItemLink.toString() &&
                                item.attributes.order.toString() ===
                                  editItemOrder.toString()) ||
                              isUploading ||
                              !editItemLink ||
                              !editItemOrder
                            }
                          >
                            Submit
                          </Button>
                        </>
                      )}
                    </Form.Item>
                  </Form>
                )}
              </List.Item>
            )}
          />
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Actions" span={4}>
        <Popover
          title="Create quick link"
          placement="bottom"
          trigger="click"
          content={createQuickLinkContent}
          open={openCreateQuickLink}
          onOpenChange={handleOpenCreateQuickLink}
        >
          <Button className={style.lw_user_reviewuser_action_buttons}>
            Create Quick Link
          </Button>
        </Popover>
        <Popover
          title="Input new password"
          placement="bottom"
          trigger="click"
          content={changePasswordContent}
          open={openChangePassword}
          onOpenChange={handleOpenChangePassword}
        >
          <Button className={style.lw_user_reviewuser_action_buttons}>
            Change Password
          </Button>
        </Popover>
        <Popconfirm
          description="Confirm to logout"
          placement="bottom"
          okText="Confirm"
          cancelText="Cancel"
          onConfirm={handleLogoutOnClick}
        >
          <Button className={style.lw_user_reviewuser_action_buttons}>
            Logout
          </Button>
        </Popconfirm>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default ReviewUser;
