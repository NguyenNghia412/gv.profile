## API
- Data nằm trong api get api/core/khcn/gv/thong-tin-chung/{mans}

### Response
```
{
    "status": 1,
    "data": {
        ...
        "chiSoNghienCuu": {
            "orcidAccount": string?,
            "linkOrcidAccount": string?,
            "gScholarAccount": string?,
            "linkGScholarAccount": string?
        }
    },
    "code": 200,
    "message": "Ok"
}
```

## FE
- Lấy dữ liệu từ trường chiSoNghienCuu
- Tên mục: Các thông tin về chỉ số nghiên cứu
- Vị trí: Để ở dưới mục Quá trình nghiên cứu khoa học, dưới cùng
- Hiển thị theo kiểu thứ tự như sau:
    - Chỉ số định danh ORCID: 
        + Mã số tài khoản: orcidAccount
        + Link: linkOrcidAccount
    - Hồ sơ Google scholar: 
        + Tên tài khoản: gScholarAccount
        + Link: linkGScholarAccount
