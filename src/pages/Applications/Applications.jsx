import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Space } from "antd";
import apiMatrix from "../common/apiMatrix";
import messageMatrix from "../common/messageMatrix";
import categoryMatrix from "../common/categoryMatrix";
import ApplicationsTable from "./ApplicationsTable";
import ApplicationsList from "./ApplicationsList";
import ApplicationsTopBtns from "./ApplicationsTopBtns";
import ApplicationsFilter from "./ApplicationsFilter";
import ApplicationsTableColsController from "./ApplicationsTableColsController";
import LwLayout from "../common/LwLayout";
import { SET_APPLICATION_DATA } from "../../redux/constants";
import handleMessage from "../utils/handleMessage";
import style from "./style/Applications.module.css";

const Applications = () => {
  const dispatch = useDispatch();
  const applicationTablePagenation = useSelector(
    (state) => state.applicationTablePagenation
  );
  const applicationTableSorter = useSelector(
    (state) => state.applicationTableSorter
  );
  const applicationTableFilter = useSelector(
    (state) => state.applicationTableFilter
  );

  useEffect(() => {
    handleGetApplicationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    applicationTablePagenation,
    applicationTableSorter,
    applicationTableFilter,
  ]);

  const handleGetApplicationData = () => {
    const messageKey = "loadingMessage";

    (async () => {
      const response = await fetch(
        `${apiMatrix.APPLICATIONS_GET_ALL}?pagination[page]=${
          applicationTablePagenation.current
        }&pagination[pageSize]=${applicationTablePagenation.size}&sort=${
          applicationTableSorter.sort
        }${applicationTableSorter.order}${
          applicationTableFilter.name
            ? `&filters[name][$containsi][0]=${applicationTableFilter.name}`
            : ""
        }${
          applicationTableFilter.type
            ? `&filters[type][$eqi][1]=${applicationTableFilter.type}`
            : ""
        }${
          applicationTableFilter.description
            ? `&filters[description][$containsi][2]=${applicationTableFilter.description}`
            : ""
        }`
      );
      return response.json();
    })()
      .then((response) => {
        if (response && response.error) {
          throw new Error(response.error.message);
        } else {
          dispatch({ type: SET_APPLICATION_DATA, payload: response });
        }
      })
      .catch((error) => {
        handleMessage(
          messageKey,
          "error",
          `${messageMatrix.LOADING_MESSAGE_ERROR}${error}`
        );
      });
  };

  const pageContent = (
    <Space direction="vertical" wrap align="start">
      <Space wrap className={style.lw_applications_btn_wrapper}>
        <ApplicationsTopBtns />
        <ApplicationsTableColsController />
        <ApplicationsFilter />
      </Space>
      <ApplicationsTable />
      <ApplicationsList />
    </Space>
  );

  return (
    <LwLayout content={pageContent} pageKey={categoryMatrix.APPLICATIONS} />
  );
};

export default Applications;
