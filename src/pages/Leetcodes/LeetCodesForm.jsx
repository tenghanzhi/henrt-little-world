import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  message,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Popconfirm,
} from "antd";
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
import dayjs from "dayjs";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import style from "./style/LeetCodesForm.module.css";

const LeetCodesForm = (props) => {
  const pageType = props.isEdit && props.isEdit !== "" ? "edit" : "create";
  const defaultData = props.data && props.data !== {} ? props.data : {};
  const selectedLeetcodeId = useSelector((state) => state.selectedLeetcodeId);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filedValue, setFiledValue] = useState(form.getFieldValue());
  const [solutionOne, setSolutionOne] = useState(
    pageType === "edit" ? defaultData.solutionOne : null
  );
  const [solutionTwo, setSolutionTwo] = useState(
    pageType === "edit" ? defaultData.solutionTwo : null
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
              navigate(`/${categoryMatrix.LEETCODES.toLowerCase()}`);
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
      case (type = "solutionOne"):
        setSolutionOne(value);
        setFiledValue(form.getFieldValue());
        break;
      case (type = "solutionTwo"):
        setSolutionTwo(value);
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

    values.data.solutionOne = solutionOne?.toString();
    values.data.solutionTwo = solutionTwo?.toString();
    values.data.type = values.data.type.toString();

    if (type.toLowerCase() === "create") {
      (async () => {
        const response = await fetch(apiMatrix.LEET_CODES_CREATE_NEW, {
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
          `${apiMatrix.LEET_CODES_UPDATE_BY_ID}/${selectedLeetcodeId}`,
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
        `${apiMatrix.LEET_CODES_DELETE_BY_ID}/${selectedLeetcodeId}`,
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
      filedValue.data?.hasOwnProperty("difficulty") &&
      filedValue.data?.hasOwnProperty("firstCompletedDate") &&
      filedValue.data?.hasOwnProperty("leetcodeIndex") &&
      filedValue.data?.hasOwnProperty("link") &&
      filedValue.data?.hasOwnProperty("title") &&
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

  const difficultyOptions = [
    {
      label: "Easy",
      value: "Easy",
    },
    {
      label: "Medium",
      value: "Medium",
    },
    {
      label: "Hard",
      value: "Hard",
    },
  ];

  const typeOptions = [
    {
      label: "Array",
      value: "Array",
    },
    {
      label: "Hash Table",
      value: "Hash Table",
    },
    {
      label: "Linked List",
      value: "Linked List",
    },
    {
      label: "Math",
      value: "Math",
    },
    {
      label: "Recursion",
      value: "Recursion",
    },
    {
      label: "Stack",
      value: "Stack",
    },
    {
      label: "Sorting",
      value: "Sorting",
    },
    {
      label: "String",
      value: "String",
    },
    {
      label: "Tree",
      value: "Tree",
    },
    {
      label: "Sliding Window",
      value: "Sliding Window",
    },
    {
      label: "Divide and Conquer",
      value: "Divide and Conquer",
    },
    {
      label: "Heap",
      value: "Heap",
    },
    {
      label: "Bucket Sort",
      value: "Bucket Sort",
    },
    {
      label: "Counting",
      value: "Counting",
    },
    {
      label: "Quickselect",
      value: "Quickselect",
    },
  ];

  return (
    <Form
      {...formLayout}
      name="leetcode"
      form={form}
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={
        pageType === "edit"
          ? {
              data: {
                leetcodeIndex: defaultData.leetcodeIndex,
                title: defaultData.title,
                difficulty: defaultData.difficulty,
                firstCompletedDate: dayjs(defaultData.firstCompletedDate),
                type: defaultData.type,
                link: defaultData.link,
                issue: defaultData.issue,
              },
            }
          : {}
      }
      shouldUpdate
    >
      <Form.Item
        name={["data", "leetcodeIndex"]}
        label="LeetCode Index"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber {...formProps} />
      </Form.Item>
      <Form.Item
        name={["data", "title"]}
        label="Title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input {...formProps} placeholder="Input Problem Title" />
      </Form.Item>
      <Form.Item
        name={["data", "difficulty"]}
        label="Difficulty"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          {...formProps}
          placeholder="Select a Difficulty"
          options={difficultyOptions}
        />
      </Form.Item>
      <Form.Item
        name={["data", "firstCompletedDate"]}
        label="First Completed Date"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker {...formProps} format="YYYY-MM-DD" />
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
          placeholder="Select Problem Type"
          options={typeOptions.sort((a, b) =>
            a.value > b.value ? 1 : b.value > a.value ? -1 : 0
          )}
          mode="multiple"
          showSearch
        />
      </Form.Item>
      <Form.Item
        name={["data", "link"]}
        label="LeetCode Link"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input {...formProps} placeholder="Input LeetCode Link" />
      </Form.Item>
      <Form.Item name={["data", "issue"]} label="Problem Content">
        <Input.TextArea
          {...formProps}
          placeholder="Input Problem Content"
          rows={8}
        />
      </Form.Item>
      <Form.Item name={["data", "solutionOne"]} label="Problem Solution One">
        <div className={style.lw_leetcodes_form_codemirror_wrapper}>
          <CodeMirror
            height="600px"
            extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
            value={defaultData.solutionOne?.toString()}
            onChange={(e) => handleFormValueChange("solutionOne", e)}
            theme={vscodeDark}
          />
        </div>
      </Form.Item>
      <Form.Item name={["data", "solutionTwo"]} label="Problem Solution Two">
        <div className={style.lw_leetcodes_form_codemirror_wrapper}>
          <CodeMirror
            {...formProps}
            height="600px"
            extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
            value={defaultData.solutionTwo?.toString()}
            onChange={(e) => handleFormValueChange("solutionTwo", e)}
            theme={vscodeDark}
          />
        </div>
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <div className={style.lw_leetcodes_form_btns_wrapper}>
            <Button
              className={style.lw_leetcodes_form_btns}
              type="default"
              onClick={handleGoback}
              icon={<RollbackOutlined />}
            >
              Cancel
            </Button>
            {pageType === "edit" && (
              <Popconfirm
                title={"Please input password to delete."}
                className={style.lw_leetcodes_form_btns}
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
              className={style.lw_leetcodes_form_btns}
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

export default LeetCodesForm;
