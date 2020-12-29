import React from 'react';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';


const NewsPages = ({ match }) => {

  console.log(match)
  const category = match.params.category || 'all';

  return (
    <>
      <Categories/>
      <NewsList category={category}></NewsList>

    </>
  )
}

export default NewsPages;