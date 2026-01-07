import {
  ResponseBaseApiModel,
  ResponseBaseModel,
} from "@/models/response.models";
import axiosClient from "./api_services";
import { IDetailProfile, IProfile } from "@/models/profile.model";

export const ProfileUserApi = {
  getListProfile(
    pageSize: number,
    pageNumber: number
  ): Promise<ResponseBaseApiModel<IProfile[]>> {
    return axiosClient.get(
      `/api/core/khcn/gv/thong-tin-chung?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
  },

  getProfileById(id: any): Promise<ResponseBaseModel<IDetailProfile>> {
    return axiosClient.get(`/api/core/khcn/gv/thong-tin-chung/${id}`);
  },
};
