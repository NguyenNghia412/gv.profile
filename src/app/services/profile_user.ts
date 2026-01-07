import axiosClient from './api_services';

export const ProfileUserApi = {
    getListProfile(pageSize: number, pageNumber: number): Promise<any> {
        return axiosClient.get(`/api/core/khcn/gv/thong-tin-chung?pageSize=${pageSize}&pageNumber=${pageNumber}`);
    },


};
