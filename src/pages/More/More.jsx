import { useState } from "react";
import LwLayout from "../common/LwLayout";

const More = () => {
  const [showCase, setShowCase] = useState("None");

  const handleFetch = async () => {
    const response = await fetch("http://localhost:4000/");
    return response.json();
  };

  const handleOnClick = () => {
    handleFetch().then((resposne) => {
      console.log(resposne);
      setShowCase(resposne.message.toString());
    });
  };

  const handleClear = ()=> {
    setShowCase("None")
  }

  const pageContent = (
    <>
      <button onClick={handleOnClick}>Click</button>
      <button onClick={handleClear}>Clear</button>
      <div>{showCase}</div>
    </>
  );

  return <LwLayout content={pageContent} />;
};

export default More;
