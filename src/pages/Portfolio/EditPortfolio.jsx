import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message, Skeleton, Typography, Button, Form, Input } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import LwLayout from "../common/LwLayout";
import structuredClone from "@ungap/structured-clone";
import sortObjByKey from "../utils/sortObjByKey";
import style from "./style/EditPortfolio.module.css";

const EditPortfolio = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const editPortfolioId = useSelector((state) => state.editPortfolioId);
  const [isEditPageLoading, setIsEditPageLoading] = useState(true);
  const [fetchedPortfolioData, setFetchedPortfolioData] = useState({});
  const [filedValue, setFiledValue] = useState(form.getFieldValue());

  useEffect(() => {
    handleGetPortfolioDataById();
    handleDisableSubmitBtn();
  }, []);
  console.log(fetchedPortfolioData);
  const handleGoback = () => {
    navigate(-1);
  };

  const handleMessage = (type, key, content) => {
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

  const handleGetPortfolioDataById = () => {
    const messageKey = "editPageLoadingMessage";
    handleMessage("loading", messageKey, messageMatrix.LOADING_MESSAGE_LOADING);

    (async () => {
      const response = await fetch(apiMatrix.GET_BY_ID + editPortfolioId);
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          handleMessage(
            "success",
            messageKey,
            messageMatrix.LOADING_MESSAGE_SUCCESS
          );
        }
        setFetchedPortfolioData(response.data.attributes);
      })
      .catch((error) => {
        handleMessage(
          "error",
          messageKey,
          messageMatrix.LOADING_MESSAGE_ERROR + error
        );
      })
      .finally(() => {
        setIsEditPageLoading(false);
      });
  };

  const handleUpdatePortfolio = (values) => {
    const messageKey = "uploadingDataMessage";
    handleMessage(
      "loading",
      messageKey,
      messageMatrix.UPLOAD_UPDATED_DATA_MESSAGE_LOADING
    );

    (async () => {
      const response = await fetch(apiMatrix.UPDATE_BY_ID + editPortfolioId, {
        method: "PUT",
        mode: "cors",
        body: JSON.stringify(values),
        // body: { ddd: "aaa" },
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
            "success",
            messageKey,
            messageMatrix.UPLOAD_UPDATED_DATA_MESSAGE_SUCCESS
          );
        }
      })
      .catch((error) => {
        handleMessage(
          "error",
          messageKey,
          messageMatrix.UPLOAD_UPDATED_DATA_MESSAGE_ERROR + error
        );
      })
  };

  const handleFormValueChange = () => {
    setFiledValue(form.getFieldValue());
  };

  const formLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const formProps = {
    allowClear: true,
    autoSize: true,
    onChange: handleFormValueChange,
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (values) => {
    handleUpdatePortfolio(values);
  };

  const handleDisableSubmitBtn = () => {
    let isValueSame = true;
    let isHasError = false;

    if (filedValue.data) {
      const formValue = filedValue.data;
      const clonedPortfilioData = structuredClone(fetchedPortfolioData);
      delete clonedPortfilioData.createdAt;
      delete clonedPortfilioData.updatedAt;
      isValueSame =
        JSON.stringify(sortObjByKey(formValue)) ===
        JSON.stringify(sortObjByKey(clonedPortfilioData));
    } else isValueSame = true;

    if (!!form.getFieldsError().filter(({ errors }) => errors.length).length) {
      isHasError = true;
    } else isHasError = false;

    return isValueSame || isHasError;
  };

  const loadedPageContent = (
    <>
      <Typography.Title level={4}>
        Update Experience on {fetchedPortfolioData.name}
      </Typography.Title>
      <Form
        {...formLayout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 1200,
        }}
        validateMessages={validateMessages}
        initialValues={{
          data: {
            name: fetchedPortfolioData.name,
            jobTitle: fetchedPortfolioData.jobTitle,
            projectName: fetchedPortfolioData.projectName,
            period: fetchedPortfolioData.period,
            location: fetchedPortfolioData.location,
            keySkills: fetchedPortfolioData.keySkills,
            description: fetchedPortfolioData.description,
            jobContent: fetchedPortfolioData.jobContent,
            icon: fetchedPortfolioData.icon,
          },
        }}
        form={form}
        shouldUpdate
      >
        <Form.Item
          name={["data", "name"]}
          label="Company Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input {...formProps} placeholder="Input Company Name" />
        </Form.Item>
        <Form.Item name={["data", "icon"]} label="Company Icon's Link">
          <Input.TextArea {...formProps} placeholder="Company Icon's Link" />
        </Form.Item>
        <Form.Item
          name={["data", "jobTitle"]}
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input {...formProps} placeholder="Input Title" />
        </Form.Item>
        <Form.Item name={["data", "projectName"]} label="Project name">
          <Input.TextArea {...formProps} placeholder="Input Project name" />
        </Form.Item>
        <Form.Item
          name={["data", "period"]}
          label="Period"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input {...formProps} placeholder="Input Period" />
        </Form.Item>
        <Form.Item
          name={["data", "location"]}
          label="Location"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input {...formProps} placeholder="Input Location" />
        </Form.Item>
        <Form.Item
          name={["data", "keySkills"]}
          label="Key Skills"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea {...formProps} placeholder="Input Key Skills" />
        </Form.Item>
        <Form.Item name={["data", "description"]} label="Project Description">
          <Input.TextArea
            {...formProps}
            placeholder="Input Project Description"
          />
        </Form.Item>
        <Form.Item
          name={["data", "jobContent"]}
          label="Job Content"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea {...formProps} placeholder="Input Job Content" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <div className={style.lw_edit_protfolio_btns_wrapper}>
              <Button
                className={style.lw_edit_protfolio_btns}
                type="default"
                onClick={handleGoback}
              >
                Cancel
              </Button>
              <Button
                className={style.lw_edit_protfolio_btns}
                type="primary"
                htmlType="submit"
                disabled={handleDisableSubmitBtn()}
              >
                Submit
              </Button>
            </div>
          )}
        </Form.Item>
      </Form>
    </>
  );

  const loadingPageContent = <Skeleton />;

  const pageContent = isEditPageLoading
    ? loadingPageContent
    : loadedPageContent;

  return (
    <>
      <LwLayout content={pageContent} />
    </>
  );
};

export default EditPortfolio;
