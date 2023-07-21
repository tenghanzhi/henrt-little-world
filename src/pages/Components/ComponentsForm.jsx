import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Button, Form, Input, Select, Popconfirm } from "antd";
import {
  RollbackOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import validateMessages from "../common/validateMessages";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { html } from "@codemirror/lang-html";
import style from "./style/ComponentsForm.module.css";

const ComponentsForm = (props) => {
  const pageType = props.isEdit && props.isEdit !== "" ? "edit" : "create";
  const defaultData = props.data && props.data !== {} ? props.data : {};
  const userInfoData = useSelector((state) => state.userInfoData);
  const selectedComponentId = useSelector((state) => state.selectedComponentId);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [filedValue, setFiledValue] = useState(form.getFieldValue());
  const [cssCode, setCssCode] = useState(
    pageType === "edit" ? defaultData.cssCode : null
  );
  const [htmlCode, setHtmlCode] = useState(
    pageType === "edit" ? defaultData.htmlCode : null
  );
  const [jsCode, setJsCode] = useState(
    pageType === "edit" ? defaultData.jsCode : null
  );
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
              navigate(`/${categoryMatrix.COMPONENTS.toLowerCase()}`);
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

  const handleFormValueChange = (type, value) => {
    switch (type) {
      case (type = "setCssCode"):
        setCssCode(value);
        setFiledValue(form.getFieldValue());
        break;
      case (type = "setHtmlCode"):
        setHtmlCode(value);
        setFiledValue(form.getFieldValue());
        break;
      case (type = "setJsCode"):
        setJsCode(value);
        setFiledValue(form.getFieldValue());
        break;
      default:
        setFiledValue(form.getFieldValue());
        break;
    }
  };

  const handleSubmitApplication = (type, values) => {
    const messageKey = "uploadingDataMessage";
    handleMessage(
      messageKey,
      "loading",
      messageMatrix.UPLOAD_UPDATED_DATA_MESSAGE_LOADING
    );

    values.data.cssCode = cssCode?.toString();
    values.data.htmlCode = htmlCode?.toString();
    values.data.jsCode = jsCode?.toString();

    if (type.toLowerCase() === "create") {
      (async () => {
        const response = await fetch(apiMatrix.COMPONENTS_CREATE_NEW, {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(values),
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
          `${apiMatrix.COMPONENTS_UPDATE_BY_ID}/${selectedComponentId}`,
          {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(values),
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
    handleSubmitApplication(pageType, values);
  };

  const handleDelete = () => {
    const messageKey = "deleteDataMessage";
    handleMessage(
      messageKey,
      "loading",
      messageMatrix.DELETING_MESSAGE_LOADING
    );
    setIsUploading(true);

    (async () => {
      const response = await fetch(
        `${apiMatrix.COMPONENTS_DELETE_BY_ID}/${selectedComponentId}`,
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
      filedValue.data?.hasOwnProperty("codeType") &&
      filedValue.data?.hasOwnProperty("componentType");

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

  const codeTypeOptions = [
    {
      label: "Vanilla",
      value: "Vanilla",
    },
    {
      label: "React",
      value: "React",
    },
  ];

  const componentTypeOptions = [
    {
      label: "Creativity",
      value: "Creativity",
    },
    {
      label: "Buttons",
      value: "Buttons",
    },
    {
      label: "Checkboxes",
      value: "Checkboxes",
    },
    {
      label: "Toggle Switches",
      value: "Toggle Switches",
    },
    {
      label: "Cards",
      value: "Cards",
    },
    {
      label: "Loaders",
      value: "Loaders",
    },
    {
      label: "Inputs",
      value: "Inputs",
    },
    {
      label: "Radio Buttons",
      value: "Radio Buttons",
    },
    {
      label: "Forms",
      value: "Forms",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];

  const HTML_CODE_PREFIX = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
  </head>
  <body>
    
  </body>
</html>`;

  const REACT_CODE_PREFIX = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
  </head>
  <body>
    <div id="react-component"></div>
    <script type="text/javascript" src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script type="text/javascript" src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script type="text/javascript" src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">

    //Class Component
    Class MyComponent extends React.Component {

			render(){
				return <h2>Class Component</h2>
			}
		}

		ReactDOM.render(<MyComponent/>,document.getElementById('react-component'))

    //Functional Component
    function MyComponent(){
			
		return <h2>Functional Component</h2>}
    ReactDOM.render(<MyComponent/>,document.getElementById('react-component'))
    </script>
  </body>
</html>`;
  return (
    <Form
      {...formLayout}
      className={style.lw_components_wrapper}
      name="components"
      form={form}
      onFinish={onFinish}
      validateMessages={validateMessages}
      initialValues={
        pageType === "edit"
          ? {
              data: {
                name: defaultData.name,
                codeType: defaultData.codeType,
                componentType: defaultData.componentType,
                source: defaultData.source,
              },
            }
          : {}
      }
    >
      <Form.Item
        name={["data", "name"]}
        label="Component Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input {...formProps} placeholder="Input Component Name" />
      </Form.Item>
      <Form.Item
        name={["data", "codeType"]}
        label="Code Type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          {...formProps}
          placeholder="Select a Type"
          showSearch
          options={codeTypeOptions.sort((a, b) =>
            a.value > b.value ? 1 : b.value > a.value ? -1 : 0
          )}
        />
      </Form.Item>
      <Form.Item
        name={["data", "componentType"]}
        label="Component Type"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          {...formProps}
          placeholder="Select a Type"
          showSearch
          options={componentTypeOptions.sort((a, b) =>
            a.value > b.value ? 1 : b.value > a.value ? -1 : 0
          )}
        />
      </Form.Item>
      <Form.Item name={["data", "source"]} label="Source">
        <Input {...formProps} placeholder="Input Component Source" />
      </Form.Item>
      <Form.Item name={["data", "htmlCode"]} label="HTML Code">
        <div className={style.lw_components_form_codemirror_wrapper}>
          <CodeMirror
            {...formProps}
            height="600px"
            extensions={[html(), EditorView.lineWrapping]}
            value={
              pageType === "edit"
                ? defaultData.htmlCode?.toString()
                : form.getFieldValue()?.data?.codeType
                ? form.getFieldValue()?.data?.codeType === "Vanilla"
                  ? HTML_CODE_PREFIX
                  : REACT_CODE_PREFIX
                : ""
            }
            onChange={(e) => handleFormValueChange("setHtmlCode", e)}
            theme={vscodeDark}
          />
        </div>
      </Form.Item>
      <Form.Item name={["data", "cssCode"]} label="CSS Code">
        <div className={style.lw_components_form_codemirror_wrapper}>
          <CodeMirror
            {...formProps}
            height="600px"
            extensions={[html(), EditorView.lineWrapping]}
            value={defaultData.cssCode?.toString()}
            onChange={(e) => handleFormValueChange("setCssCode", e)}
            theme={vscodeDark}
          />
        </div>
      </Form.Item>
      <Form.Item name={["data", "codeThree"]} label="JS Code">
        <div className={style.lw_components_form_codemirror_wrapper}>
          <CodeMirror
            {...formProps}
            height="600px"
            extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
            value={defaultData.jsCode?.toString()}
            onChange={(e) => handleFormValueChange("setJsCode", e)}
            theme={vscodeDark}
          />
        </div>
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <div className={style.lw_components_form_btns_wrapper}>
            <Button
              className={style.lw_components_form_btns}
              type="default"
              onClick={handleGoback}
              icon={<RollbackOutlined />}
            >
              Cancel
            </Button>
            {pageType === "edit" && userInfoData.jwt && (
              <Popconfirm
                title={`Confirm to delete ${defaultData.title}`}
                className={style.lw_components_form_btns}
                placement="top"
                onConfirm={handleDelete}
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
              className={style.lw_components_form_btns}
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

export default ComponentsForm;
