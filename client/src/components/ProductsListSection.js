import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';
import { Grid } from '@mui/material';

function ProductsListSection({category}) {
	const [productsList, setProductsList] = useState([]);

	useEffect(() => {
		fetch(`https://fakestoreapi.com/products/category/${category}?limit=4`)
		.then((response) => {
			return response.json()
		})
		.then((data) => {
			setProductsList(data)
		})
  }, []);

	return (
		<Grid container spacing={4} style={{padding: "15px 15px 15px 15px"}}>
			{productsList.map((prod) => (
				<Grid item xs={3} key={prod.id} justify="center">
					<ProductCard product={prod} />
				</Grid>
				))
			}
		</Grid>
	)
}

export default ProductsListSection;