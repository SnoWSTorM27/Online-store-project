import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import RadioField from "../../common/form/radioField";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserData, updateUserData } from "../../../store/user";
import Loader from "../../common/loader";
import { useHistory } from "react-router-dom";

function EditUserPage() {
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(true);
  const currentUser = useSelector(getCurrentUserData());

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введён некорректно"
      }
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения"
      },
      minLength: {
        message: "Имя должно состоять минимум из 3 символов",
        value: 3
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одну цифру"
      },
      minLength: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8
      }
    },
    phone: {
      isRequired: {
        message: "Телефон обязательн для заполнения"
      },
      isContainOnlyDigit: {
        message: "Телефон должен содержать только цифры"
      },
    },
    address: {
      isRequired: {
        message: "Адрес обязательн для заполнения"
      }
    },
    licence: {
      isRequired: {
        message: "Необходимо подтвердить лицензионное соглашение"
      }
    }
  };
  
  useEffect(() => {
    if (currentUser && !data) {
      setData({
        ...currentUser
      });
    }
  }, [currentUser, data]);

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
  
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data
    };
    dispatch(updateUserData(newData));
  };

  return (
    <div className="container mt-5">
      <button
        className="btn btn-success"
        onClick={() => history.goBack()}
      >
        <i className="bi bi-caret-left"></i>
        Назад
      </button>
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading ? (
            <form onSubmit={handleSubmit} >
              <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
                autoFocus
              />
              <TextField
                label="Имя"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="Телефон"
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                error={errors.phone}
                lazy={false}
              />
              <TextField
                label="Адрес"
                name="address"
                value={data.address}
                onChange={handleChange}
                error={errors.address}
              />
              <RadioField
                options={[{ name: "муж.", value: "male" }, { name: "жен.", value: "female" }, { name: "другое", value: "other" }]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-success w-100 mx-auto"
              >Submit</button>
            </form>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default EditUserPage;
