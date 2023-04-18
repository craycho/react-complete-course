import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import RootLayout from "./pages/Root";
import ProductDetailPage from "./pages/ProductDetail";

// import { createRoutesFromElements, Route } from "react-router-dom";

// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<Products />} />
//   </Route>
// );

// const router = createBrowserRouter(routeDefinitions);

const router = createBrowserRouter([
  {
    path: "/", // U primjerima /root
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> }, // index:true === path: "", tj. automatski se loada za parent route
      { path: "products", element: <Products /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
    ],
  },
]);
// ":" signaluje react-router DOM da je dio iza dvotacke dinamican. "productId" je sadrzan u params objektu
// brisanje "/" ispred products pretvara path u relative. Sto znaci da se appendaju parent pathu "/root/products" a ne od pocetka "/products"

function App() {
  return <RouterProvider router={router} />;
}

export default App;
