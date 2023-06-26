import React, { useState } from "react";
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
} from "antd";
import globalStyleMatrix from "../common/globalStyleMatrix";
import categoryMatrix from "../common/categoryMatrix";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import { SET_USER_INFO_DATA } from "../../redux/constants";
import style from "./style/ReviewUser.module.css";

const ReviewUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filedValue, setFiledValue] = useState(form.getFieldValue());
  const userInfoData = useSelector((state) => state.userInfoData);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleSubmitForm = (values) => {
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

  const onFinish = (values) => {
    handleSubmitForm(values);
  };

  const handleLogoutOnClick = () => {
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

  const handleOpenChangePassword = (newOpen) => {
    setOpenChangePassword(newOpen);
  };

  const handleDisableSubmitBtn = () => {
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
      onFinish={onFinish}
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
              htmlType="submit"
              className={style.lw_user_reviewuser_action_buttons}
              onClick={() => setOpenChangePassword(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className={style.lw_user_reviewuser_action_buttons}
              disabled={handleDisableSubmitBtn() || isUploading}
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
      column={6}
      labelStyle={{
        color: globalStyleMatrix.COLORS.titleFontColor,
        fontWeight: globalStyleMatrix.FONT_WEIGHT.titleFontWeight,
      }}
      contentStyle={{ color: globalStyleMatrix.COLORS.mainFontColor }}
    >
      <Descriptions.Item label="Username" span={3}>
        {userInfoData?.user?.username?.toString()}
      </Descriptions.Item>
      <Descriptions.Item label="E-Mail" span={3}>
        {userInfoData?.user?.email?.toString()}
      </Descriptions.Item>
      <Descriptions.Item label="Created At" span={3}>
        {userInfoData?.user?.createdAt?.toString().slice(0, 10)}
      </Descriptions.Item>
      <Descriptions.Item label="Updated At" span={3}>
        {userInfoData?.user?.updatedAt?.toString().slice(0, 10)}
      </Descriptions.Item>
      <Descriptions.Item label="Account Confirmation" span={3}>
        {userInfoData?.user?.confirmed ? "Yes" : "No"}
      </Descriptions.Item>
      <Descriptions.Item label="Account Status" span={3}>
        {userInfoData?.user?.blocked ? "Blocked" : "Normal"}
      </Descriptions.Item>
      <Descriptions.Item label="Actions" span={6}>
        <Popover
          placement="bottom"
          content={changePasswordContent}
          title="Input new password."
          trigger="click"
          open={openChangePassword}
          onOpenChange={handleOpenChangePassword}
        >
          <Button className={style.lw_user_reviewuser_action_buttons}>
            Change Password
          </Button>
        </Popover>
        <Popconfirm
          description="Are you sure to logout?"
          placement="bottom"
          onConfirm={handleLogoutOnClick}
          okText="Confirm"
          cancelText="Cancel"
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
