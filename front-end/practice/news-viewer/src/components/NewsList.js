import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import axios from '../../node_modules/axios/index';
import NewsItem from './NewsItems';

const API_KEY = 'fe54cdadefde4e49b2836e5f176356a3';
const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true);
      try {
        const query = category === 'all' || !category ? '' : `&category=${category}`;
        const { data } = await axios.get(`http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${API_KEY}`);
        const { articles } = data;
        setArticles(articles);
      }catch(e){
        console.error(e);
      }
      setLoading(false);
    }
    fetchData();

  }, [category])

  if(loading){
    return (
      <NewsListBlock>loading..</NewsListBlock>
    )
  }
  if(!articles){
    return null;
  }
  
  return (
    <NewsListBlock>
       {articles.map(article => (
        <NewsItem article={article} key={article.url}></NewsItem>  
      ))} 
    </NewsListBlock>

  )
  
}





export default NewsList;