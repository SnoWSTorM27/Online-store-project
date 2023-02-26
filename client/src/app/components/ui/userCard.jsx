import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserId } from "../../store/user";

function UserCard({ user }) {
  const history = useHistory();
  const currentUserId = useSelector(getCurrentUserId());
  const goToUserEdit = () => {
    history.push(`${history.location.pathname}/edit`);
  };
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center position-relative">
          <img
            src={user.image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="65"
            height="65"
          />
          <div className="mt-3">
            <h4 className="card-title">{user.name}</h4>
            <p className="text-text mb-1">Адрес: {user.address}</p>
            <p className="text-text mb-1">Телефон: {user.phone}</p>
          </div>
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-md"
            onClick={() => goToUserEdit()}
          >
            <i className="bi bi-gear" role="button"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
UserCard.propTypes = {
  user: PropTypes.object
};

export default UserCard;
