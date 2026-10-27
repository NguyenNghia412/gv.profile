## Mục đích
Mô tả data-table hiển thị quá trình đào tạo

## API
### Response
{
  "status": 1,
  "data": [
    {
      "noiDaoTao": "" => string?,
      "chuyenMon": null => string?,
      "thoiGianBatDau": "2003-09-05T00:00:00" => nullable,
      "thoiGianKetThuc": null => datetime nullable,
      "namTotNghiep": 2008 => int?,
      "tenHocVi": "Kỹ sư => string?"
    },
  ],
  "code": 200,
  "message": "Ok"
}

## FE
### Data-table
- Các cột:
    - TT: Số thứ tự tự sinh trên FE
    - Thời gian: Hiển thị kiểu yyyy-yyyy
        - Trường hợp lý tưởng: lấy của thoiGianBatDau và thoiGianKetThuc
        - Trường hợp thoiGianKetThuc = null: hiển thị namTotNghiep
            - Nếu namTotNghiep = null: để trống chỉ hiển thị yyyy của thoiGianBatDau
        - Trường hợp thoiGianBatDau = null: để trống chỉ hiển thị yyyy của thoiGianKetThuc
        - Cả 2 thoiGian đều null: để trống
        - Cả 3 đều null: để trống
    - Tên cơ sở đào tạo: Hiển thị noiDaoTao
    - Chuyên ngành: Hiển thị nganhDaoTao
    - Học vị: Hiển thị tenHocVi