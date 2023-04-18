import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import RootLayout from "./pages/Root";
import { lazy, Suspense } from "react";
// import BlogPage, { loader as postsLoader } from './pages/Blog';
// import PostPage, { loader as postLoader } from "./pages/Post";

/* BITNO:
  import() funkcija radi isto sto i import keyword, ali dynamically, tj. tek onda kad je pozvana.
  Ona vraca Promise, koji se handlea (sa then npr.) da se dobije module (.js fajl)
  Taj module sadrzi loader funkciju, pa istu mozemo pozvati sa .loader(). (Isto vazi i za sve ostalo u moduleu)

  NOTE: Moramo pozvati loader unutar funkcije, jer se ne poziva automatski kao sto bi bio slucaj sa loader: blogLoader,
*/

const BlogPage = lazy(() => import("./pages/Blog"));
// lazy() prima funkciju koja returna Promise, a returna JSX component <BlogPage>
// React nece pozvati ovu funkciju sve do prvog puta kada probamo renderovati taj component

const PostPage = lazy(() => import("./pages/Post"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            // <Suspense> ceka da se content loada prije nego ga renderuje te u medjuvremenu renderuje nesto drugo
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import("./pages/Blog").then((module) => module.loader()),
            // module.loader() returna promise (rezultat svega na kraju), pa arrow funkcija implicitno returna Promise
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            // Mogli smo i citav "meta" objekat umjesto {params} na oba mjesta
            loader: ({ params }) =>
              import("./pages/Post").then((module) =>
                module.loader({ params })
              ),
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
