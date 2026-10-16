## Mục đích
Mô tả data-table hiển thị thông tin giải thưởng

## API
### Response
{
    "status": 1,
    "data": [
        {
            "thuHang": string?,
            "id": int,
            "tenGiaiThuong": string?,
            "tenCongTrinh": string?,
            "ngayCap": datetime?,
            "idThuHang": null,
            "moTa": string?
        }
    ],
    "code": 200,
    "message": "Ok"
}

## FE
### Data-table
- Các cột:
    - TT: Số thứ tự tự sinh trên FE
    - Tên giải thưởng, tên công trình: tenGiaiThuong
    - Thứ hạng: thuHang
    - Năm tặng thưởng: ngayCap dạng yyyy
    - Mô tả: moTa