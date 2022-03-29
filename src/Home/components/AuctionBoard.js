import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "../../utils/socket";
import "./auctionBoard.css";

const AuctionBoard = () => {
  const [currenBid, setCurrentBid] = useState({});
  const [loading, setLoading] = useState(true);
  const email = useSelector((state) => state.user.email);

  useEffect(() => {
    io.emit("join-bid", { email });
  }, []);

  useEffect(() => {
    setLoading(true);
    io.on("bid-changed", (data) => {
      setCurrentBid(data.currentBid);
      console.log(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    io.emit("configure-bid");
  }, []);

  const bid = () => {
    if (currenBid.optedOut.includes(email)) return;
    io.emit("bid", {
      name: email,
      bid:
        currenBid.currentBid === 0
          ? currenBid.currentPlayer.baseprice
          : currenBid.currentBid + 1,
    });
  };

  const giveUp = () => {
    if (currenBid.currentBidder === email) return;
    io.emit("give-up", {
      email: email,
    });
  };

  return loading ? (
    <div>Loading....</div>
  ) : currenBid.currentPlayer === "" ? (
    <div className="results">
      <p>Results</p>
      {currenBid.playersCompleted.map((player) => {
        return (
          <div className="result_card">
            {/* <div>{player._doc.player}</div> */}
            {player._doc.player} - {player.soldTo} - {player.soldPrice}
          </div>
        );
      })}
    </div>
  ) : (
    <div class="auctionBoard">
      <p>Auction Board</p>
      <div class="currentPlayer">
        <p class="currentPlayer_name">{currenBid.currentPlayer.player}</p>
        <p class="currentPlayer_price">
          Base Price: {currenBid.currentPlayer.baseprice}
        </p>
        <div class="currentPlayer_desc">
          <p class="currentPlayer_type">Type: {currenBid.currentPlayer.type}</p>
          <p class="currentPlayer_age">Age: {currenBid.currentPlayer.age}</p>
        </div>
      </div>
      <div class="currentDetails">
        <p class="currentAmount">Current Price: {currenBid.currentBid}</p>
        <p class="currentTime">Bidder: {currenBid.currentBidder}</p>
      </div>
      <div class="currentActions">
        <button class="bid_btn" onClick={bid}>
          Bid
        </button>
        <button class="giveup_btn" onClick={giveUp}>
          Give Up
        </button>
      </div>
    </div>
  );
};

export default AuctionBoard;
