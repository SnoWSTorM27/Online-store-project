import React, { useState, useEffect } from "react";
import Loader from "../../common/loader";
import { paginate } from "../../../utils/paginate";
// import Pagination from "../../common/pagination";
// import { orderBy } from "lodash";
// import GroupList from "../../common/groupList";
// import _ from "lodash";
// import { getCategories } from "../../../store/categories";
// import { getGoods, getGoodsLoadingStatus } from "../../../store/goods";
// import Loader from "../../common/loader";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders, getOrdersLoadingStatus } from "../../../store/orders";
import { Link } from "react-router-dom";
import SearchField from "../../common/form/searchField";
import Pagination from "../../common/pagination";
import DropDown from "../../common/dropDown";
import _ from "lodash";
// import SearchField from "../../common/form/searchField";
// import GoodsList from "../../common/goodsList";
// import history from "../../../utils/history";
// import { createOrder } from "../../../store/orders";

function OrdersListPage() {
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedCategory, setSelectedCategory] = useState("_id");
  const orders = useSelector(getAdminOrders());
  const ordersLoadingStatus = useSelector(getOrdersLoadingStatus());
  
  const viewDate = (data) => {
    const date = new Date(data);

    return date.toLocaleString("default", { month: "long", day: "numeric" }) +" "+ date.getFullYear();
  };
  const [searchOrders, setSearchOrders] = useState("");


  useEffect(() => {
    setCurrentPage(1);
  }, [searchOrders]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };


  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchOrders(value);
  };

  if (!ordersLoadingStatus && orders) {

    function filterOrders(data) {
      
      const filteredOrders = searchOrders
        ? data.filter(
          (order) =>
            order["_id"]
              .toLowerCase()
              .indexOf(searchOrders.toLowerCase()) !== -1
        ) : data;
      return filteredOrders;
    }

    
    const filteredOrders = filterOrders(orders);
    const count = filteredOrders.length;
    const orderCrop = paginate(filteredOrders, currentPage, pageSize);



    return (
      <>
        <div className="container">
          <div className="row gutters-xl">

            <h2 className="card-header m-2 text-center border border-darks" >Заказы</h2>

            <SearchField
              label="Поис по ID заказа"
              name="search"
              value={searchOrders}
              onChange={handleSearchChange}
            />

            <div className="col-xl-12">
              <div className="card m-3">
                <div className="card-body border border-dark">

                  {orderCrop.map((order, index) => (
                    <div key={order._id} className="card-md">
                      <div className="card-body d-flex justify-content-center border border-dark">
                        <div className="d-flex justify-content-evenly">
                          <div className="d-flex justify-content-evenly">
                            

                            <div className="d-flex justify-content-between">

                              <div className="-d-flex flex-column m-3">
                                <h5 className="card-title mb-2 mt-2 text-nowrap">
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
                                  {viewDate(order.createdAt)}
                                </h6>
                              </div>

                              <div className="-d-flex flex-column m-3">
                                <h5 className="card-title mb-2 mt-2 text-wrap text-center">
                                  Сумма
                                </h5>
                                <hr />
                                <h6 className="card-text mb-2 mt-2 text-nowrap text-center">
                                  {order.total} руб.
                                </h6>
                              </div>
                                
                              <div className="-d-flex flex-column m-3">
                                <h5 className="card-title mb-2 mt-2 text-wrap text-center">
                                  ID пользователя
                                </h5>
                                <hr />
                                <h6 className="card-text mb-2 mt-2 text-nowrap text-center">
                                  {order.userId}
                                </h6>
                              </div>

                              <div className="-d-flex flex-column m-3">
                                <h5 className="card-title mb-2 mt-2 text-wrap text-center">
                                  Адресс пользователя
                                </h5>
                                <hr />
                                <h6 className="card-text mb-2 mt-2 text-nowrap text-center">
                                  {order.address}
                                </h6>
                              </div>

                              <div className="-d-flex flex-column m-3">
                                <h5 className="card-title mb-2 mt-2 text-wrap text-center">
                                  Телефон пользователя
                                </h5>
                                <hr />
                                <h6 className="card-text mb-2 mt-2 text-nowrap text-center">
                                  {order.phone}
                                </h6>
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>    
                      
          </div>
        </div>
      </>
    );
  }
  return <Loader />;
}

export default OrdersListPage;
