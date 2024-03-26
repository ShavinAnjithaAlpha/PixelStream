import React, { useState, useEffect, Fragment, useContext } from "react";
import axios from "../../../axios";
import UserCard from "./UserCard";
import { SearchContext } from "../../../contexts/search.context";
import "./UserGrid.css";

function UserGrid() {
  const [users, setUsers] = useState([]);
  const { searchKeyword } = useContext(SearchContext);

  useEffect(() => {
    axios
      .get(`search/users?query=${searchKeyword}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Fragment>
      {users.length === 0 && <p className="no-user-msg">No users found</p>}
      <div className="user-grid">
        {users.users &&
          users.users.map((user) => <UserCard user={user} key={user.userId} />)}
      </div>
    </Fragment>
  );
}

export default UserGrid;
