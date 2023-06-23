import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Button, Form, Input, Select, Popconfirm } from "antd";
import {
  RollbackOutlined,
  DeleteOutlined,
  CheckOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import validateMessages from "../common/validateMessages";
import password from "../common/password";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { markdown } from "@codemirror/lang-markdown";
import style from "./style/FavoriteForm.module.css";

const FavoritesForm = (props) => {
  const pageType = props.isEdit && props.isEdit !== "" ? "edit" : "create";
  const defaultData = props.data && props.data !== {} ? props.data : {};
  const selectedFavoriteId = useSelector((state) => state.selectedFavoriteId);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filedValue, setFiledValue] = useState(form.getFieldValue());
  const [description, setDescription] = useState(
    pageType === "edit" ? defaultData.description : null
  );
  const [inputDeletePassword, setInputDeletePassword] = useState(null);
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
          onClose: () => {
            if (key === "uploadingDataMessage") {
              handleGoback();
            } else if (key === "deleteDataMessage") {
              navigate(`/${categoryMatrix.FAVORITES.toLowerCase()}`);
            } else return null;
          },
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

  const handleDeletePasswordValueChange = (e) => {
    setInputDeletePassword(e.target.value);
  };

  const handleConfirmDeletePassword = () => {
    const messageKey = "passwordResult";

    if (inputDeletePassword !== null && inputDeletePassword === password) {
      handleMessage(
        messageKey,
        "success",
        messageMatrix.PASSWORD_RESULT_SCCESS
      );
      setIsUploading(true);
      handleDelete();
    } else {
      handleMessage(messageKey, "error", messageMatrix.PASSWORD_RESULT_ERROR);
      setInputDeletePassword(null);
    }
  };

  const handleCancelPassword = () => {
    setInputDeletePassword(null);
  };

  const handleFormValueChange = (type, value) => {
    switch (type) {
      case (type = "description"):
        setDescription(value);
        setFiledValue(form.getFieldValue());
        break;
      default:
        setFiledValue(form.getFieldValue());
        break;
    }
  };

  const handleSubmitLeetcode = (type, values) => {
    const messageKey = "uploadingDataMessage";
    handleMessage(
      messageKey,
      "loading",
      messageMatrix.UPLOAD_UPDATED_DATA_MESSAGE_LOADING
    );

    values.data.description = description?.toString();

    if (type.toLowerCase() === "create") {
      (async () => {
        const response = await fetch(apiMatrix.FAVORITE_CREATE_NEW, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(values),
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
              messageMatrix.UPLOAD_UPDATED_DATA_MESSAGE_SUCCESS
            );
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
          `${apiMatrix.FAVORITE_UPDATE_BY_ID}/${selectedFavoriteId}`,
          {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
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

  const onFinish = (values) => {
    setIsUploading(true);
    handleSubmitLeetcode(pageType, values);
  };

  const handleDelete = () => {
    const messageKey = "deleteDataMessage";
    handleMessage(
      messageKey,
      "loading",
      messageMatrix.DELETING_MESSAGE_LOADING
    );

    (async () => {
      const response = await fetch(
        `${apiMatrix.FAVORITE_DELETE_BY_ID}/${selectedFavoriteId}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
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

  const handleDisableSubmitBtn = () => {
    let isHasError = false;

    if (!!form.getFieldsError().filter(({ errors }) => errors.length).length) {
      isHasError = true;
    } else isHasError = false;

    const isAllRequiredFiled =
      filedValue.data !== {} &&
      filedValue.data?.hasOwnProperty("name") &&
      filedValue.data?.hasOwnProperty("type");

    return isHasError || !isAllRequiredFiled;
  };

  const formLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const formProps = {
    allowClear: true,
    onChange: handleFormValueChange,
  };

  const typeOptions = [
    {
      label: "H5C3",
      value: "H5C3",
    },
    {
      label: "Note",
      value: "Note",
    },
    {
      label: "Package",
      value: "Package",
    },
    {
      label: "Resource",
      value: "Resource",
    },
    {
      label: "Utils",
      value: "Utils",
    },
    {
      label: "VISA",
      value: "VISA",
    },
  ];

  return (
    <Form
      {...formLayout}
      name="favorite"
      form={form}
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={
        pageType === "edit"
          ? {
              data: {
                name: defaultData.name,
                type: defaultData.type,
                link: defaultData.link,
              },
            }
          : {}
      }
      shouldUpdate
    >
      <Form.Item
        name={["data", "name"]}
        label="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input {...formProps} placeholder="Input Favorite Nam" />
      </Form.Item>
      <Form.Item
        name={["data", "type"]}
        label="Type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          {...formProps}
          placeholder="Select a type"
          options={typeOptions}
        />
      </Form.Item>
      <Form.Item name={["data", "link"]} label="Source Link">
        <Input {...formProps} placeholder="Input Source Link" />
      </Form.Item>

      <Form.Item name={["data", "solutionOne"]} label="Description">
        <div className={style.lw_favorites_form_codemirror_wrapper}>
          <CodeMirror
            height="600px"
            extensions={[markdown(), EditorView.lineWrapping]}
            value={defaultData.description?.toString()}
            onChange={(e) => handleFormValueChange("description", e)}
          />
        </div>
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <div className={style.lw_favorites_form_btns_wrapper}>
            <Button
              className={style.lw_favorites_form_btns}
              type="default"
              onClick={handleGoback}
              icon={<RollbackOutlined />}
            >
              Cancel
            </Button>
            {pageType === "edit" && (
              <Popconfirm
                title={"Please input password to delete."}
                className={style.lw_favorites_form_btns}
                placement="top"
                description={
                  <>
                    <Input.Password
                      placeholder="Input password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      onChange={(e) => handleDeletePasswordValueChange(e)}
                      allowClear={true}
                      value={inputDeletePassword}
                      onPressEnter={handleConfirmDeletePassword}
                    />
                  </>
                }
                onConfirm={handleConfirmDeletePassword}
                onCancel={handleCancelPassword}
                okText="Confirm"
                cancelText="Cancel"
              >
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  disabled={isUploading}
                >
                  Delete
                </Button>
              </Popconfirm>
            )}
            <Button
              className={style.lw_favorites_form_btns}
              type="primary"
              htmlType="submit"
              disabled={handleDisableSubmitBtn() || isUploading}
              icon={<CheckOutlined />}
            >
              Submit
            </Button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};

export default FavoritesForm;
