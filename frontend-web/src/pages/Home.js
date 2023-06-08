import axios from '../axios'
import React, { useEffect,useState }  from "react";
import { Navbar, Button, Nav, NavDropdown , Container,Row ,Col, Modal } from "react-bootstrap";
import {Link} from 'react-router-dom'
import './layoutcss/Home.css'
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
import Gallery from '../components/Gallery';
import Slider from '../components/Slider';
// import Slider from './Slider'
function Home( ){
   
    const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

    return (
    <div> 
        


          <Slider/>
            <div className="featured-products-container container mt-4">
                <h2>// BÁN CHẠY NHẤT //</h2>
                {/* new products*/}
                
               
                <div className="d-flex justify-content-center flex-wrap ">
                    {products.slice(0, 12).map((product) => (<ProductPreview {...product} />))}
                    {/* {lastProducts.map((product) => (<ProductPreview {...product} />))} */}
                </div> 
               
               
                {/*  */}
                
                <div>
                    <Link to="/category/all" style={{ fontSize:"20px",textAlign: "center",display:"block",textDecoration: "none" }}>
                    Xem thêm {">>"}
                    </Link>
                </div>
             </div>

			 <Gallery/>
       
       </div> 
    )
 }
export default Home;

