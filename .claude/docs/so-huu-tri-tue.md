## Mục đích
Mô tả data-table hiển thị thông tin sở hữu trí tuệ

## API
### Response
{
    "status": 1,
    "data": {
        "items": [
            {
                "id": int?,
                "tenTaiSanTriTue": string?,
                "soHieu": string?,
                "ngayCapBang": datetime?,
                "ngayTao": datetime?,
                "soGioQuyDoi": int?,
                "nienHoc": string?,
                "thanhPhanThamGia": string?
            }
        ],
        "totalItems": 1,
        "customData": null
    },
    "code": 200,
    "message": "Ok"
}

## FE
### Data-table
- Các cột:
    - TT: Số thứ tự tự sinh trên FE
    - Tên và nội dung văn bằng: tenTaiSanTriTue
    - Tác giả: thanhPhanThamGia
    - Số bằng: soHieu
    - Ngày cấp bằng: ngayCapBang