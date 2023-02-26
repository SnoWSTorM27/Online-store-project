import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import TextField from "../common/form/textField";
import { Link } from "react-router-dom";

function UserOrders({ orders, ...rest }) {
  // const date = new Date(order.createdAt);

  const viewDate = (data) => {
    const date = new Date(data);

    return date.toLocaleString("default", { month: "long", day: "numeric" }) +" "+ date.getFullYear();
  };

  return (
    <div className="card mb-2">
      <h2 className="card-header m-2 text-center" >Ваши заказы</h2>

      {orders.map((order, index) => (
        <div key={order._id} className="card-md">
          <div className="card-body d-flex justify-content-center">
                

            <div className="d-flex justify-content-between border border-dark mx-4">

              <div className="-d-flex flex-column m-3">
                <h5 className="card-title mb-2 mt-2 text-wrap">
                  №п/п
                </h5>
                <hr />
                <h6 className="card-text mb-2 mt-2 text-center">
                  {index + 1}
                </h6>
              </div>

              <div className="-d-flex flex-column m-3 flex-grow-1">
                <h5 className="card-title mb-2 mt-2 text-wrap text-center">
                  ID заказа
                </h5>
                <hr />
                <Link to={`/orders/${order._id}`}>
                  <h6 className="card-text mb-2 mt-2 text-center">
                    {order._id}
                  </h6>
                </Link>
              </div>
              
              <div className="-d-flex flex-column m-3">
                <h5 className="card-title mb-2 mt-2 text-wrap text-center">
                  Дата
                </h5>
                <hr />
                <h6 className="card-text mb-2 mt-2 text-center">
                  {/* {order.name} */}
                  {viewDate(order.createdAt)}
                </h6>
              </div>

              <div className="-d-flex flex-column m-3">
                <h5 className="card-title mb-2 mt-2 text-wrap text-center">
                  Стоимость
                </h5>
                <hr />
                <h6 className="card-text mb-2 mt-2 text-nowrap text-center">
                  {order.total} руб.
                </h6>
              </div>
            </div>

          </div>
        </div>
      ))}
          
    </div>
  );
}
UserOrders.propTypes = {
  orders: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object])
};

export default UserOrders;
