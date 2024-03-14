import { useQuery } from '@tanstack/react-query';
import React from 'react'
import {useParams} from 'react-router-dom'
import { Nav } from '../../components/Nav/Nav';
import "./SingleItem.css"
const SingleItem = () => {
    const {itemID} = useParams();

    const {isLoading, error, data} = useQuery({
      queryKey: ["single product"],
      queryFn: async () => {
        //const response = await fetch(`http://localhost:3000/items/${itemID}`);
        const response = await fetch(`http://localhost:3000/items/${itemID}`);
        const data = await response.json();
        console.log(data)
        return data
      }
    })

    if(isLoading) {
        return <p>Loading...</p>;
    }
    if(error){
        return <p>{"Something went wrong..." + error.message}</p>;
    }
  
  return (
    <div>
        <Nav></Nav>
        <div className='singleItem'>
        <img src={data.image}/>
        <p>{data.title}</p>
        <h1>{data.description}</h1>
        <p>{data.price}$</p>
        </div>
    </div>
  )
}

export default SingleItem