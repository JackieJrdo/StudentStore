import { Link } from "react-router-dom"
import codepath from "../../assets/codepath.svg"
import { formatPrice } from "../../utils/format"
import "./ProductCard.css"

function ProductCard({ product, quantity, addToCart, removeFromCart }) {
  return (
    <div className="ProductCard">
      <div className="media">
        <Link to={`/products/${product.id}`}>
          {product.image_url ? <img src={product.image_url} alt="product cover" /> : <img src={codepath} alt="product cover" />}
        </Link>
      </div>
      <div className="product-info">
        <div className="info">
          <p className="product-name">{product.name}</p>
          <p className="product-price">{formatPrice(product.price)}</p>
        </div>
        <div className="actions">
          <div className="buttons">
            <i className="material-icons" onClick={addToCart}>
              add
            </i>
            <i className="material-icons" onClick={removeFromCart}>
              remove
            </i>
          </div>

          {quantity ? (
            <span className="quantity">
              <span className="amt">{quantity}</span>
            </span>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default  ProductCard;
