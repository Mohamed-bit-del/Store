import React from 'react'

function ProductCard({
    srcImg,
    altImg,
    price,
    title,
    category,
    isHorizontal
}) {

    const truncateTitle = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    const cardLayoutClass = isHorizontal ? 'flex-col justify-center' : 'flex-row';

    return (
        <div className={`flex ${cardLayoutClass} items-center gap-14`}>
            <img 
                src={srcImg}
                alt={altImg}
                className='w-40 h-40'
                loading="lazy"
            />
            <div className="flex flex-col items-center gap-2">
                <h2 className='w-52 text-center font-medium text-gray-600 truncate' title={title}>
                    {truncateTitle(title, 4)}
                </h2>
                <h3 className='font-medium text-center'>{category}</h3>
                <p className='text-center font-medium text-gray-600'>{price + '$'}</p>
            </div>
        </div>
    )
}

export default ProductCard