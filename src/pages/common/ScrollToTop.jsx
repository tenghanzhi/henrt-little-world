import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import style from "./style/ScrollToTop.module.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, []);

  const handleGoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      className={style.btn_scrollTop}
      style={{ display: isVisible ? "block" : "none" }}
      onClick={handleGoTop}
      icon={<VerticalAlignTopOutlined />}
      size="small"
      type="text"
    >
      Top
    </Button>
  );
};

export default ScrollToTop;
