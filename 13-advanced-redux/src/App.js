import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-actions";

/* TOK PODATAKA:
  1) Reducers (metode) u cart-slice.js (addToCart i removeFromCart) i dalje dodaju i removeaju iteme u cartu, onom "lokalnom"
  2) Funkcije unutar cart-actions.js i ui-actions.js (fetchCartData() i sendCartData()) ce se pozvati
  samo kada se "chart" state promijeni (zahvaljujuci dependencies array u useEffectu) te one mijenjaju cart na Firebaseu
  3) Nakon sto se dispatchala funkcija, Redux toolkit zna sta raditi sa istom. On ne prihvaca samo returnane action 
  objects sa "type" i "payload", vec i funkcije, koje AUTOMATSKI POZIVA (npr. return async (dispatch) => {}) sa dispatch argumentom.
  Redux automatski poziva funkciju sa dispatch argumentom (iako je sama pozvana sa dispatch()), da mozemo ponovo dispatchati unutar iste.
  
  * Poenta ovoga jeste da reducer funkcije unutar sliceova ne mogu biti async, pa se moraju izvrsiti drugdje.
  TACNIJE: Da imamo action creators koji mogu perform "side-effects", koji ce dispatchati funkcije koje ce
  naposljetku doci do reducera. 
  
  NOTE: cartActions.addToCart() npr. je funkcija koja automatski returna action objekat, sto je isto kao da je return value
  exportovane action creator funkcije (poput fetchCartData()) returnao objekat {type: "", payload: ...}.
  Sve sto mi radimo jeste kreiramo takvu funkciju koja ne returna action objekat, nego funkciju koja ce se sama izvrsiti.
  TL;DR: cartActions.addToCart() je action creator isto kao i fetchCartData(), te oba handleamo tako sto ih dispatchamo.
*/

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
    // Ustvari se poziva kao: dispatch(async (dispatch) => {...});
  }, [dispatch]);

  // Radi useSelector se component re-renderuje kada god se state.cart promijeni
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      // Inace smo dispatchali funkcije koje returnaju function object sa "type" i "payload"
      dispatch(sendCartData(cart));
    }
    /* Ovdje se dispatcha function koji returna drugi function (return value sendCartdata(cart) je FUNKCIJA)
    te react zna automatski baratati sa dispatch argumentom unutar te funkcije.*/
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

/* ----- OLD CODE (sa useEffect) ----- 

const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data...",
        })
      );
      const response = await fetch(
        "https://react-http-redux-be05f-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
      const responseData = response.json(); NIJE POTREBAN DATA, samo postoji li error
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
*/
