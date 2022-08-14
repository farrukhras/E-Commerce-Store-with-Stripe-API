import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  // products: [],
  loading: false,
  isCategoriesFetched: false,
  totalCount: 0,
  cartItems: [],
  totalPrice: 0,
};

export const fetchCategories = createAsyncThunk(
  'store/fetchCategories',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories')
    .then((res) => res.json())
    
    return response;
  }
);

// export const fetchProducts = createAsyncThunk(
//   'store/fetchProducts',
//   async (category) => {
//     const response = await fetch(`https://fakestoreapi.com/products/category/jewelery?limit=4`)
//     .then((res) => res.json())
//     let data = {};
//     data["category"] = category;
//     data["data"] = response;
//     return data;
//   }
// );

const storeSlice = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    // reducers go here
    addToCart: (state, action) => {
      const existingCartItemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id === action.payload.id
      );
      
      if(existingCartItemIndex !== -1) {
        state.cartItems[existingCartItemIndex].quantity = state.cartItems[existingCartItemIndex].quantity + 1;
      } else {
        let newCartItem = {
          "id": action.payload.id,
          "data": action.payload,
          "quantity": 1
        }
        state.cartItems.push(newCartItem);
      }
      state.totalCount = state.totalCount + 1;
      state.totalPrice = state.totalPrice + action.payload.price;
    },

    addItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id === action.payload.id
      );

      state.cartItems[itemIndex].quantity = state.cartItems[itemIndex].quantity + 1;
      state.totalCount = state.totalCount + 1;
      state.totalPrice = state.totalPrice + state.cartItems[itemIndex].data.price;
    },

    removeItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id === action.payload.id
      );
      
      state.totalPrice = state.totalPrice - state.cartItems[itemIndex].data.price;
      if (state.cartItems[itemIndex].quantity === 1) {
        state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id);
      } else {
        state.cartItems[itemIndex].quantity = state.cartItems[itemIndex].quantity - 1;
      }
      state.totalCount = state.totalCount - 1;
    }, 

    clearItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        cartItem => cartItem.id === action.payload.id
      );

      const countToRemove = state.cartItems[itemIndex].quantity;
      state.totalPrice = state.totalPrice - (state.cartItems[itemIndex].quantity)*(state.cartItems[itemIndex].data.price);
      state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== action.payload.id);
      state.totalCount = state.totalCount - countToRemove;
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    }
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.loading = true;
      state.isCategoriesFetched = false;
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.loading = false;
      state.isCategoriesFetched = true;
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.loading = false;
      state.isCategoriesFetched = false;
    },

    // [fetchProducts.pending]: (state, action) => {
    //   state.loading = true;
    // },
    // [fetchProducts.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.products = [...state.products, action.payload]
    // },
    // [fetchProducts.rejected]: (state, action) => {
    //   state.loading = false;
    // }
  }
})

export const {
  addToCart,
  addItem,
  removeItem,
  clearItem,
  clearCart
} = storeSlice.actions;

export default storeSlice.reducer;