import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import FilterPriceList from '../components/FilterPriceList';
import Container from '../helper/Container';
import Category from '../components/Category';

function ProductList  () {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState(50);
  const [isHorizontal, setIsHorizontal] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data.filter((product) => product.price < priceFilter));
      } catch (err) {
        setError(err.message);
      }
    };
    getProducts();
  }, [priceFilter]);

  const handlePriceFilterChange = (priceLimit) => {
    setPriceFilter(priceLimit);
    setFilteredProducts(products.filter((product) => product.price < priceLimit));
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <div className="flex gap-10 flex-col md:flex-row">
        <div className=" hidden lg:block">
          <Category/>
        </div>
        <div className="w-full">
          <FilterPriceList
            priceFilter={priceFilter}
            isHorizontal={isHorizontal}
            setIsHorizontal={setIsHorizontal}
            handlePriceFilterChange={handlePriceFilterChange}
          />

          <div className={`flex my-20 ${isHorizontal ? 'flex-wrap items-center gap-6' : 'flex-col gap-8'}`}>
            {filteredProducts.map((el, idx) => (
              <Fragment key={idx}>
                <Link to={`/product/${el?.id}`} className={`${isHorizontal ? '' : 'w-full border-b pb-2'}`}>
                  <ProductCard
                    srcImg={el?.image}
                    altImg={el?.title}
                    title={el?.title} 
                    price={el?.price}
                    category={el?.category}
                    isHorizontal={isHorizontal}
                  />
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductList;
