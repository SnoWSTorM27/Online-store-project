import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import GoodsTable from "../../ui/goodsTable";
import { getGoods, removeGood } from "../../../store/goods";
import AddGoodCard from "../../ui/addGoodCard";
import EditGoodCard from "../../ui/editGoodCard";
import { useParams } from "react-router-dom";
import ModalPhoto from "../../common/modalPhoto";

function AdminPage() {
  const pageSize = 12;
  const [modalShow, setModalShow] = useState(false);
  const [photoGood, setPhotoGood] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const goods = useSelector(getGoods());
  const dispatch = useDispatch();
  const { goodId } = useParams();
  const { name, image } = photoGood;

  const handleModalPhoto = (item) => {
    setPhotoGood(item);
    setModalShow(true);
  };

  const handleRemoveGood = (id) => {
    dispatch(removeGood(id));
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const count = goods.length;
  const sortedGoods = _.orderBy(goods, [sortBy.path], [sortBy.order]);
  const goodCrop = paginate(sortedGoods, currentPage, pageSize);

  

  return (
    <>
      <ModalPhoto
        name={name}
        image={image}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="container-fluid">
        <div className="row gutters-sm">
          <div className="col-md-3 mb-3">
            <div className="card mb-3">
              <div className="card-body border border-dark">
                {goodId ? <EditGoodCard id={goodId} /> : <AddGoodCard />}
              </div>
            </div>
          </div>
          <div className="col-md-9 border border-dark">
            {count > 0 && (
              <GoodsTable
                goods={goodCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                OnDeleteGood={handleRemoveGood}
                onToggleModalPhoto={handleModalPhoto}
              />
            )}
            <div className="d-flex justify-content-center align-items-end">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

export default AdminPage;
