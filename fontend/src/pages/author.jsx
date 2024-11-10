import React from 'react'
import FormAction from '../componemt/Form'
import { useLoaderData, useParams } from 'react-router-dom';
 const Book = () => {
  const { authorId } = useParams();
  const initialData = useLoaderData();
  return (
    <FormAction type={"author"} id={authorId} initialData={initialData}/>
  )
}

export default Book 