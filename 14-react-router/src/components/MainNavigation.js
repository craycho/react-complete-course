import { NavLink } from "react-router-dom";

import styles from "./MainNavigation.module.css";

const MainNavigation = function () {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            {/* isActive prop je built-in u react te ga callback funkcija u
            NavLink prima automatski. Dio je objekta pa isti destructure prvo.*/}
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              end
            >
              {/*"end" prop je isto kao i end=true. Mijenja default behavior koji je provjeravao da 
                li path POCINJE sa "/" (sto je uvijek tacno), dok ovako provjerava da li ZAVRSAVA (tacno samo za home)  */}
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="products"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
