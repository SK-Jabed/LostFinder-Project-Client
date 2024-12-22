import React from 'react';

const ItemCard = ({ item }) => {
    const {
      _id,
      postType,
      thumbnail,
      title,
      category,
      dateLost,
      location,
      description
    } = item || {};

    return (
        <div>
            {title}
        </div>
    );
};

export default ItemCard;