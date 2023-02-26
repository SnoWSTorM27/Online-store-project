import React, { useEffect, useState } from "react";
import CustomCarousel from "../common/customCarousel";
import {  useSelector } from "react-redux";
import { getTabs } from "../../store/tabs";
// import useMockData from "../../utils/mockData";

function Main() {
  // const { error, initialize, progress, status } = useMockData();
  // const handleClick = () => {
  //   initialize();
  // };
  
  const tabs = useSelector(getTabs());
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <div className="container mt-5">
      <CustomCarousel
        items={tabs}
      />
      {/* <h3>Инициализация данных в FireBase</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleClick}>Иницилизировать</button> */}
    </div>
  );
}

export default Main;
