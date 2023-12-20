import React from "react";
import { useSelector } from "react-redux";
import "./Admin.css";
import { Router, Route, useHistory } from "react-router-dom";
import { createHashHistory } from "history"; // Import createHashHistory

import Sidebar from "./components/sidebar/Sidebar";
import Routes from "./components/Routes";

const hashHistory = createHashHistory(); // Create an instance of createHashHistory

function Admin(props) {
	const userSignin = useSelector(state => state.userSignin);
	const { userInfo, error } = userSignin;
	const history = useHistory();

	if (!userInfo || !userInfo.isAdmin) {
		history.push("/");
	}

	return (
		<Router history={hashHistory}>
			<Route
				render={props => (
					<div className={`layout`}>
						<Sidebar />
						<div className="layout__content">
							<div className="layout__content-main">
								<Routes />
							</div>
						</div>
					</div>
				)}
			></Route>
		</Router>
	);
}

export default Admin;
