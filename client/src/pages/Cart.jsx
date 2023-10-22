import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../redux/reducers/cartReducers";
import { Link } from "react-router-dom";


const Cart = () => {

  const { cart } = useSelector((state) => state.cartSlice);
  const { currentUser } = useSelector((state) => state.userSlice);
  const userId = currentUser?.data._id

  const dispatch = useDispatch();
  
  const userCart = cart[userId] || [];

   // Handler to remove an item from the cart
   const handleRemoveFromCart = (courseId) => {
    dispatch(removeFromCart({ courseId, userId }));
  };

  // Handler to clear the entire cart for the user
  const handleClearCart = () => {
    dispatch(clearCart({ userId }));
  };

  return (
    <>
     {userCart.length === 0 ? (
        <h2 className="mt-5">Your cart is empty</h2>
     ) : ( 
         <>
        
          <div className="cart items-center flex justify-center lg:flex xl:flex lg:justify-center xl:justify-center">
            <div className="wrapper w-full my-20 shadow-lg mx-6 sm:max-w-xl md:max-w-[700px] lg:max-w-[960px] xl:max-w-[960px]">
              <div className="px-8 py-8 text-3xl">
                Your Cart: <b>{userCart.length} items</b>
              </div>
              <div className="cart-content flex flex-col lg:flex-row xl:flex-row lg:justify-between xl:justify-between gap-10 pb-10">
                <div className=" flex flex-col gap-4">
                {userCart.map((item) => (
                    <div
                      className="product flex gap-4 p-4 xs:flex-col sm:flex-col border border-gray-100 rounded"
                     
                    >
                      <div className="w-64 h-64 overflow-hidden rounded-md">
                        <img
                          className="object-cover"
                          src="images/profile.jpg"
                          alt=""
                        />
                      </div>
                      <div>
                        <div>
                        
                         {item.title}
                        </div>
                        <div className="price text-2xl font-semibold text-[#ffa600]">
                          <p>${item.tuition}</p>
                        </div>
                        <div className="flex lg:justify-center xl:justify-center gap-10">
                         
                          <div   onClick={() => handleRemoveFromCart(item._id)} className="text-2xl text-[#c32a2a] hover:cursor-pointer hover:text-[#ad2626]">
                            <i
                              className="fa-regular fa-trash-can"
                             
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>))}

                    <button  onClick={handleClearCart} className="bg-red-800 text-white">clear full cart</button>
           
                </div>

                <div className="summary lg:w-1/3 xl:w-1/3">
                  <div className="px-8">
                    <div className="border flex flex-col gap-5 shadow-lg border-[#e3e3e3] px-5 py-3 rounded-md ">
                      <h4 className="text-2xl mt-3">Order Summary</h4>
                      <hr />
                      <p>
                        Subtotal:{" "}
                        <span className="float-right font-semibold">
                          $ 
                         {userCart.reduce(
                            (acc, item) => acc + Number(item.tuition),
                            0
                          )}{" "}
                          
                        </span>
                      </p>
                      <p>
                        Est. total:{" "}
                        <span className="float-right font-semibold">
                          $
                          {userCart.reduce(
                            (acc, item) => acc + Number(item.tuition),
                            0
                          )} 
                        </span>
                      </p>
                      <hr />
                       
                      <Link to='/order/shipping' className="flex justify-center mt-5 pb-3">
                       
                        <button
                          className="text-white font-semibold bg-[#e79703] w-full py-3 rounded-md hover:bg-[#d87803] hover:transition-all"
                          id="login_button"
                          type="submit"
                        
                        >
                          Check out
                        </button>
                        </Link>
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          </>)}
      
    </>
  );
};

export default Cart;
