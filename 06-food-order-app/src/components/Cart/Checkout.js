import { useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = function (props) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true, // To keep them valid initially
    street: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = function (event) {
    // Sve dole moze i sa useRef()
    event.preventDefault();

    const enteredName = event.target.name.value;
    const enteredStreet = event.target.street.value;
    const enteredPostalCode = event.target.postal.value;
    const enteredCity = event.target.city.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    // Submit cart data
    props.onCheckoutSubmit({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameClasses = `${styles.control} ${
    formInputsValidity.name ? "" : styles.invalid
  }`;

  const streetClasses = `${styles.control} ${
    formInputsValidity.street ? "" : styles.invalid
  }`;

  const postalCodeClasses = `${styles.control} ${
    formInputsValidity.postalCode ? "" : styles.invalid
  }`;

  const cityClasses = `${styles.control} ${
    formInputsValidity.city ? "" : styles.invalid
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your name:</label>
        <input type="text" id="name" name="name" autoComplete="off" />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street:</label>
        <input type="text" id="street" name="street" autoComplete="off" />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor="postal">Postal code:</label>
        <input type="text" id="postal" name="postal" autoComplete="off" />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code!</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" autoComplete="off" />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
