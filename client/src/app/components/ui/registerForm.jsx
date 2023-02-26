import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import RadioField from "../common/form/radioField";
import CheckBoxField from "../common/form/checkBoxField";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../store/user";

function RegisterForm() {
  const dispatch = useDispatch();
  const [data, setData] = useState({ email: "", password: "", sex: "male", name: "", phone: "", address: "", licence: false });
  const [errors, setErrors] = useState({});

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
      ...data
    };
    dispatch(signUp(newData));
  };

  return (
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
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
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
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердите <a>лицензионнное соглашение</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-success w-100 mx-auto"
      >Submit</button>
    </form>);
}

export default RegisterForm;
