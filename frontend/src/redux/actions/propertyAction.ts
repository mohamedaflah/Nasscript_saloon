/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/constants/axiosInstance";
import { IProperty } from "@/types/property.types";
import { handleErrors } from "@/utils/handleError";
import { uploadImages } from "@/utils/uploadArrayImages";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const propertyAdd = createAsyncThunk(
  "property/add-property",
  async (property: IProperty, { rejectWithValue }) => {
    try {
      const urls = await uploadImages(property.images as unknown as File[]);
      property.images = urls as unknown as string | File[] | undefined;
      const { data } = await axiosInstance.post("/property/property", property);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateProperty = createAsyncThunk(
  "proprty/update-property",
  async (
    {
      sendPayload,
      propertyId,
      type = "normal",
    }: {
      propertyId: string;
      sendPayload: IProperty;
      type: "status" | "normal";
    },
    { rejectWithValue }
  ) => {
    try {
      const fileObjects = (sendPayload.images as any[])?.filter(
        (val) => typeof val !== "string"
      );
      sendPayload.images = (sendPayload.images as any[])?.filter(
        (val) => typeof val == "string"
      ) as unknown as string | File[] | undefined;
      const urls = await uploadImages(fileObjects);
      sendPayload.images = [...(sendPayload.images as Array<any>), ...urls] as
        | string
        | File[]
        | undefined;
      const { data } = await axiosInstance.put("/property/property", {
        data: sendPayload,
        propertyId,
      });

      return { ...data, type, status: sendPayload.status };
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
export const deleteProperty = createAsyncThunk(
  "proprty/delete-property",
  async (propertyId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/property/property?propertyId=${propertyId}`
      );
      data;
      return propertyId;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAllProperties = createAsyncThunk(
  "property/get-all",
  async (query: { userId: string; search: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `/property/property?userId=${query.userId}&search=${query.search}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getPropertyWithId = createAsyncThunk(
  "property/get-withid",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/property/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
export const getPropertyWithUser = createAsyncThunk(
  "property/get-withuser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`/property/withuser/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
