import axios from "axios";

export const getAllSelectList = () => async dispatch => {
	try {
		const { data } = await axios.get(
			"https://be-production-05ac.up.railway.app/selectList"
		);
		dispatch({ type: "GET_ALL_SELECT_LIST", payload: data });
	} catch (error) {}
};

export const CreateSelectListItem = item => async dispatch => {
	try {
		const { data } = await axios.post(
			"https://be-production-05ac.up.railway.app/selectList/create",
			item
		);
		dispatch({ type: "CREATE_SELECT_LIST_ITEM", payload: data });
	} catch (error) {}
};

export const UpdateSelectListItem = item => async dispatch => {
	try {
		const { data } = await axios.put(
			`https://be-production-05ac.up.railway.app/selectList/update/${item._id}`,
			item
		);
		dispatch({
			type: "UPDATE_SELECT_LIST_ITEM",
			payload: {
				...data,
				property: data.property.toLowerCase(),
			},
		});
	} catch (error) {}
};

export const getSelectListItemById = id => async dispatch => {
	try {
		const { data } = await axios.get(
			`https://be-production-05ac.up.railway.app/selectList/detail/${id}`
		);
		dispatch({ type: "GET_SELECT_LIST_ITEM_BY_ID", payload: data });
	} catch (error) {}
};

export const deleteSelectListItemById = id => async dispatch => {
	try {
		const { data } = await axios.delete(
			`https://be-production-05ac.up.railway.app/selectList/delete/${id}`
		);
		dispatch({ type: "DELETE_SELECT_LIST_ITEM_BY_ID", payload: data });
	} catch (error) {}
};
