import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { fetchProductById } from '../services/api';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState(null);

  const imagesProducts = ['/images/1.png', '/images/2.png', '/images/3.jpg']
  const imagesLogo = ['/images/Logo1.jpg','/images/Logo3.png', '/images/Logo2.jpg', '/images/Logo3.png', '/images/Logo4.png']
  const sizeProduct = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        setSelectedImage(data?.image);
      }catch (err) {
        setError(err.message);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }
    addToCart(product, selectedSize);
  };

  const handleImageLogoClick = () => {
    alert(`User has sent money using in banking`);
  };

  if (!product) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-0 gap-10 items-center justify-between">
        {/* Left Side: Image Gallery */}
        <div className="flex lg:flex-col flex-wrap gap-5 items-center">
          <img
              src={product.image}
              alt={product.title}
              className="w-20 h-20"
              onClick={() => setSelectedImage(product.image)}
          />

          {imagesProducts.map((img, index) => (
            <img
              key={index}
              src={img}
              className="w-20 h-20"
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Center: Main Image */}
        <div className="lg:w-1/3 w-full px-4">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-50 h-50 object-cover"
          />
        </div>

        {/* Right Side: Product Details */}
        <div className="lg:w-1/3 w-full px-4">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">${product.price}</p>

          {/* Size Selector */}
          <div className="mb-4">
            <label htmlFor="size" className="block text-sm text-gray-600 mb-1">
              Size Guide
            </label>

            <select
              id="size"
              className="w-full bg-white border border-gray-300 p-2 rounded"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option>Choose an option</option>
              {sizeProduct.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white w-full py-2 rounded mb-4"
          >
            Add to Cart
          </button>
          <button className="bg-gray-100 text-gray-800 w-full py-2 rounded flex items-center justify-center mb-4">
            Pay with <span className="ml-2 font-bold">GPay</span>
          </button>

          {/* Payment Icons */}
          <div className="flex space-x-4">
            {imagesLogo.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Visa ${index + 1}`}
                className="w-10 h-8 cursor-pointer"
                onClick={handleImageLogoClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
