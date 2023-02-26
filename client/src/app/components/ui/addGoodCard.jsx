import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import { getCategories } from "../../store/categories";
import { useDispatch, useSelector } from "react-redux";
import { createGood } from "../../store/goods";
import Loader from "../common/loader";

function AddGoodCard() {
  const initialData = { name: "", category: "", price: "", quantity: "", image: "" };
  const dispatch = useDispatch();
  const [data, setData] = useState(initialData);
  const [isLoading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const categories = useSelector(getCategories());

  useEffect(() => {
    setData(initialData);
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const categoriesList = categories.map((categoryName) => ({
    label: categoryName.name,
    value: categoryName._id
  }));

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Название товара обязательно для заполнения"
      },
      minLength: {
        message: "Название товара должно состоять минимум из 3 символов",
        value: 3
      }
    },
    price: {
      isRequired: {
        message: "Цена обязателена для заполнения"
      },
      isContainOnlyDigit: {
        message: "Цена должна содержать только цифры"
      },
      isNegativeDigit: {
        message: "Цена должна быть положительным числом"
      }
    },
    quantity: {
      isRequired: {
        message: "Количество обязателено для заполнения"
      },
      isContainOnlyDigit: {
        message: "Количество должно содержать только цифры"
      },
      isNegativeDigit: {
        message: "Количество должно быть положительным числом"
      }
    },
    category: {
      isRequired: {
        message: "Обязательно выберите категорию"
      }
    },
    image: {
      isRequired: {
        message: "URL товара обязательно для заполнения"
      }
    }
  };

  useEffect(() => {
    if (data && isLoading) setLoading(false);
  }, [data]);

  
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
      price: +data.price,
      quantity: +data.quantity
    };
    dispatch(createGood(newData));
    setData(initialData);
  };


  return (
    <div className="card mb-3 border border-dark">
      <div className="card-body d-flex flex-column justify-content-center text-center">
        <h5 className="card-title">
          <span>Добавление нового товара</span>
        </h5>
        {!isLoading ? (<form onSubmit={handleSubmit}>
          <TextField
            label="Название товара"
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
          />
          <SelectField
            label="Выберите категорию"
            defaultOption="Выбор..."
            options={categoriesList}
            value={data.category}
            onChange={handleChange}
            error={errors.category}
            name="category"
          />
          <TextField
            label="Цена товара"
            name="price"
            value={data.price}
            onChange={handleChange}
            error={errors.price}
          />
          <TextField
            label="Количество"
            name="quantity"
            value={data.quantity}
            onChange={handleChange}
            error={errors.quantity}
          />
          <TextField
            label="URL изображения товара"
            type="text"
            name="image"
            value={data.image}
            onChange={handleChange}
            error={errors.image}
          />
          <button
            type="submit"
            disabled={!isValid}
            className="btn btn-success w-100 mx-auto"
          >Добавить товар</button>
        </form>) : (<Loader />)}
      </div>
    </div>
  );
  
}
AddGoodCard.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default AddGoodCard;
