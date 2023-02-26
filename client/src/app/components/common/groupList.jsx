import React from "react";
import PropTypes from "prop-types";

function GroupList({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            "list-group-item text-center d-flex justify-content-center align-items-center" +
                  (item === selectedItem ? " active" : "")
          }
          onClick={() => onItemSelect(item)}
          role="button"
          style={{height: "150px"}}
        >
          <div className="card-body">
            <img src={item.image} className="img-thumbnail" alt={item[contentProperty]} />
            <h5 className="card-title">{item[contentProperty]}</h5>
          </div>
        </li>
      ))}
    </ul>
  );


  // if (!Array.isArray(items)) {
  //   return (
  //     <ul className="list-group">
  //       {Object.values(items).map((item) => (
  //         <li
  //           key={items[item][valueProperty]}
  //           className={
  //             "list-group-item" +
  //             (items[item] === selectedItem ? " active" : "")
  //           }
  //           onClick={() => onItemSelect(items[item])}
  //           role="button"
  //         >
  //           {items[item][contentProperty]}
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }
  // return (
  //   <ul className="list-group">
  //     {items.map((item) => (
  //       <li
  //         key={item[valueProperty]}
  //         className={
  //           "list-group-item" +
  //                 (item === selectedItem ? " active" : "")
  //         }
  //         onClick={() => onItemSelect(item)}
  //         role="button"
  //       >
  //         {item[contentProperty]}
  //       </li>
  //     ))}
  //   </ul>
  // );
}
GroupList.defaultProps = {
  valueProperty: "_id",
  contentProperty: "name"
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
};

export default GroupList;
