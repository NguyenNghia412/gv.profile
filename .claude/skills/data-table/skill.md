---
name: data-table
description: Hướng dẫn sử dụng DataTable component để render bảng dữ liệu có phân trang trong dự án này.
---

Khi cần render một bảng dữ liệu có phân trang, dùng component `DataTable` tại `@/components/pages/data-table`.

## Import

```ts
import { DataTable, CELL_VIEW_TYPES } from "@/components/pages/data-table";
```

## Props của DataTable

| Prop | Type | Default | Mô tả |
|---|---|---|---|
| `title` | `string` | — | Tiêu đề thanh xanh phía trên bảng |
| `columns` | `Column<T>[]` | — | Định nghĩa cột |
| `data` | `T[]` | — | Mảng dữ liệu |
| `loading` | `boolean` | — | Hiện skeleton khi `true` |
| `showStt` | `boolean` | `true` | Hiện cột TT (số thứ tự) đầu bảng |
| `currentPage` | `number` | — | |
| `totalPages` | `number` | — | |
| `pageSize` | `number` | — | |
| `totalItems` | `number` | — | |
| `startItem` | `number` | — | |
| `endItem` | `number` | — | |
| `onPageChange` | `(page: number) => void` | — | |
| `onPageSizeChange` | `(size: number) => void` | — | |

## Props của Column<T>

| Field | Type | Default | Mô tả |
|---|---|---|---|
| `label` | `string` | — | Tiêu đề cột |
| `field` | `keyof T` | — | Tên field trong data object |
| `className` | `string` | `"font-bold text-center"` | Class ô header |
| `cellClass` | `string` | — | Class ô body |
| `viewType` | `CellViewType` | `CELL_VIEW_TYPES.TEXT` | Kiểu format giá trị |

## CELL_VIEW_TYPES

```ts
CELL_VIEW_TYPES.TEXT      // hiển thị nguyên giá trị
CELL_VIEW_TYPES.DATE      // format thành DD/MM/YYYY
CELL_VIEW_TYPES.DATETIME  // format thành DD/MM/YYYY HH:mm:ss
```

Nếu giá trị null/undefined hoặc parse date thất bại thì giữ nguyên giá trị gốc.

## Pattern chuẩn: usePagination hook

Khai báo helper `usePagination` trực tiếp trong file page (không export):

```ts
function usePagination(initialPageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalItems, setTotalItems] = useState(0);

  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return {
    setTotalItems,
    tableProps: {
      currentPage, pageSize, totalItems, totalPages, startItem, endItem,
      onPageChange: setCurrentPage,
      onPageSizeChange: setPageSize,
    },
  };
}
```

`tableProps` chứa đúng các pagination props mà DataTable cần. Dùng `{...section.tableProps}` để spread — không bị lỗi TypeScript do thừa setter.

## Ví dụ đầy đủ

```tsx
const sachXB = usePagination();
const [listSachXB, setListSachXB] = useState<ISachXuatBan[]>([]);
const [loadingSachXB, setLoadingSachXB] = useState(true);

useEffect(() => {
  setLoadingSachXB(true);
  ProfileUserApi.getListSachXuatBan(
    sachXB.tableProps.pageSize,
    sachXB.tableProps.currentPage,
    mans
  )
    .then((res) => {
      setListSachXB(res.data.items);
      sachXB.setTotalItems(res.data.totalItems);
    })
    .catch(console.error)
    .finally(() => setLoadingSachXB(false));
}, [sachXB.tableProps.currentPage, sachXB.tableProps.pageSize, mans]);

// JSX
<DataTable<ISachXuatBan>
  title="Sách xuất bản"
  columns={[
    { label: "Tên", field: "ten" },
    { label: "Nhà xuất bản", field: "nhaXuatBan", cellClass: "text-center" },
    { label: "Ngày xuất bản", field: "ngayXuatBan", cellClass: "text-center", viewType: CELL_VIEW_TYPES.DATE },
    { label: "Niên học", field: "nienHoc", cellClass: "text-center" },
  ]}
  data={listSachXB}
  loading={loadingSachXB}
  {...sachXB.tableProps}
/>
```

## Lưu ý

- Luôn truyền type parameter `<DataTable<MyType>>` để TypeScript kiểm tra `field` đúng kiểu.
- Mỗi section dùng instance `usePagination()` riêng để state phân trang độc lập nhau.
- DataTable tự xử lý: loading skeleton, "Không có dữ liệu", tính số thứ tự TT, và render Pagination.
