import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import { orderBy } from "lodash";
import GroupList from "../../common/groupList";
import _ from "lodash";
import { getCategories, getCategoriesLoadingStatus } from "../../../store/categories";
import { getGoods, getGoodsLoadingStatus } from "../../../store/goods";
import Loader from "../../common/loader";
import { useDispatch, useSelector } from "react-redux";
import SearchField from "../../common/form/searchField";
import GoodsList from "../../common/goodsList";
import history from "../../../utils/history";
import { createBagItem } from "../../../store/bag";

function GoodsListPage() {
  const pageSize = 6;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState();
  const goods = useSelector(getGoods());
  const [searchGoods, setSearchGoods] = useState("");
  const categories = useSelector(getCategories());
  const goodsLoading = useSelector(getGoodsLoadingStatus());
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());


  useEffect(() => {
    setCurrentPage(1);
    if (selectedCategory) {
      setSearchGoods("");
    } else if (searchGoods) {
      setSelectedCategory();
    }
  }, [selectedCategory, searchGoods]);

  const handleAddGoodToOrder = (good) => {
    dispatch(createBagItem(good));
  };

  const handleOpenGoodCard = (id) => {
    history.push(`/goods/${id}`);
  };

  const handleCategorySelect = (item) => {
    if (searchGoods !== "") setSearchGoods("");
    setSelectedCategory(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const clearFilter = () => {
    setSelectedCategory();
    setSearchGoods("");
  };

  const handleSearchChange = (e) => {
    setSelectedCategory(undefined);
    const { value } = e.target;
    setSearchGoods(value);
  };

  if (goods) {

    function filterGoods(data) {
      const filteredGoods = searchGoods
        ? data.filter(
          (good) =>
            good.name
              .toLowerCase()
              .indexOf(searchGoods.toLowerCase()) !== -1
        )
        : selectedCategory
          ? data.filter(
            (good) =>
              JSON.stringify(good.category) ===
              JSON.stringify(selectedCategory._id)
          )
          : data;
      return filteredGoods;
    }

    
    const filteredGoods = filterGoods(goods);
    const count = filteredGoods.length;
    const goodCrop = paginate(filteredGoods, currentPage, pageSize);


    return (
      <>
        <div className="container">
          <SearchField
            label="Поиск по названию"
            name="search"
            value={searchGoods}
            onChange={handleSearchChange}
          />
          <div className="row gutters-xl">
            <div className="col-xl-3 mb-3">
              <div className="d-flex flex-column flex-shrink p-3">
                <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                  Очистить
                </button>
                {!categoriesLoading ?(
                  <GroupList
                    selectedItem={selectedCategory}
                    items={categories}
                    onItemSelect={handleCategorySelect}
                  />) : (<Loader />)
                }
              </div>  
            </div>
            <div className="col-xl-9">
              <div className="card m-3">
                <div className="card-body">
                  {!goodsLoading ? (
                    <GoodsList 
                      goods={goodCrop}
                      onOpen={handleOpenGoodCard}
                      onToOrder={handleAddGoodToOrder}
                    />) : (<Loader />)
                  }
                </div>
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
      </>
    );
  }
  return <Loader />;
}

export default GoodsListPage;
