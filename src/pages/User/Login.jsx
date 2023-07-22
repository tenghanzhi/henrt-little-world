import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Typography, Button, Form, Input } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import {
  SET_USER_INFO_DATA,
  SET_SHOW_HOME_CARD,
  SET_SHOW_HOME_DATE,
  SET_SHOW_HOME_SEARCH,
  SET_SHOW_HOME_LINK,
  SET_SHOW_HOME_MENU,
  SET_SHOW_HOME_QUICK_LINK,
  SET_SHOW_HOME_FOOTER,
} from "../../redux/constants";
import handleMessage from "../utils/handleMessage";
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
    const messageAction = isSignup ? setIsSignup(false) : handleGoback();

    const signupData = {
      email: values.email,
      password: values.password,
      username: values.username,
      lastName: values.lastName ? values.lastName : null,
      firstName: values.firstName ? values.firstName : null,
      phoneNumber: values.phoneNumber ? values.phoneNumber : null,
      description: values.description ? values.description : null,
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
              messageMatrix.USER_MESSAGE_CREATING_SUCCESS,
              messageAction
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
            dispatch({ type: SET_SHOW_HOME_CARD, payload: true });
            dispatch({ type: SET_SHOW_HOME_DATE, payload: true });
            dispatch({ type: SET_SHOW_HOME_SEARCH, payload: true });
            dispatch({ type: SET_SHOW_HOME_LINK, payload: true });
            dispatch({ type: SET_SHOW_HOME_MENU, payload: true });
            dispatch({ type: SET_SHOW_HOME_QUICK_LINK, payload: true });
            dispatch({ type: SET_SHOW_HOME_FOOTER, payload: true });
            handleMessage(
              messageKey,
              "success",
              messageMatrix.USER_MESSAGE_LOGIN_SUCCESS,
              messageAction
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
    <div className={style.lw_login_wrapper}>
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
        {isSignup && (
          <>
            <Form.Item label="Last Name" name="lastName">
              <Input onChange={handleFormValueChange} />
            </Form.Item>
            <Form.Item label="First Name" name="firstName">
              <Input onChange={handleFormValueChange} />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input onChange={handleFormValueChange} />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea onChange={handleFormValueChange} rows={6} />
            </Form.Item>
          </>
        )}
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
    </div>
  );
};

export default Login;
