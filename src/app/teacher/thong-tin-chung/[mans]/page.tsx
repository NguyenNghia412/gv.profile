'use client'
import LoginToView from "@/components/pages/login-to-view";
import TeacherItemInfo from "@/components/pages/teacher/teacher-item-info";
import TeacherNameBlock from "@/components/pages/teacher/teacher-name-block";
import TeacherSectionTitle from "@/components/pages/teacher/teacher-section-title";
import { IDetailProfile } from "@/models/profile.model";
import {
    Building,
    LocateFixed,
    Mail,
    MapPin,
    MapPinned,
    Phone,
    User,
    VenusAndMars,
} from "lucide-react";
import { useEffect, useState } from "react";
import { ProfileUserApi } from "@/app/services/profile_user";
import Loading from "@/components/ui/loading";

interface DataIdProfile {
    params: {
        mans: string;
    };
}

const TeacherThongTinChungPage = ({ params }: DataIdProfile) => {
    const { mans } = params;
    const [profile, setProfile] = useState<IDetailProfile>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ProfileUserApi.getProfileById(mans)
            .then(res => {
                setProfile(res.data)
            })
            .catch(err => console.error(err))
            .finally(() => {
                setLoading(false)
            })
    }, [mans])

    return (
        <>
            {loading && <Loading size="md" text="Đang tải nội dung" />}
            {!loading && <div>
                <TeacherNameBlock
                    hoTen={profile?.hoVaTen ?? ""}
                    donVi={profile?.tenPhongBan ?? ""}
                    hocHam={profile?.tenChucVu ?? ""}
                    avatar={profile?.anhDaiDien}
                />

                <TeacherSectionTitle label={"Lý lịch sơ lược"} />
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                    <div className="border shadow-md">
                        <TeacherItemInfo icon={User} label="Ngày sinh" isNeedLogin={false} value={profile?.ngaySinh?.split("T")[0] ?? ""} />
                        <hr />
                        <TeacherItemInfo icon={VenusAndMars} label="Giới tính" value={profile?.gioiTinh ? "Nam" : "Nữ"} />
                        <hr />
                        <TeacherItemInfo
                            icon={MapPin}
                            label="Tỉnh/Thành phố"
                            value={profile?.noiSinh}
                        />
                        <hr />
                        <TeacherItemInfo
                            icon={Building}
                            label="Địa chỉ"
                            value="Số 54 Phố Triều Khúc, phường Thanh Xuân Nam, quận Thanh Xuân, thành phố Hà Nội"
                        />
                    </div>
                    <div className="border shadow-md">
                        <TeacherItemInfo icon={MapPinned} label="Cơ sở" value="Hà Nội" />
                        <hr />
                        <TeacherItemInfo
                            icon={LocateFixed}
                            label="Đơn vị"
                            value={profile?.tenPhongBan}
                        />
                        <hr />
                        <TeacherItemInfo
                            icon={Mail}
                            label="Email"
                            value={profile?.email}
                        />
                        <hr />
                        <TeacherItemInfo icon={Phone} label="Điện thoại" isNeedLogin={false} value={profile?.soDienThoai} />
                    </div>
                </div>
                <TeacherSectionTitle label={"Quá trình đào tạo"} />
                <div>
                    <LoginToView />
                </div>
                <h3 className="my-8 font-semibold text-3xl text-slate-600">
                    Quá trình công tác chuyên môn
                </h3>
                <div>
                    <LoginToView />
                </div>
            </div>}

        </>

    );
};

export default TeacherThongTinChungPage;
