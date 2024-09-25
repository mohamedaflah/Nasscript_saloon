import { IProperty, PropertyInitial } from "@/types/property.types";
import { createSlice } from "@reduxjs/toolkit";
import {
  deleteProperty,
  getAllProperties,
  getPropertyWithId,
  getPropertyWithUser,
  propertyAdd,
  updateProperty,
} from "../actions/propertyAction";
import toast from "react-hot-toast";

const initialState: PropertyInitial = {
  loading: false,
  error: false,
  properties: null,
  property: null,
};
const propertyReducer = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(propertyAdd.pending, (state) => {
        state.loading = true;
      })
      .addCase(propertyAdd.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
        toast.success("Service / Product Submitted");
      })
      .addCase(propertyAdd.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
      })
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProperty.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.type == "status") {
          state.properties = state.properties?.map((prop) => {
            if (prop._id == payload.propertyId) {
              return { ...prop, status: payload.status };
            } else {
              return prop;
            }
          }) as IProperty[];
        }
        toast.success("property updated");
      })
      .addCase(updateProperty.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
        toast.error(state.error);
      })
      .addCase(getAllProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProperties.fulfilled, (state, { payload }) => {
        state.properties = payload.properties;
        state.loading = false;
      })
      .addCase(getAllProperties.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
      })
      .addCase(getPropertyWithId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPropertyWithId.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.property = payload.property;
        state.error = false;
      })
      .addCase(getPropertyWithId.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
      })
      .addCase(getPropertyWithUser.pending, (state) => {
        state.loading = false;
      })
      .addCase(getPropertyWithUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.properties = payload.properties;
        state.error = false;
      })
      .addCase(getPropertyWithUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
      })
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProperty.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.properties = state.properties?.filter(
          (v) => v._id !== payload
        ) as IProperty[];
        state.error = false;
      })
      .addCase(deleteProperty.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = String(payload);
      });
  },
});

export default propertyReducer.reducer;
