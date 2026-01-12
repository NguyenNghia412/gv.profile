export interface IProfile {
    stt?: number;
    hoTen?: string;
    donVi?: string;
    coSo?: string;
    coSoKhoaHoc?: string;
    mans?: string;
    lyLichKhoaHoc?: string;
}

export interface IDetailProfile {
    idNhanSu?: string;
    maNhanSu?: string;
    hoVaTen?: string;
    ngaySinh?: string;
    noiSinh?: string;
    gioiTinh?: boolean;
    soDienThoai?: string;
    email?: string;
    tenChucVu?: string;
    tenPhongBan?: string;
    anhDaiDien?: string;
}

export interface ICongBoKhoaHoc {
    id?: number;
    tenVaiTro?: string;
    idLoaiDeTai?: number;
    maDeTai?: string;
    tenDeTai?: string;
    tenDeTaiURL?: string;
    idLinhVuc?: number;
    tenLinhVuc?: string;
    idDonViChuTri?: number;
    tenDonViChuTri?: string;
    idDonViChuTriBenNgoai?: number;
    tenDonViChiTriBenNgoai?: string;
    idCapDo?: number;
    tenCapDo?: string;
    idLoaiHinhNghienCuu?: number;
    tenLoaiHinhNghienCuu?: string;
    idPhongBanDuyet?: number,
    tenPhongBanDuyet?: string,
    mucTieu?: string,
    noiDung?: string,
    sanPham?: string,
    ngayBatDau?: string,
    ngayKetThuc?: string,
    idXepLoai?: number,
    tenXepLoai?: string,
    tongKinhPhi?: number,
    ungDungChuyenGiao?: string
}

export interface IBaiBaoCongBo {
    id?: string,
    tenBaiBao?: string,
    tenTapChi?: string,
    ngayXuatBan?: string,
    soGioQuyDoi?: number
}


export interface IGIaiThuongKHCN {
    id?: string,
    tenGiaiThuong?: string,
    tenCongTrinh?: string,
    ngayCap?: string,
    soGioQuyDoi?: number
}


export interface ISachXuatBan {
    id?: string,
    ten?: string,
    nhaXuatBan?: string,
    ngayXuatBan?: string,
    soGioQuyDoi?: number,
    nienHoc?: string,
}

export interface ITriTue {
    id?:string;
    tenTaiSanTriTue?:string;
    soHieu?:string;
    ngayCapBang?:string;
    ngayTao?:string;
    soGioQuyDoi?:string;
    nienHoc?:string;
}

