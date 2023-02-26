import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../pages/userPage";
import EditUserPage from "../pages/editUserPage";
import UserLoader from "../ui/hoc/userLoader";

function User() {
  const params = useParams();
  const {  edit } = params;

  return (
    <>
      <UserLoader>
        {
          edit ? (
            <EditUserPage />
          ) : (
            <UserPage />
          )
        }
      </UserLoader>
    </>
  );
}

export default User;
