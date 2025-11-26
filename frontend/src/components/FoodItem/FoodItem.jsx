import './FoodItem.css';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { toast } from 'react-toastify';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  const handleAdd = () => {
    addToCart(id);
    toast.success(`${name} added to cart!`); // uses global ToastContainer
  };

  const handleRemove = () => {
    removeFromCart(id);
    toast.error(`${name} removed from cart!`); // uses global ToastContainer
  };

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + image} alt={name} />

        {!cartItems[id] ? (
          <img
            className='add'
            onClick={handleAdd}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className='food-item-counter'>
            <img
              onClick={handleRemove}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={handleAdd}
              src={assets.add_icon_green}
              alt="Add more"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price"><b>₹ </b>{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
