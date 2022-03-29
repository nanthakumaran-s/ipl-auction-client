import React, { useState, useEffect } from "react";
import "./playerStyles.css";
import axios from "axios";
import { baseUrl } from "../../utils/urls";

const PlayersList = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchPlayers = () => {
      axios
        .get(baseUrl + "/api/auction/getAuction")
        .then((res) => {
          console.log(res);
          setAuctions(res.data.auction);
        })
        .catch((err) => console.log(err));
    };
    fetchPlayers();
  }, []);

  return (
    <div className="player_list">
      <p>Current Auction</p>
      {auctions.length > 0 ? (
        auctions.map((auction) =>
          auction.players.map((player) => (
            <div className="auction_card">
              <p>
                {player.player} - {player.baseprice}
              </p>
            </div>
          ))
        )
      ) : (
        <div>No Auction Available</div>
      )}
    </div>
  );
};

export default PlayersList;
