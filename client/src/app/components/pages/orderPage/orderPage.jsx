import React from "react";
import Loader from "../../common/loader";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoodById } from "../../../store/goods";
import { getOrderById, getOrdersLoadingStatus } from "../../../store/orders";
import OrderCard from "../../ui/orderCard";
import localStorageService from "../../../services/localStorage.service";

function OrderPage() {
  const {orderId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const role = localStorageService.getUserRole();
  const order = useSelector(getOrderById(orderId));
  const orderLoadingStatus = useSelector(getOrdersLoadingStatus());
  const {goods, total, address, phone} = order;
  const buyedGoods = Object.values(goods).map((g) => (useSelector(getGoodById(g.goodId))));

  return (
    <div className="container">
      <h1 className="card-title mb-3">Заказ {orderId}</h1>
      {!orderLoadingStatus && order ? ( 
        <div className="row gutters-xl">
          <div className="col-xl-1">
            <button
              className="btn btn-success "
              onClick={() => history.goBack()}
            >
              <i className="bi bi-caret-left"></i>
              Назад
            </button>
          </div>
          <div className="col-xl-8">
            
            {buyedGoods?.length > 0 ? (buyedGoods.map((ord, index) => (

              <OrderCard
                key={ord._id}
                order={ ord }
                readOnly
                value={goods[index].quantity}
                type="number"
              />
            ))) : (<Loader />)}

          </div>

          <div className="col-xl-3">
            <div className="row gy-5">
              <div className="card">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h1>Итого</h1>
                  <div className="-d-flex flex-column m-2">
                    <h5 className="card-title mb-2 mt-2 ">
                      Итоговая сумма
                    </h5>
                    <h5 className="card-text mb-2 mt-2 text-nowrap">
                      {total} руб.
                    </h5>
                  </div>
                  <button
                    className="btn btn-lg btn-success  d-flex align-self-stretch m-2"
                    disabled
                  >
                    Оформить заказ
                  </button>
                </div>
              </div>
              { role==="ADMIN" && (
                <div className="card">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h3>Адрес и телефон доставки</h3>
                    <div className="-d-flex flex-column m-2">
                      <h5 className="card-title mb-2 mt-2 ">
                        Адрес: {address}
                      </h5>
                      <h5 className="card-text mb-2 mt-2 text-nowrap">
                        Телефон: {phone}
                      </h5>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      ) : (<Loader />) }
    </div>
  );
}


export default OrderPage;
