import React, { Fragment } from "react";
import UserCard from "./UserCard";
import PageNavigationBar from "../../../components/PageNavigationBar/PageNavigationBar";
import useUserSearch from "../../../hooks/useUserSearch";
import Spinner from "../../../components/Spinner/Spinner";
import "./UserGrid.css";

function UserGrid() {
  const { users, loading, handlePageChange } = useUserSearch();

  return (
    <Fragment>
      {loading && <Spinner />}

      {users.users && users.users.length === 0 && (
        <p className="no-user-msg">No users found</p>
      )}
      <div className="user-grid">
        {users.users &&
          users.users.map((user) => <UserCard user={user} key={user.userId} />)}
      </div>

      <div className="page-bar">
        <PageNavigationBar
          max={10}
          limit={5}
          onPageChange={handlePageChange}
          savedPage={parseInt(localStorage.getItem("page-search-user")) || 1}
        />
      </div>
    </Fragment>
  );
}

export default UserGrid;
