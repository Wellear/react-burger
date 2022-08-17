import AppHeader from '../app-header/app-header';
import { useState, useEffect } from 'react';
import styles from './app.module.css';
import BurgerIngredients from '../burger-conf/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-conf/burger-constructor/burger-constructor';
import { getIngredients } from '../../utils/API';

const App = () => {
  const [ingredientsList, setList] = useState({
    ingredients: [],
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    const getData = async () => {
      setList((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      try {
        const data = await getIngredients();
        setList((prevState) => ({
          ...prevState,
          ingredients: data.data,
          isLoading: false,
        }));
      } catch {
        setList((prevState) => ({
          ...prevState,
          isLoading: false,
          hasError: true,
        }));
      }
    };
    getData();
  }, []);

  return (
    <div className={`${styles.app} custom-scroll app-container`}>
      <AppHeader />
      <main className={styles.content}>
        {ingredientsList.isLoading && "Загрузка..."}
        {ingredientsList.hasError && "Ой, кажется что-то пошло не так..."}
        {!ingredientsList.isLoading &&
          !ingredientsList.hasError &&
          ingredientsList.ingredients.length && (
            <>
              <BurgerIngredients ingredients={ingredientsList.ingredients} />
              <BurgerConstructor ingredients={ingredientsList.ingredients} />
            </>
          )}
      </main>
    </div>
  );
};

export default App;
