import axios from "axios";

export const createOrderGhn = orderId => async dispatch => {
	try {
		const { data } = await axios.post(
			`https://be-production-05ac.up.railway.app/order/update/${orderId}`
		);
		dispatch({ type: "CREATE_ORDER_GHN", payload: data });
	} catch (error) {
		dispatch({ type: "CREATE_ORDER_GHN_FAIL", payload: error });
	}
};

export const PrintOrderGhn = orderId => async dispatch => {
	try {
		const { data } = await axios.get(
			`https://be-production-05ac.up.railway.app/order/print/${orderId}`
		);
		window.open(data);
		dispatch({ type: "PRINT_ORDER_GHN", payload: data });
	} catch (error) {}
};
