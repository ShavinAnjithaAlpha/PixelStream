import React from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";

function UserProfile() {
  const { username } = useParams();

  return (
    <div className="user-profile">
      <h1>Welcome {username}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
        voluptatum, quos, voluptates, voluptatem dolorum quidem voluptate
        accusantium quibusdam vitae doloremque. Quisquam, voluptatem. Quisquam
        voluptate, quos voluptates, voluptas quae, quia quidem iusto
        reprehenderit natus voluptatibus quibusdam. Quisquam, voluptatem.
        Quisquam voluptate, quos voluptates, voluptas quae, quia quidem iusto
        reprehenderit natus voluptatibus quibusdam.
      </p>
    </div>
  );
}

export default UserProfile;
