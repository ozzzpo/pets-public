import { createSlice } from "@reduxjs/toolkit";
import { Pet } from "../../types/pet.interfaces";
import {
  addPet,
  deletePet,
  getAllPets,
  getPetById,
  getPetsByStatus,
} from "./actions";
import { removeDuplicateObjects } from "../../utils/functions/DeleteDuplicates";
import { stat } from "fs";

interface PetsState {
  pets: Pet[] | undefined;
  filteredPets: Pet[] | undefined;
  status: "ready" | "loading" | "failed";
  error: string | null;
  currentPet: Pet | undefined;
  isModalOpen: boolean;
  modalStatus: "ready" | "loading" | "failed";
}
const initialState: PetsState = {
  pets: [],
  filteredPets: [],
  status: "ready",
  error: null,
  currentPet: undefined,
  isModalOpen: false,
  modalStatus: "ready",
};
const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    findPetByName: (state, action) => {
      state.filteredPets = state.pets?.filter((pet) =>
        pet.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    resetCurrentPet: (state) => {
      state.currentPet = undefined;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPet.fulfilled, (state) => {
        state.status = "ready";
      })
      .addCase(addPet.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getAllPets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllPets.fulfilled, (state, action) => {
        state.status = "ready";
        state.pets = removeDuplicateObjects(action.payload);
        state.filteredPets = state.pets;
      })
      .addCase(getAllPets.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deletePet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePet.fulfilled, (state) => {
        state.status = "ready";
      })
      .addCase(getPetsByStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPetsByStatus.fulfilled, (state, action) => {
        state.status = "ready";
        state.pets = removeDuplicateObjects(action.payload);
        state.filteredPets = state.pets;
      })
      .addCase(getPetById.pending, (state) => {
        state.modalStatus = "loading";
      })
      .addCase(getPetById.fulfilled, (state, action) => {
        state.currentPet = action.payload;
        state.modalStatus = "ready";
      });
  },
});
export default petsSlice.reducer;
export const { findPetByName, resetCurrentPet, openModal, closeModal } =
  petsSlice.actions;
