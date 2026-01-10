import React, { useEffect, useState } from 'react'
import Card from './card.jsx'
import Loader from './Loader'

const News = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 100;

 function handlePrev() {
    setPage(page - 1);
  }

  function handleNext() {
    setPage(page + 1);
  }

  useEffect(()=>{
    setIsLoading(true);
    fetch(`https://news-aggrigator-server.onrender.com/all-news?page=${page}&pageSize=${pageSize}`)
  .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(myJson => {
        console.log('API Response:', myJson);
        if (myJson.success) {
          setTotalResults(myJson.total || 0);
          const articles = Array.isArray(myJson.data) ? myJson.data : [];
          console.log('Articles:', articles);
          setData(articles);
        } else {
          setError(myJson.message || 'An error occurred');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError('Failed to fetch news. Please try again later.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return (
    <>
      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      <div className='my-10 cards'>
        {!isLoading ? data.length > 0 ? data.map((element, index) => (
          <Card
            title={element.title}
            description={element.description}
            imgUrl={element.urlToImage}
            publishedAt={element.publishedAt}
            url={element.url}
            author={element.author}
            source={element.source.name}
            key={index}
          />
        )) : <p className='text-center text-gray-500'>No news found</p> : <Loader />}
      </div>
      {!isLoading && data.length > 0 && (
        <div className="pagination flex justify-center gap-14 my-10 items-center">
          <button disabled={page <= 1} className='pagination-btn text-center' onClick={handlePrev}>&larr; Prev</button>
          <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / pageSize)}</p>
          <button className='pagination-btn text-center' disabled={page >= Math.ceil(totalResults / pageSize)} onClick={handleNext}>Next &rarr;</button>
        </div>
      )}
    </>
  )
}


export default News
