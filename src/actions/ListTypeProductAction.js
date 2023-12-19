import axios from "axios";

export const getAllTypeProduct = () => async dispatch => {
	try {
		const { data } = await axios.get(
			"https://be-production-05ac.up.railway.app/typeList"
		);
		dispatch({ type: "GET_ALL_TYPE_PRODUCT", payload: data });
	} catch (error) {}
};

export const CreateNewTypeProduct = type => async dispatch => {
	try {
		const { data } = await axios.post(
			`https://be-production-05ac.up.railway.app/typeList/create`,
			type
		);
		dispatch({ type: "CREATE_NEW_TYPE_PRODUCT", payload: data });
	} catch (error) {}
};

export const deleteTypeProduct = type => async dispatch => {
	try {
		const { data } = await axios.delete(
			`https://be-production-05ac.up.railway.app/typeList/delete/${type._id}`
		);
		dispatch({ type: "DELETE_TYPE_PRODUCT", payload: data });
	} catch (error) {}
};
