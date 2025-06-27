import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFound from "../NotFound/NotFound";
import { formatPrice } from "../../utils/format";
import "./ProductDetail.css";

function ProductDetail({products, addToCart, removeFromCart, getQuantityOfItemInCart }) {
  
  const { productId } = useParams();
  const [product, setProduct] = useState(null); // stores product details
  const [isFetching, setIsFetching] = useState(false); // set to true
  const [error, setError] = useState(null);


  useEffect(() => {

    // const functino here to get product details 
    const fetchProductDetails = async() => {
      setIsFetching(true);

      try {
        const response = products.find((product) => product.id === parseInt(productId))
        setProduct(response); // need to update the product state with what i fetched
        setIsFetching(false);
      } catch (error) {
        setError("Error fetching product details")
        console.log(error.message)
      }

    };
    fetchProductDetails();

  }, [])

  if (error) {
    return <NotFound />;
  }

  if (isFetching || !product) {
    return <h1>Loading...</h1>;
  }

  const quantity = getQuantityOfItemInCart(product);

  const handleAddToCart = () => {
    if (product.id) {
      addToCart(product)
    }
  };

  const handleRemoveFromCart = () => {
    if (product.id) {
      removeFromCart(product);
    }
  };

  return (
    <div className="ProductDetail">
      <div className="product-card">
        <div className="media">
          <img src={product.image_url || "/placeholder.png"} alt={product.name} />
        </div>
        <div className="product-info">
          <p className="product-name">{product.name}</p>
          <p className="product-price">{formatPrice(product.price)}</p>
          <p className="description">{product.description}</p>
          <div className="actions">
            <button onClick={handleAddToCart}>Add to Cart</button>
            {quantity > 0 && <button onClick={handleRemoveFromCart}>Remove from Cart</button>}
            {quantity > 0 && <span className="quantity">Quantity: {quantity}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}


export default ProductDetail;