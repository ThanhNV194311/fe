import React, { useEffect, useState } from "react";
import axios from "axios";
import ListProduct from "../ListProduct";
import { handlePercentDiscount } from "../../../untils/index";
import { useDispatch } from "react-redux";

function Iphone(props) {
	const dispatch = useDispatch();
	const [name, setName] = useState("Apple");
	const [hotIphone, setHotIphone] = useState([]);
	useEffect(() => {
		async function FetchApi() {
			try {
				const { data } = await axios.get(
					`https://be-production-05ac.up.railway.app/products/${name}`
				);
				setHotIphone(data);
			} catch (error) {}
		}
		FetchApi();
	}, []);

	return (
		<section id="hotsale iphone">
			<div className="hotsale">
				<h2>{name}</h2>
				{hotIphone ? (
					<ListProduct
						HotSaleProducts={handlePercentDiscount(hotIphone)}
					></ListProduct>
				) : (
					""
				)}
			</div>
		</section>
	);
}

export default Iphone;
