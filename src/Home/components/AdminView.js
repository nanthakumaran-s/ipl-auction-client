// import React, { useState, useEffect } from "react";
import "./adminView.css";
// import axios from "axios";
import SideBar from "./SideBar";
import TeamList from "./TeamList";

const AdminView = () => {
  return (
    <div className="adminView">
      <SideBar />
      <TeamList />
    </div>
  );
};

export default AdminView;
