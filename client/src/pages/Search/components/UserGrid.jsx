import React, { useState, useEffect } from "react";
import axios from "../../../axios";
import UserCard from "./UserCard";
import "./UserGrid.css";

function UserGrid() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="user-grid">
      {users.map((user) => (
        <UserCard user={user} key={user.userId} />
      ))}
    </div>
  );
}

export default UserGrid;
