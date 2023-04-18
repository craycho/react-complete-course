import { Link, useNavigate } from "react-router-dom";

const HomePage = function () {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("products");
    // Koristi se za programmatical navigating, button je samo za primjer
  }

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to <Link to="products">the list of products</Link>
      </p>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
};

// <Link to> je isto sto i <a href>, samo sto ne senda HTTP request koji bi reloadao citav page, vec potrazi router

export default HomePage;
