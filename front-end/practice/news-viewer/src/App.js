import React, {useCallback, useState} from 'react';
import { Route } from 'react-router-dom';
import NewsPages from './pages/NewsPages';

const App = () => {


  return (
    <>
      <Route path="/:category?" component={NewsPages}></Route>
    </>
  )
}


/* const App = () => {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback(category => setCategory(category), []);


  return (
    <>
      <Categories category={category} onSelect={onSelect}/>
      <NewsList category={category}/>
    </>
  )
} */

export default App;