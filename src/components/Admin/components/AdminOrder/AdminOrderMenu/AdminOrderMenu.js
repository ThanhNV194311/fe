import React from "react";
import { Link } from "react-router-dom";

function AdminOrderMenu(props) {
  return (
    <div className="order-menu">
      <Link to="/admin/order">Tất cả đơn hàng</Link>
    </div>
  );
}

export default AdminOrderMenu;
