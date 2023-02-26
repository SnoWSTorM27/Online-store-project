import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPaidOrder } from "../../../store/orders";
import { clearBag, getBagItems, getBagLoadingStatus, loadUserBagList, removeBagItem } from "../../../store/bag";
import OrderCard from "../../ui/orderCard";
import localStorageService from "../../../services/localStorage.service";
import { getCurrentUserData, getUserLoadingStatus } from "../../../store/user";
import Loader from "../../common/loader";

function BagPage() {
  const {orderId} = useParams();
  const [data, setData] = useState([]);
  const [total, setTotal] = useState();
  const dispatch = useDispatch();
  const order = useSelector(getBagItems());
  const bagLoading = useSelector(getBagLoadingStatus());
  const userDataLoadingStatus = useSelector(getUserLoadingStatus());
  const isValid = order && order.length > 0 ;
  const {address, phone} = useSelector(getCurrentUserData());


  function calculateTotal(data, order) {
    if (!data) return;
    if (!order) return;
    const total = order.reduce((acc, item) => {
      return acc += item["price"] * Number(data[item._id]);
    }, 0); 
    return total;
  };


  const init = (data) => {
    if (!data) return;
    const arr = {};
    data.forEach(item =>arr[item._id] = "1");
    return arr;
  };

  const handleRemoveGood = (id) => {
    dispatch(removeBagItem(id));
  };


  const handleSubmit = () => {
   
    const newData = order.map((item) => {
      const quantity = data[item._id]
      return {
        goodId: item._id,
        quantity,
        price: item.price
      }
    })
    
    const newOrder = {
      goods: newData,
      userId: localStorageService.getUserId(),
      total: String(total),
      address,
      phone
    };
    dispatch(createPaidOrder(newOrder));
    dispatch(clearBag())
  };

  useEffect(()=> {
    if (data) {
      setTotal(calculateTotal(data, order));
    }
    return ()=> {
      setTotal(calculateTotal(data, order));
    }
  }, [data, order]);

  useEffect(()=> {
    dispatch(loadUserBagList());
    if (data) {
      setData(init(order));
      setTotal(calculateTotal(data, order));
    }
  }, []);
  
  const handleChange = (e, i) => {
    let { value, name } = e;

    setData((prevState) => ( {
      ...prevState,
      [name]: value
    }));
  };


  return (
    <div className="container">
      <h1>Корзина</h1>
      {!bagLoading && !userDataLoadingStatus ? ( 
        <div className="row gutters-xl">
          <div className="col-xl-9">
            {order?.length > 0 ? (order.map((ord, index) => (
              <OrderCard
                key={ord._id}
                order={ ord }
                onRemove={handleRemoveGood}
                onChange={(e) => handleChange(e, index)}
                name={ord._id}
                value={order[ord.name]}
                type="number"
                defaultValue="1"
                min="1"
                max={ord.quantity}
              />
            ))) : (<h2 className="text-center">Корзина пуста</h2>)}
          </div>

          <div className="col-xl-3">
            <div className="card">
              <div className="card-body d-flex flex-column justify-content-between">
                <h1>Итого</h1>
                <div className="-d-flex flex-column m-2">
                  <h5 className="card-title mb-2 mt-2 ">
                    Итоговая сумма
                  </h5>
                  <h5 className="card-text mb-2 mt-2 text-nowrap">
                    {total ? total : 0} руб.
                  </h5>
                </div>
                <button
                  className="btn btn-lg btn-success  d-flex align-self-stretch m-2"
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  Оформить заказ
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (<Loader />) }
    </div>
  );
}


export default BagPage;
