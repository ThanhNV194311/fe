import React from "react";
import "./App.css";
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProductPage from "./pages/ProductPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import SearchPage from "./pages/SearchPage";
import AdminPage from "./pages/AdminPage";
import ResetScroll from "./components/ResetScroll/ResetScroll";
import MyOrderPage from "./pages/MyOrderPage";
import ChatPage from "./pages/ChatPage";
import PaymentPage from "./pages/PaymentPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

function App() {
	return (
		<div className="App">
			<Router>
				<ResetScroll />

				<Switch>
					<Route path="/" exact>
						<HomePage />
					</Route>

					<Route path="/login" exact>
						<LoginPage />
					</Route>

					<Route path="/register" exact>
						<SignupPage />
					</Route>

					<Route path="/product" exact>
						<ProductPage />
					</Route>

					<Route path="/detail/:id" exact>
						<DetailPage />
					</Route>

					<Route path="/cart" exact>
						<CartPage />
					</Route>

					<Route path="#/order" exact>
						<OrderPage />
					</Route>

					<Route path="/orderSuccess" exact>
						<OrderSuccessPage />
					</Route>

					<Route path="/payment" exact>
						<PaymentPage />
					</Route>

					<Route path="/MyOrder" exact>
						<MyOrderPage />
					</Route>

					<Route path="/search" exact>
						<SearchPage />
					</Route>

					<Route path="/chat" exact>
						<ChatPage />
					</Route>

					<Route path="/admin" exact>
						<AdminPage />
					</Route>

					{/* Redirect for unknown routes */}
					<Redirect to="/" />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
