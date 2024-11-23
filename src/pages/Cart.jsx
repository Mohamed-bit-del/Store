import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { fetchProducts } from '../services/api';
import Container from '../helper/Container';

function Cart() {
  const { cart, removeFromCart, calculateTotal } = useContext(CartContext);
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch product data
  useEffect(() => {
    const getProductData = async () => {
      try {
        const data = await fetchProducts();
        setProductData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getProductData();
  }, []);

  // Merge cart items with fetched product data
  const mergedCart = cart.map((cartItem) => {
    const product = productData.find((p) => p.id === cartItem.id) || {};
    return {
      ...cartItem,
      ...product,
    };
  });

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <h2 className='mb-10 text-4xl'>Total: ${calculateTotal().toFixed(2)}</h2>

      <div className='flex flex-col items-start gap-14'>
        {mergedCart.map((item) => (
          <div key={item.id} className="flex items-start gap-14 border-b pb-10 w-full">
            <button onClick={() => removeFromCart(item.id)} className='text-red-900 font-black'>X</button>
            <div className="flex items-center flex-col sm:flex-row gap-5">
              <img
                src={item.image}
                alt={item.title}
                className="w-40 h-40"
              />
              <div className='flex flex-col items-center gap-2'>
                <h2 className='w-52 text-center font-medium text-gray-600 truncate'>{item.title || 'Unknown Product'}</h2>
                <p className='font-medium text-center text-gray-600'>${item.price?.toFixed(2) || '0.00'}</p>
              </div>
            </div>
            </div>
        ))}
      </div>
    </Container>
  );
}

export default Cart;
