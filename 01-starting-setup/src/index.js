import React from "react"; // Legacy code, nije potrebno u savremenom reactu ali dobro za imati
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

// TEST
import { Provider } from "react-redux";
import store from "./Test/test-store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
