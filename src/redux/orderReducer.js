import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  status: "loading",
  orderData: [],
  dataChanged: false,
};
const url = "http://localhost:5000/api/order/";
export const fetchOrders = createAsyncThunk(
  "orders/getOrders",
  async (payload) => {
    const data = await axios.post(`${url}fetch`, payload);
    return data;
  }
);
export const createOrder = createAsyncThunk(
  "orders/createOrders",
  async (payload) => {
    await axios.post(`${url}create`, payload);
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrders",
  async (payload) => {
    await axios.put(`${url}delete`, payload);
  }
);
const orderReducer = createSlice({
  name: "Orders",
  initialState,
  extraReducers: {
    [fetchOrders.pending]: (state) => {
      state.status = "loading";
    },
    [fetchOrders.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.orderData = action.payload.data;
    },
    [fetchOrders.rejected]: (state) => {
      state.status = "rejected";
    },
    [createOrder.pending]: (state) => {
      state.status = "loading";
    },
    [createOrder.fulfilled]: (state) => {
      state.status = "succeeded";
      state.dataChanged = !state.dataChanged;
    },
    [createOrder.rejected]: (state) => {
      state.status = "rejected";
    },
    [deleteOrder.pending]: (state) => {
      state.status = "loading";
    },
    [deleteOrder.fulfilled]: (state) => {
      state.status = "succeeded";
      state.dataChanged = !state.dataChanged;
    },
    [deleteOrder.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export default orderReducer.reducer;
