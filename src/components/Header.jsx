import React, { useState, useEffect, useContext } from 'react';
import { FaArrowLeftLong } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { useLocation } from 'react-router-dom';
import { BsCart } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { calculateTotalQuantity } = useContext(CartContext);
  const totalQuantity = calculateTotalQuantity();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const header = [
    'new in',
    'shop by',
    'women',
    'men',
    'designers',
    'clothing',
    'shoes',
    'bags',
    'accessories',
    'jewellery',
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    return () => {window.removeEventListener('resize', handleResize);};
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="my-5">
      <div className="flex justify-between items-center lg:block">
        <div className="flex items-center mb-5">
          <Link to="/cart" className="text-lg font-bold ms-10">
            <span className='bg-red-800 text-white rounded-full w-5 h-5 flex justify-center items-center text-[14px] relative top-1 right-1'>
              {totalQuantity}
            </span>
            <BsCart className='text-[20px]' />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center w-full gap-5 flex-wrap">
            {header.map((el, idx) => (
              <Link
                key={idx}
                to={el === 'men' && '/'}
                className={`text-[12px] md:text-[14px] font-semibold hover:cursor-pointer hover:text-black
                          ${el === 'men' && currentPath === '/'  ? 'text-black' : 'text-gray-500'}
                    `}
              >
                {el.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}

        <div className="flex lg:hidden justify-between px-5 items-center my-5">
          <button
            onClick={toggleMenu}
            className="text-gray-700 text-xl font-semibold hover:text-black"
          >
            <AiOutlineMenu />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={toggleMenu}
          />

          {/* Sliding Menu */}
          <div className="fixed top-0 right-0 h-full w-[70%] bg-white shadow-lg z-20 flex flex-col p-6">
            <button
              onClick={toggleMenu}
              className="text-gray-700 text-xl font-semibold self-end hover:text-black mb-4"
            >
              <AiOutlineClose />
            </button>
            {header.map((el, idx) => (
              <button
                key={idx}
                onClick={() => {
                  toggleMenu();
                }}
                className={`text-left text-[14px] font-semibold py-2 $
                        ${el === 'men' && currentPath === '/' ? 'text-black' : 'text-gray-500'}
                  `}
              >
                {el.toUpperCase()}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Header Banner */}
      <div className="h-10 bg-black text-white flex items-center justify-center gap-2">
        <FaArrowLeftLong className="text-[16px] md:text-[20px]" />
        <Link to="/" className="text-center text-[12px] md:text-[14px] font-semibold">
          MEN
        </Link>
      </div>
    </div>
  );
}

export default Header;
