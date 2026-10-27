## Mục đích
Mô tả data-table hiển thị sách xuất bản, tài liệu

## API
### Response
```
{
    "status": 1,
    "data": {
        "items": [
            {
                "id": int?,
                "ten": string?,
                "nhaXuatBan": string?,
                "tenNhomTheLoai": string?,
                "chiSoISBN": string?,
                "dsThanhPhanThamGia": string?
            }
        ],
        "totalItems": 2,
        "customData": null
    },
    "code": 200,
    "message": "Ok"
}
```
## FE
### Data-table
- Các cột:
    - TT: Số thứ tự tự sinh trên FE
    - Tên sách: ten
    - Nhà xuất bản: nhaXuatBan
    - Tên các tác giả: dsThanhPhanThamGia
    - Loại sách: hiển thị theo kiểu tenNhomTheLoai, chiSoISBN. Căn trái