import {
    ResponseBaseApiModel,
    ResponseBaseModel,
} from "@/models/response.models";
import axiosClient from "./api_services";
import { IBaiBaoCongBo, ICongBoKhoaHoc, IDetailProfile, IGIaiThuongKHCN, IProfile, ISachXuatBan } from "@/models/profile.model";

export const ProfileUserApi = {

    getListProfile(pageSize: number, pageNumber: number): Promise<ResponseBaseApiModel<IProfile[]>> {
        return axiosClient.get(
            `/api/core/khcn/gv/thong-tin-chung?pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
    },

    getProfileById(id: any): Promise<ResponseBaseModel<IDetailProfile>> {
        return axiosClient.get(`/api/core/khcn/gv/thong-tin-chung/${id}`);
    },

    getListProfileCongBoKhoaHoc(pageSize: number, pageNumber: number, id: string): Promise<ResponseBaseApiModel<ICongBoKhoaHoc[]>> {
        return axiosClient.get(
            `/api/core/khcn/gv/cong-bo-kh/de-tai?mans=${id}&pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
    },

    getListBaiBaoCongBoKhoaHoc(pageSize: number, pageNumber: number, id: string): Promise<ResponseBaseApiModel<IBaiBaoCongBo[]>> {
        return axiosClient.get(
            `api/core/khcn/gv/cong-bo-kh/bai-bao?mans=${id}&pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
    },

    getListGiaiThuongKHCN(pageSize: number, pageNumber: number, id: string): Promise<ResponseBaseApiModel<IGIaiThuongKHCN[]>> {
        return axiosClient.get(
            `api/core/khcn/gv/cong-bo-kh/giai-thuong?mans=${id}&pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
    },

    getListSachXuatBan(pageSize: number, pageNumber: number, id: string): Promise<ResponseBaseApiModel<ISachXuatBan[]>> {
        return axiosClient.get(
            `api/core/khcn/gv/cong-bo-kh/tai-lieu?mans=${id}&pageSize=${pageSize}&pageNumber=${pageNumber}`
        );
    }
};
