import React from "react";
import { Button, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import messageMatrix from "../common/messageMatrix";
import handleMessage from "../utils/handleMessage";

const CopyButton = (props) => {
  const { data } = props;

  const handleCopyToClipboard = () => {
    const messageKey = "copyMessage";
    if (data) {
      navigator.clipboard.writeText(data);
      handleMessage(
        messageKey,
        "success",
        `${messageMatrix.COPIED_DATA_MESSAGE_SUCCESS}`
      );
    } else
      handleMessage(
        messageKey,
        "error",
        `${messageMatrix.COPIED_DATA_MESSAGE_ERROR}`
      );
  };

  return (
    <Tooltip title="Copy to Clipbord">
      <Button
        onClick={handleCopyToClipboard}
        icon={<CopyOutlined />}
        size="small"
        type="text"
        style={{ margin: 5 }}
      />
    </Tooltip>
  );
};

export default CopyButton;
