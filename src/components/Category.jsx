import React from 'react'
import CustomDropdown from './CustomDropDown';

function Category() {
    const dropDownOptions = ['Product Category1', 'Product Category2', 'Product Category3']; 

    return (
        <div className="w-[300px]">
            <CustomDropdown
                options={dropDownOptions}
            />
        </div>
    )
}

export default Category