import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TextField from "../common/form/textField";
import { useParams } from "react-router-dom";

function OrderCard({ order, onRemove, onChange, ...rest }) {
  const { orderId } = useParams();
  return (
    <div className="card mb-2">
      <div className="card-body d-flex justify-content-between">
        
        <div className="card m-2">
          <img
            src={order.image}
            className="img-thumbnail"
            alt={order._id}
            width="120"
          />
        </div>

        <div className="d-flex justify-content-evenly">
          <div className="d-flex flex-column justify-content-evenly">
            <div className="">
              <p className="card-text"><small className="text-muted col-3">ID товара:  {order._id}</small></p>
            </div>

            <div className="d-flex justify-content-between">
              <div className="-d-flex flex-column m-2 flex-grow-1 mr-3">
                <h5 className="card-title mb-2 mt-2 text-wrap">
                  Наименование
                </h5>
                <h6 className="card-text mb-2 mt-2 ">
                  {order.name}
                </h6>
              </div>
              <div className="-d-flex flex-column m-2">
                <h5 className="card-title mt-2 ">
                  Количество
                </h5>
                <TextField 
                  onChange={onChange}
                  {...rest}
                />
              </div>
              <div className="-d-flex flex-column m-2">
                <h5 className="card-title mb-2 mt-2 ">
                  Стоимость
                </h5>
                <h6 className="card-text mb-2 mt-2 text-nowrap">
                  {order.price} руб.
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column justify-content-start">
          <button
            className="btn btn-sm text-primary d-flex align-items-center"
            onClick={() => onRemove(order._id)}
            disabled={orderId}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>  
    </div>
  );
}
OrderCard.propTypes = {
  order: PropTypes.object,
  onRemove: PropTypes.func,
  onChange: PropTypes.func
};

export default OrderCard;
