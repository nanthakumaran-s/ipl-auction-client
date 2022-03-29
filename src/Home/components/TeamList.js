import React, { useState, useEffect } from "react";
import "./teamlist.css";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../utils/urls";

const TeamList = () => {
  const [data, setData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamOwner, setTeamOwner] = useState("");
  const [amount, setAmount] = useState("");

  const updateTeam = () => {
    const newAmount = parseInt(amount) + parseInt(selectedTeam.amount);
    axios
      .post(baseUrl + "/api/admin/updateTeam", {
        name: selectedTeam.name,
        newName: teamName !== "" ? teamName : selectedTeam.name,
        teamOwner: teamOwner !== "" ? teamOwner : selectedTeam.teamOwner,
        amount: newAmount,
      })
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    const fetchTeams = () => {
      axios
        .get(baseUrl + "/api/admin/getTeams")
        .then((res) => {
          console.log(res);
          setData(res.data.team);
        })
        .catch((err) => console.log(err));
    };
    fetchTeams();
  });

  return (
    <div className="teamlist">
      <p>Teams</p>
      <div className="team_wrap">
        {data.map((team) => (
          <div className="team">
            <p className="team_name">{team.name}</p>
            <p>Owner: {team.teamOwner}</p>
            <p>Amount: {team.amount}</p>
            <div
              className="editIcon"
              onClick={() => {
                setSelectedTeam(team);
                setShowModal(true);
              }}
            >
              <EditIcon />
            </div>
          </div>
        ))}
      </div>
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        {showModal && <DialogTitle>Edit {selectedTeam.name}</DialogTitle>}
        <DialogContent>
          <DialogContentText>
            Edit Team Name, Team Owner or Add Amount for this team
          </DialogContentText>
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
          <TextField
            autoFocus
            margin="dense"
            id="amount"
            label="Amount to be added"
            type="number"
            fullWidth
            variant="standard"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <button className="dialog_button" onClick={updateTeam}>
            Update
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamList;
