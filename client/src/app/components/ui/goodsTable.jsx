import React from "react";
import PropTypes from "prop-types";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Category from "./category";
import Image from "../common/image";
import Pencil from "../common/pencil";
import Trash from "../common/trash";

function GoodsTable({
  goods,
  onSort,
  selectedSort,
  onToggleModalPhoto,
  OnDeleteGood
}) {
  const columns = {
    count: { path: "count", name: "№п/п" },
    name: {
      path: "name",
      name: "Название",
      component: (good) => (<Link to={`/goods/${good._id}`}>{good.name}</Link>)
    },
    categories: {
      name: "Категория",
      component: (good) => <Category id={good.category} />
    },
    _id: { path: "_id", name: "ID" },
    price: { path: "price", name: "Цена, руб." },
    quantity: { path: "quantity", name: "Количество" },
    image: {
      path: "image",
      name: "Фото",
      component: (good) => (
        <Image
          img={good.image}
          onClick={() => onToggleModalPhoto(good)}
        />
      )
    },
    edit: {
      path: "actions",
      name: "Действия",
      component: (good) => (
        <Pencil
          id={good._id}
          onClick={() => onToggleGoodEdit(good._id)}
        />
      )
    },
    delete: {
      component: (good) => (
        <Trash
          onClick={() => OnDeleteGood(good._id)}
        />
      )
    }
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={goods}
    />
  );
}

GoodsTable.propTypes = {
  goods: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  OnDeleteGood: PropTypes.func,
  onToggleModalPhoto: PropTypes.func,
  selectedSort: PropTypes.object.isRequired
};

export default GoodsTable;
