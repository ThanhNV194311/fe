import React from 'react';
import {formatPrice} from '../../untils/index'
import { useDispatch } from 'react-redux'
import {AddToCart, DeleteToCart, DeleteQtyProduct} from '../../actions/CartAction'
import { message, Modal } from 'antd';
import Footer from '../footer/Footer';
Product.propTypes = {

};

function Product(props) {
    const { product } = props
    const dispatch = useDispatch()

    function handleDeleteProduct(product) {
        const action = DeleteToCart(product)
        dispatch(action);
    }

    function handleAddProduct(product) {
        const action = AddToCart(product)
        dispatch(action)
    }

    function handleProductOut(product) {
        const action =  DeleteQtyProduct(product)
        dispatch(action)
    }
    const success = () => {
        message.success({
            content: 'Xóa khỏi giỏ hàng thành công',
            duration: 1,
            className: 'custom-class',
            style: {
                position: 'absolute',
                right: '2rem',
                top: '4rem',
                margin: '1rem 0'
            },
          });
      };
    const modalConfrim = (product) => {
        Modal.confirm({
            title: "Xóa khỏi giỏ hàng",
            content: "Bạn có muốn xóa không?",
            cancelText: "Không",
            okText: "Có",
            onOk: () => {
                handleProductOut(product)
                success()
            },
          });
    }
    return (
        <>
                    <div className="shopping-cart-list-product">
            <div className="shopping-cart-list-product-block">
                <div className="shopping-cart-list-product-block-left">
                    <img src={product.image}></img>
                </div>
                <div className="shopping-cart-list-product-block-right">
                    <p className="product-name">
                        {product.name}
                    </p>
                    <p className="product-price">
                        {formatPrice(product.salePrice)}
                    </p>
                </div>
                
                <div className="shopping-cart-list-product-bottom">
                    <ul className="button-event">
                        <li onClick={() => handleDeleteProduct(product)}>-</li>
                        <li>{product.qty}</li>
                        <li onClick={() => handleAddProduct(product)}>+</li>
                    </ul>
                    <button className="delete-product" onClick={() => modalConfrim(product)}> Xóa khỏi giỏ hàng </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Product;