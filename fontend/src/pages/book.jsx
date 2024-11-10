import React, { useEffect } from 'react'
import FormAction from '../componemt/Form'
import { useLoaderData, useParams } from 'react-router-dom';
 const Book = () => {
  const { bookId } = useParams();
  const initialData = useLoaderData();
  useEffect(() =>{
    console.log();
    
  },[])
  return (
    <FormAction type={"book"} id={bookId} initialData={initialData}/>
  )
}

export default Book 