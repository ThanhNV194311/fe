import React from 'react';
import { formatPrice } from '../../untils';
import './ShoppingCart.css'
import ListProduct from './ListProduct'
import { useDispatch, useSelector } from 'react-redux';
import {
    Link,
    useHistory
} from "react-router-dom";
import Header from '../header/Header';
import Footer from '../footer/Footer';

function Cart(props) {
    const history = useHistory()
    const cartItems = useSelector((state) => state.cart.cartItems);
    var userInfo = useSelector((state) => state.userSignin.userInfo);
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.qty * item.salePrice,
      0
    );

    const Order = () => {
      if (userInfo) {
        history.push("/order");
      } else {
        alert("ban can dang nhap");
        history.push("/login");
      }
    };

    return (
        <>
        <Header/>
        <section id="shopping-cart">
        <div className="shopping-cart">
          <div className="shopping-cart-header">
            {/* <Link to="/" className="back">
              Tiếp tục mua hàng
            </Link> */}
            <h2 className="shopping-cart-title">Giỏ hàng</h2>
          </div>

          {cartItems ? <ListProduct products={cartItems}></ListProduct> : ""}

          <div className="total-price">
            <span className="left">Tổng tiền</span>
            <span className="right">{formatPrice(totalPrice)}</span>
          </div>
          {totalPrice <= 0 ? (
            ""
          ) : (
            <div className="order" style={{marginBottom: '60px'}}>
              <Link onClick={() => Order()}> Đặt Hàng </Link>
            </div>
          )}
        </div>
      </section>
      <Footer />
      </>
    );


}

export default Cart;
