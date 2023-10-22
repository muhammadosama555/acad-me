// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: {}, // Stores the selected courses
  shippingInfo: {}, // Stores shipping information
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { course, userId } = action.payload;

      // Create a user-specific cart if it doesn't exist
      if (!state.cart[userId]) {
        state.cart[userId] = [];
      }

      const existingCourse = state.cart[userId].find(
        (item) => item._id === course._id
      );

      if (!existingCourse) {
        // If it's a new course for this user, add it to their cart
        state.cart[userId].push({ ...course, userId });
      }
    },
    removeFromCart: (state, action) => {
      const { courseId, userId } = action.payload;
      if (state.cart[userId]) {
        // Remove the course from the user's cart
        state.cart[userId] = state.cart[userId].filter(
          (course) => course._id !== courseId
        );
      }
    },
    clearCart: (state, action) => {
      const { userId } = action.payload;
      // Clear the user's cart
      state.cart[userId] = [];
    },
    saveShippingInfo: (state, action) => {
      const { shippingInfo, userId } = action.payload;
      // Update the shipping information for this user
      state.shippingInfo[userId] = shippingInfo;
    },

  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  saveShippingInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
