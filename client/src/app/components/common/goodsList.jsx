import React from "react";
import PropTypes from "prop-types";
import GoodCard from "../ui/goodCard";

function GoodsList({ goods, onOpen, onToOrder }) {
  return goods.map((good) => (
    <GoodCard
      key={good._id}
      good={good}
      onOpen={onOpen}
      onToOrder={onToOrder}
    />
  ));
}
GoodsList.propTypes = {
  goods: PropTypes.array,
  onOpen: PropTypes.func,
  onToOrder: PropTypes.func
};

export default GoodsList;
