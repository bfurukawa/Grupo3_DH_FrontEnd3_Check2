import DetailCard from "../Components/DetailCard";
import React from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";


const Detail = () => {
  let parametro = useParams();
  return (
    
    <>
    
      <DetailCard parametro = {parametro} />
    </>
  )
}

export default Detail