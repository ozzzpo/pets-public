import { createAsyncThunk } from "@reduxjs/toolkit";
import { petsApi } from "../../api/services/pets.service";
import { Pet } from "../../types/pet.interfaces";

export const addPet = createAsyncThunk(
  "pets/addPet",
  async (pet: Pet, { rejectWithValue }) => {
    try {
      const response = await petsApi.addPet(pet);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const getPetsByStatus = createAsyncThunk(
  "pets/getPetsByStatus",
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await petsApi.getPetsByStatus(status);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);
export const getAllPets = createAsyncThunk(
  "pets/getAllPets",
  async (_, { rejectWithValue }) => {
    try {
      const res1 = await petsApi.getPetsByStatus("available");
      const res2 = await petsApi.getPetsByStatus("pending");
      const res3 = await petsApi.getPetsByStatus("sold");
      return res1.data.concat(res2.data).concat(res3.data);
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const getPetById = createAsyncThunk(
  "pets/getPetById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await petsApi.getPetById(id);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const updatePet = createAsyncThunk(
  "pets/updatePet",
  async (pet: Pet, { rejectWithValue }) => {
    try {
      const response = await petsApi.updatePet(pet);
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);

export const deletePet = createAsyncThunk(
  "pets/deletePet",
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await petsApi.deletePet(id);
      dispatch(getAllPets());
      return response.data;
    } catch (error: any) {
      rejectWithValue(error.response.data);
    }
  }
);
