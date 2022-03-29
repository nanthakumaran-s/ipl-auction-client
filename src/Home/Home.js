import React, { useEffect } from "react";
import AuctionBoard from "./components/AuctionBoard";
import PlayersList from "./components/PlayersList";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminView from "./components/AdminView";
import LoginIcon from "@mui/icons-material/Login";

const Home = (props) => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.user.role);
  const email = useSelector((state) => state.user.email);
  const fullname = useSelector((state) => state.user.fullname);

  useEffect(() => {
    if (email === "") {
      navigate("/");
    }
  });

  return (
    <div className="home_container">
      <div className="home_nav">
        <p>
          Hi {fullname} - {email}
        </p>
        <p>Welcome to the Auction Board</p>
        <div
          styles={{
            marginRight: "5rem",
            cursor: "pointer",
          }}
        >
          <LoginIcon onClick={() => navigate("/")} />
        </div>
      </div>
      {role !== "admin" ? (
        <div className="home_mainbody">
          <PlayersList />
          <AuctionBoard />
        </div>
      ) : (
        <div className="home_mainbody">
          <AdminView />
        </div>
      )}
    </div>
  );
};

export default Home;
