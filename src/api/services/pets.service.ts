import { apiClient } from "../instance";
import { AxiosResponse } from "axios";
import { Pet } from "../../types/pet.interfaces";
import { ApiResponse } from "../../types/apiResponse.interfaces";

export const petsApi = {
  addPet: (pet: Pet): Promise<AxiosResponse<Pet>> => {
    return apiClient.post<Pet>("/pet", pet);
  },
  getPetsByStatus: (status: string): Promise<AxiosResponse<Pet[]>> => {
    return apiClient.get<Pet[]>("/pet/findByStatus", { params: { status } });
  },
  getPetById: (id: number): Promise<AxiosResponse<Pet>> => {
    return apiClient.get<Pet>(`/pet/${id}`);
  },
  updatePet: (pet: Pet): Promise<AxiosResponse<Pet>> => {
    return apiClient.put<Pet>("/pet", pet);
  },
  deletePet: (id: number): Promise<AxiosResponse<ApiResponse>> => {
    return apiClient.delete<ApiResponse>(`/pet/${id}`);
  },
};
