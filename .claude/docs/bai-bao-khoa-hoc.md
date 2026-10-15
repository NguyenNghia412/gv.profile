## Mục đích
Mô tả data-table hiển thị 3. Công bố khoa học trên tạp chí trong nước, quốc tế

## API
### Response
```
### Response
{
  "status": 1,
  "data": 
    {
    "isi": [
        {
            "tenTacGia": string?,
            "id": int?,
            "tenBaiBao": string?,
            "tenTapChi": string?,
            "ngayXuatBan": datetime?,
            "idTheLoai": int?
        }
    ],
    "scopus": [
        {
            "tenTacGia": string?,
            "id": int?,
            "tenBaiBao": string?,
            "tenTapChi": string?,
            "ngayXuatBan": datetime?,
            "idTheLoai": int?
        }
    ],
    "quocTeKhac": [{
            "tenTacGia": string?,
            "id": int?,
            "tenBaiBao": string?,
            "tenTapChi": string?,
            "ngayXuatBan": datetime?,
            "idTheLoai": int?
        }],
    "hdgsnn": [
        {
            "tenTacGia": string?,
            "id": int?,
            "tenBaiBao": string?,
            "tenTapChi": string?,
            "ngayXuatBan": datetime?,
            "idTheLoai": int?
        }
    ],
    "khac": [
        {
            "tenTacGia": string?,
            "id": int?,
            "tenBaiBao": string?,
            "tenTapChi": string?,
            "ngayXuatBan": datetime?,
            "idTheLoai": int?
        }
    ]
    },
  "code": 200,
  "message": "Ok"
}
```

## FE
### Group
- Data table chia làm 5 phần (5 group):
    - Bài báo quốc tế thuộc danh mục ISI: isi
    - Bài báo quốc tế thuộc danh mục Scopus: scopus
    - Bài báo tạp chí, hội thảo quốc tế khác: quocTeKhac
    - Bài báo trên tạp chí khoa học trong nước thuộc danh mục HDGSNN: hdgsnn
    - Bài báo tạp chí, hội thảo khoa học khác: khac
### Data-table
- Các cột:
    - TT: Số thứ tự tự sinh trên FE theo từng group
    - Tên bài báo: tenBaiBao
    - Tên các tác giả: tenTacGia
    - Tên tạp chí/hội thảo, số, tập, trang, số ISSN, số DOI, chỉ số H Index: tenTapChi
    - Năm công bố: ngayXuatBan format yyyy