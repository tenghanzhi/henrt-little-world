import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, Button, Form, Input, message } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import { SET_USER_INFO_DATA } from "../../redux/constants";
import style from "./style/Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filedValue, setFiledValue] = useState(form.getFieldValue());
  const [isSignup, setIsSignup] = useState(false);
  const [loginMethod, setLoginMethod] = useState("username");
  const [isUploading, setIsUploading] = useState(false);

  const handleGoback = () => {
    navigate(-1);
  };

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
          onClose: isSignup ? setIsSignup(false) : handleGoback(),
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

  const handleSignupLoginBtnOnClick = () => {
    setIsSignup((prevState) => !prevState);
    setLoginMethod("username");
  };

  const handleLoginMethodBtnOnClick = () => {
    setLoginMethod((prevState) =>
      prevState === "username" ? "email" : "username"
    );
  };

  const handleSubmitForm = (values) => {
    const messageKey = "submittingForm";

    const signupData = {
      email: values.email,
      password: values.password,
      username: values.username,
    };

    const loginData =
      loginMethod === "username"
        ? {
            identifier: values.username,
            password: values.password,
          }
        : {
            identifier: values.email,
            password: values.password,
          };

    if (isSignup) {
      handleMessage(messageKey, "loading", messageMatrix.USER_MESSAGE_CREATING);
      (async () => {
        const response = await fetch(apiMatrix.USER_REGISTER, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(signupData),
          headers: {
            "Content-Type": "application/json",
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
    } else {
      handleMessage(messageKey, "loading", messageMatrix.USER_MESSAGE_LOGIN);
      (async () => {
        const response = await fetch(`${apiMatrix.USER_LOGIN}`, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(loginData),
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.json();
      })()
        .then((response) => {
          if (response && response.error) {
            throw new Error(response.error.message);
          } else {
            dispatch({
              type: SET_USER_INFO_DATA,
              payload: response,
            });
            handleMessage(
              messageKey,
              "success",
              messageMatrix.USER_MESSAGE_LOGIN_SUCCESS
            );
          }
        })
        .catch((error) => {
          handleMessage(messageKey, "error", `${error}`);
          setIsUploading(false);
        });
    }
  };

  const onFinish = (values) => {
    handleSubmitForm(values);
  };

  const handleDisableSubmitBtn = () => {
    let isHasError = false;

    if (!!form.getFieldsError().filter(({ errors }) => errors.length).length) {
      isHasError = true;
    } else isHasError = false;

    const isAllLoginRequiredFiled =
      (filedValue?.hasOwnProperty("username") ||
        filedValue?.hasOwnProperty("email")) &&
      filedValue?.hasOwnProperty("password");

    const isAllSignupRequiredFiled =
      filedValue?.hasOwnProperty("username") &&
      filedValue?.hasOwnProperty("email") &&
      filedValue?.hasOwnProperty("password");

    return (
      isHasError ||
      (isSignup && !isAllSignupRequiredFiled) ||
      (!isSignup && !isAllLoginRequiredFiled)
    );
  };

  return (
    <>
      <Typography.Title level={5} className={style.lw_login_header}>
        {isSignup ? "Create New User" : "Login to Henry's Little World"}
      </Typography.Title>
      <Form
        form={form}
        className={style.lw_user_login_loginform}
        name="userInfo"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        onFinish={onFinish}
        shouldUpdate
      >
        <Form.Item
          label={loginMethod === "username" ? "Username" : "E-Mail"}
          name={loginMethod === "username" ? "username" : "email"}
          rules={[
            {
              required: true,
              message: "Please input username!",
            },
          ]}
        >
          <Input onChange={handleFormValueChange} />
        </Form.Item>
        {isSignup && (
          <Form.Item
            label="E-Mail"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input onChange={handleFormValueChange} />
          </Form.Item>
        )}
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input password!",
            },
          ]}
        >
          <Input.Password onChange={handleFormValueChange} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: isSignup ? 8 : 7,
            span: 16,
          }}
        >
          {!isSignup && (
            <Button type="text" onClick={handleLoginMethodBtnOnClick}>
              {loginMethod === "username"
                ? "Forget Username? Login with E-Mail."
                : "Forget E-Mail? Login with Username."}
            </Button>
          )}
          <Button
            type="text"
            className={style.lw_user_login_loginform_signuplogin_button}
            onClick={handleSignupLoginBtnOnClick}
          >
            {isSignup
              ? "Already had account? Login!"
              : "Don't have account? Create a new one!"}
          </Button>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 9,
            span: 16,
          }}
          shouldUpdate
        >
          {() => (
            <>
              <Button
                type="default"
                htmlType="submit"
                className={style.lw_user_login_loginform_buttons}
                onClick={handleGoback}
              >
                Back
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className={style.lw_user_login_loginform_buttons}
                disabled={handleDisableSubmitBtn() || isUploading}
              >
                Submit
              </Button>
            </>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
