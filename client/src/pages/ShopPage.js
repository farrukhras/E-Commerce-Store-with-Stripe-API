import React, { useEffect} from 'react';

// Import Redux 
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../components/storeSlice';

// Import pages
import ProductsListSection from '../components/ProductsListSection';

function ShopPage() {
  const { categories, isCategoriesFetched } = useSelector((state) => state.store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div>
      {
        !isCategoriesFetched ? <p>Fetching products categories...</p> :
        categories.map((category, idx) => (
          <div key={idx}>
            <h2 key={idx} style={{textAlign: "center"}}>{category.toUpperCase()}</h2>
            <ProductsListSection category={category} />
            <br />
          </div>
        ))
      }
    </div>
  );
}

export default ShopPage;