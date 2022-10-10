import { useState } from "react";

function validateEmail(email) {
  var re = /^[^ ]+@[^ ]+\.[a-z]{1,3}$/;
  return re.test(email);
}

export function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: target.validationMessage,
    });

    let valid = target.closest("form").checkValidity();

    if (name === "email") {
      valid = validateEmail(value);
      if (!valid) {
        setErrors({
          ...errors,
          email: "check email",
        });
      }
    }

    setIsValid(valid);
  };

  return {
    values,
    errors,
    isValid,
    handleChange,
  };
}
