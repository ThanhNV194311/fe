import React from "react";
import { useDispatch } from "react-redux";
import { AddToCart } from "../../actions/CartAction";
import { Link } from "react-router-dom";
import { formatPrice } from "../../untils/index";
import Product from "../HotSale/Product";
import { Descriptions } from "antd";

function DetailInfo(props) {
  const dispatch = useDispatch();
  const { product } = props;
  console.log({ product });

  function handleAddProduct(product) {
    const action = AddToCart(product);
    dispatch(action);
  }

  return (
    <div className="detail-info-right">
      <div className="detail-info-right-price">
        <p className="price-box">
          <span className="saleprice">{formatPrice(product.salePrice)}đ</span>
          <span className="old-price">
            Giá niêm yết :{" "}
            <strong className="price">{formatPrice(product.price)}đ</strong>{" "}
          </span>
        </p>
        <p className="detail-info-sale">
          Sản phẩm thuộc chương trình HOT SALE CUỐI TUẦN - Nhanh tay thanh toán!
        </p>
      </div>

      <div className="detail-info-right-buy">
        <div className="detail-info-right-buy-now">
          <Link to="/cart" onClick={() => handleAddProduct(product)}>
            <strong>MUA NGAY</strong>
            <br></br>
            <span>(Giao tận nơi hoặc lấy tại cửa hàng)</span>
          </Link>
        </div>
        <div className="detail-info-right-buy-installment">
          <a href="">
            <strong>TRẢ GÓP 0%</strong>
            <br></br>
            <span>(Xét duyệt qua điện thoại)</span>
          </a>
          <a href="">
            <strong>TRẢ GÓP QUA THẺ</strong>
            <br></br>
            <span>(Visa, Master, JCB)</span>
          </a>
        </div>
        <Descriptions
          style={{
            marginTop: "10px",
          }}
          column={1}
          title="Thông tin điện thoại"
          bordered
          labelStyle={{
            width: "50%",
          }}
          contentStyle={{
            width: "50%",
            textAlign: "right",
          }}
          size={"small"}
        >
          <Descriptions.Item label="Tên">{product.name}</Descriptions.Item>
          <Descriptions.Item label="Hệ điều hành">
            {product.special}
          </Descriptions.Item>
          <Descriptions.Item label="Màn hình">
            {product.screen}
          </Descriptions.Item>
          <Descriptions.Item label="Bộ nhớ">{product.rom} GB</Descriptions.Item>
          <Descriptions.Item label="Ram">{product.ram} GB</Descriptions.Item>
          <Descriptions.Item label="Pin">
            {product.battery} mah
          </Descriptions.Item>
          <Descriptions.Item label="Camera">{product.camera}</Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  );
}

export default DetailInfo;
