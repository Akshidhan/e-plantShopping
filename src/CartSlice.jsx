import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
        const found = state.items.find(item => item.name === action.payload.name);
        if (found) {
            found.quantity++;
        } else {
            state.items.push({ ...action.payload, quantity: 1 });
        }
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name === action.payload.name);
    },
    updateQuantity: (state, action) => {
        const plant = state.items.find(item => item.name === action.payload.name);
        if(plant){
            plant.quantity = action.payload.quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
