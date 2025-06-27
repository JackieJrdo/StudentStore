import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import { calculateTotal } from "../../utils/calculations";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";

function App() {

  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: ""});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);


  useEffect(() => { // runs after component renders essentially

    setIsFetching(true);

    // fetch function
    const fetchProducts = async () => {
      try {
        // get request using endpoint i made
        const response = await axios.get("http://localhost:3000/product");
        setProducts(response.data); // setter function to set state with data from the response
      } catch (error) {
        setError("Error fetching products")
      }
      setIsFetching(false);
    }

    fetchProducts();
  }, []) // empty dependency array, runs only once

  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnCheckout = async () => {
    setIsCheckingOut(true);

    let cartArray = [];
    let subTotal = 0;

    // prep that subtotal
    for (const productId in cart ){
      const quantity = cart[productId];
      const product = products.find((p) => p.id === parseInt(productId));
      console.log(product);
    if (!product) continue;
      cartArray.push({
        productId: parseInt(productId),
        quantity: quantity,
        price: product.price,
      })
      console.log(cartArray)
      console.log(product.price)
      subTotal += product.price * quantity;
      console.log("here", subTotal)

    }

    const total = calculateTotal(subTotal);

    // creating the order
    const orderInfo = {
      customer: userInfo.name,
      total: total,
      status: "Confirmed",
      // createdAt: new Date().toISOString()
      orderItems: cartArray
    };

    try {
      const orderResponse = await axios.post("http://localhost:3000/order", orderInfo)  // send cart and userInfo (FIX) to backend to make the order
      const orderId = orderResponse.data.id;

      for (const item of cartArray){
        await axios.post("http://localhost:3000/orderItem", {

          orderId: orderId,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price

        });
      }

      //--------------------------
      // HERE: create order items for each cart item
      
      // loop through each item in cart
      // POST to order item
      // specify orderId, productId, quantity, and price
      //--------------------------
      
      // have to store the response in an order state
      setOrder(orderResponse.data);
      setCart({}); // clear cart so user can start a new one
      setError(null); 
      setUserInfo({ name: "", dorm_number: "", email: ""});

    } catch (error) {
      setError("Error populationg the order with order items")
    }
    setIsCheckingOut(false);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/products/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
 