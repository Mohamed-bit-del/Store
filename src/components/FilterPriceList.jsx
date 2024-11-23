import React from 'react';
import { FaListUl } from "react-icons/fa6";
import { BiGridAlt } from "react-icons/bi";
import CustomDropdown from './CustomDropDown';

function FilterPriceList({
    priceFilter,
    isHorizontal,
    setIsHorizontal,
    handlePriceFilterChange,
}) {

  const priceOptions = [50, 100, 150];
  const priceLabels = priceOptions.map(price => `/ ${price}`);
  const dropDownOptions = ['Store By Latest1', 'Store By Latest2', 'Store By Latest3']; 

  return (
    <div className="flex items-center justify-between flex-col md:flex-row">
      <ul className='flex items-center'>
        <ol className='text-gray-500'>Home/ &nbsp;</ol>
        <ol>Men</ol>
      </ul>

      <div className="flex items-center lg:gap-10 flex-col md:gap-2 md:flex-row">
          <div className="flex items-center space-x-4 my-4">
            <p className='text-black text-[14px] font-bold'>Show : </p>

            {priceOptions.map((price, index) => (
              <button
                key={index}
                onClick={() => handlePriceFilterChange(price)} // Pass price value dynamically
                className={`font-bold ${priceFilter === price ? 'text-black' : 'text-gray-500'}`}
              >
                {priceLabels[index]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
              <span className={`cursor-pointer ${isHorizontal ? 'text-gray-500' : 'text-black'}`} onClick={() => setIsHorizontal(false)}>
                  <FaListUl/>
              </span>

              <span className={`cursor-pointer ${isHorizontal ? 'text-black' : 'text-gray-500'}`} onClick={() => setIsHorizontal(true)}>
                  <BiGridAlt/>
              </span>
          </div>

          <CustomDropdown 
            options={dropDownOptions}
          />
        </div>
    </div>
  )
}

export default FilterPriceList