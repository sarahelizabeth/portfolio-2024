import React, { useEffect, useState } from 'react'
import API from '../../api';
import MediaItem from './MediaItem';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    API.get(`/api/bookshelf/media/?media_type=book&visible=true`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch(error => console.error('books list error: ', error));
  }, []);

  return (
    <div className='right-container'>
      {books.map((book, index) => (
        <MediaItem key={index} item={book} action='read' />
      ))}
    </div>
  );
}

export default Books