import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function GoodCard({ good, onOpen, onToOrder }) {

  return (
    <div className="bg-light card  mb-3">
      <div className="row gy-3">
        <div className="col">
          <div className="d-flex flex-start ">
            <Link to={`/goods/${good._id}`}>
              <img
                src={good.image}
                className="rounded-circle shadow-1-strong me-3"
                alt={good.name}
                width="100"
                height="100"
              />
            </ Link>
            <div className="flex-grow-1 flex-shrink-1">
              
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-2 mt-2 ">
                  {good.name}
                </h5>
                <button
                  className="btn btn-lg btn-info  d-flex align-self-end m-2"
                  onClick={() => onToOrder(good)}
                >
                  В корзину
                </button>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <p className="card-text mb-1 ">
                  Стоимость: {good.price} руб.
                </p>
              </div>

              <p className="card-text"><small className="text-muted">ID товара:  {good._id}</small></p>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-1 ">
                  {""}
                </h5>
                
                <button
                  className="btn btn-md btn-success  d-flex align-self-end m-2"
                  onClick={() => onOpen(good._id)}
                >
                  Открыть карточку
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

GoodCard.propTypes = {
  good: PropTypes.object,
  onOpen: PropTypes.func,
  onToOrder: PropTypes.func
};

export default GoodCard;
