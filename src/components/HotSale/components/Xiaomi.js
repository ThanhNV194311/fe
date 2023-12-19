import React, { useEffect, useState } from "react";
import axios from "axios";
import ListProduct from "../ListProduct";

import { handlePercentDiscount } from "../../../untils/index";
import { useDispatch } from "react-redux";

function Xiaomi(props) {
	const dispatch = useDispatch();
	const [name, setName] = useState("Xiaomi");
	const [hotXiaomi, setHotXiaomi] = useState([]);

	useEffect(() => {
		async function FetchApi() {
			try {
				const { data } = await axios.get(
					`https://be-production-05ac.up.railway.app/products/${name}`
				);
				setHotXiaomi(data);
			} catch (error) {}
		}
		FetchApi();
	}, []);

	return (
		<section id="hotsale">
			<div className="hotsale">
				<h2>{name}</h2>
				{hotXiaomi ? (
					<ListProduct
						HotSaleProducts={handlePercentDiscount(hotXiaomi)}
					></ListProduct>
				) : (
					""
				)}
			</div>
		</section>
	);
}

export default Xiaomi;
