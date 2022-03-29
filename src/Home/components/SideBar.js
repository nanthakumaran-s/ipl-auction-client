import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./sidebar.css";
import { baseUrl } from "../../utils/urls";

const SideBar = () => {
  const [createTeam, setCreateTeam] = useState(false);
  const [createTeamOwner, setCreateTeamOwner] = useState(false);
  const [createAuction, setCreateAuction] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [teamName, setTeamName] = useState("");
  const [teamOwner, setTeamOwner] = useState("");

  const handlePlayerSelection = (player) => {
    if (selectedPlayers.includes(player)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== player));
    } else {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const createAuc = () => {
    axios.post(baseUrl + "/api/admin/createAuction", {
      players: selectedPlayers,
    });
  };

  const createTeamOw = () => {
    axios
      .post(baseUrl + "/api/admin/addTeamOwner", {
        fullname: fullname,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const createTe = () => {
    axios
      .post(baseUrl + "/api/admin/createTeam", {
        name: teamName,
        teamOwner,
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    axios.get(baseUrl + "/api/players/getPlayers").then((res) => {
      setPlayers(res.data.players);
    });
  }, []);

  return (
    <div className="sidebar">
      <p>Admin Powers</p>
      <button onClick={() => setCreateTeamOwner(true)}>
        Create Team Owner
      </button>
      <button onClick={() => setCreateTeam(true)}>Create Team</button>
      <button onClick={() => setCreateAuction(true)}>Create Auction</button>

      <Dialog open={createTeam} onClose={() => setCreateTeam(false)}>
        <DialogTitle>Create Team</DialogTitle>
        <DialogContent>
          <DialogContentText>Create New Team</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Team Name"
            type="text"
            fullWidth
            autoComplete="off"
            variant="standard"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="teamOwner"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={teamOwner}
            onChange={(event) => setTeamOwner(event.target.value)}
          />
          <button className="dialog_button" onClick={() => createTe()}>
            Create
          </button>
        </DialogContent>
      </Dialog>

      <Dialog open={createTeamOwner} onClose={() => setCreateTeamOwner(false)}>
        <DialogTitle>Create Team Owner</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            autoComplete="off"
            variant="standard"
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="dialog_button" onClick={() => createTeamOw()}>
            Create
          </button>
        </DialogContent>
      </Dialog>

      <Dialog open={createAuction} onClose={() => setCreateAuction(false)}>
        <DialogTitle>Create Auction</DialogTitle>
        <DialogContent>
          <DialogContentText>Select Players</DialogContentText>
          {players.map((player) => (
            <div
              className={`${
                selectedPlayers.includes(player) ? "active" : ""
              } player_name`}
              onClick={() => handlePlayerSelection(player)}
            >
              {player.player} - {player.baseprice}
            </div>
          ))}

          <button className="dialog_button" onClick={() => createAuc()}>
            Create
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SideBar;
