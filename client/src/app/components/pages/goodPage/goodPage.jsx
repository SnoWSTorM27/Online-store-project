import React from "react";
import Loader from "../../common/loader";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGoodById } from "../../../store/goods";
import { createBagItem } from "../../../store/bag";

function GoodPage() {
  const {goodId} = useParams();
  const good = useSelector(getGoodById(goodId));
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddGoodToOrder = (good) => {
    dispatch(createBagItem(good));
  };

  if (good) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xl-1">
            <button
              className="btn btn-success "
              onClick={() => history.goBack()}
            >
              <i className="bi bi-caret-left"></i>
              Назад
            </button>
          </div>
          <div className="col-xl-10">
            <div className="card">
              <div className="card-body d-flex justify-content-between">

                <div className="card m-2 w-20">
                  <img
                    src={good.image}
                    className="img-thumbnail"
                    alt={good.name}
                    width="400"
                    height="400"
                  />
                </div>

                <div className="d-flex flex-column justify-content-evenly">
                  <h3 className="card-title mb-2 mt-2 ">
                    {good.name}
                  </h3>
                  <div >
                    <h4 className="card-title mb-3 ">
                      Стоимость: {good.price} руб.
                    </h4>
                    <p className="card-text mb-1 ">
                      Количество на складе: {good.quantity} шт.
                    </p>
                  </div>
                </div>

                <div className="d-flex flex-column justify-content-between">
                  <div className="">
                    {""}
                  </div>

                  <button
                    disabled={good.quantity <= 0}
                    className="btn btn-lg btn-success  d-flex align-self-stretch m-2"
                    onClick={() => handleAddGoodToOrder(good)}
                  >
                    Купить
                  </button>

                  <p className="card-text"><small className="text-muted col-3">ID товара:  {good._id}</small></p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Loader />;
}

export default GoodPage;
