import React from "react";
import "./Footer.css";

function Footer(props) {
  return (
    <section id="footer">
      <div className="footer">
        <div className="footer-top">
          <div className="footer-top-name">
            <h2>Hoang Ha</h2>
          </div>
          <div className="footer-top-about">
            <h2>Hệ thống cửa hàng</h2>
            <ul>
              <li>
                <li>Hà nội</li>
                <p>120 Thái Hà</p>
                <p>037.437.xxxx (Kỹ thuật)</p>
                <p>398 Cầu Giấy, Q. Cầu Giấy</p>
                <p>Điện thoại: 096.1111.xxx (Bán hàng)</p>
                <p>42 Phố Vọng, Hai Bà Trưng</p>
                <p>Điện thoại: 0979.884xxx (Bán hàng)</p>
              </li>
              <li>
                <li>Đà Nẵng</li>
                <p>97 Hàm Nghi, Q.Thanh Khê</p>
                <p>Điện thoại: 096.123.9xxx - 097.123.9xxx</p>
              </li>
              <li>
                <li>TP HCM</li>
                <p>123 Trần Quang Khải, Q.1</p>
                <p>Điện thoại: 0965.123.xxx - 0969.520.xxx</p>
                <p>602 Lê Hồng Phong, P.10, Q.10</p>
                <p>Điện thoại: 097.1111.xxx - 097.3333.xxx</p>
              </li>

              {/* <li>
                <a>
                  <img src="https://theme.hstatic.net/1000075078/1000610097/14/gov.png?v=664"></img>
                </a>
              </li> */}
            </ul>
          </div>
          <div className="footer-top-sp">
            <h2>Quy định - Chính Sách</h2>
            <ul>
              <li>Chính sách bảo hành</li>
              <li>Chính sách vẩn chuyển</li>
              <li>chinh sách đổi trả hàng</li>
              <li>Chính sách bảo mật thông tin</li>
              <li>Hướng dẫn thanh toán</li>
              <li>Hướng dẫn mua hàng online</li>
              <li>Dịch vụ ship COD toàn quốc</li>
            </ul>
          </div>
          <div className="footer-top-delivery">
            <h2>Liên Hệ </h2>
            <ul>
              <li>
                <a>Gmail: </a>
              </li>
              <li>
                <a></a>
              </li>
              <li>
                <a>Zalo: 09xxxxxxx</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <p>
            
          </p>
        </div>
      </div>
    </section>
  );
}

export default Footer;
