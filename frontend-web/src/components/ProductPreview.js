import React from "react";
import {  Card } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import './layoutcss/ProductPreview.css'
function ProductPreview({ _id, name, pictures ,price}) {
    return (
        

         <LinkContainer to={`/product/${_id}`} style={{ cursor: "pointer", width: "13rem", margin: "10px" }}>
         <Card style={{ width: "20rem", margin: "10px" }}>
            
             <Card.Img  class="product-preview-img" src={pictures[0].url}/>
             
                <Card.Title class="product_name" max>{name}</Card.Title>
                <Card.Text class="product_price" >{price}₫ </Card.Text>
        
                     
         </Card>
     </LinkContainer>
    );
}

export default ProductPreview;