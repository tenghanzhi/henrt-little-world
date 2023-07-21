import React from "react";
import { Button, Tooltip } from "antd";
import { LinkOutlined } from "@ant-design/icons";

const OpenLinkButton = (props) => {
  const { link } = props;

  const handleOpenLink = () => {
    if (link) {
      window.open(link.toString(), "_blank", "noopener, noreferrer");
    } else return null;
  };

  return (
    <Tooltip title="Open Link" >
      <Button
        onClick={handleOpenLink}
        icon={<LinkOutlined />}
        size="small"
        type="text"
        style={{ margin: 5}}
      />
    </Tooltip>
  );
};

export default OpenLinkButton;
