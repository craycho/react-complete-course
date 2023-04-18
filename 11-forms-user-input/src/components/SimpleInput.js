import useInput from "../hooks/use-input";

/* "RULE": Ako koristim value samo jednom, npr. kada submittam form, bolji je ref.
  Ako mi je value potreban nakon svakog keystrokea (instant validation), bolji je state.*/

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== ""); // Proslijedjuje se validation funkcija

  // Kreiraju se dva odvojena statea unutar ova dva useInputa, koja persistaju kroz dalji lifecycle aplikacije
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = function (event) {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName, enteredEmail);

    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty.</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Must contain a valid e-mail.</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  ); // <button> je disabled ako je form invalid (!formIsValid)
};

export default SimpleInput;

/* OLD CODE:
if (event.target.value.trim() !== "") {
      // event.target.value umjesto enteredName jer je state change scheduled, 
      // ali nije jos promijenjen, pa bi se tek od drugog slova promijenio. 
      // setEnteredNameIsValid(true);
    }
    */
