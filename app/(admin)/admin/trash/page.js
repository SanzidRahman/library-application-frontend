"use client";
import DataTable from "@/components/application/admin/media/DataTable";
import DeleteActionButton from "@/components/application/category/DeleteActionButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { columnsConfig } from "@/helper/columnsConfig";
import {
  DT_CATEGORY_COLUMN,
  DT_ORDER_COLUMN,
  DT_PRODUCT_COLUMN,
  DT_PRODUCTVARIANT_COLUMN,
} from "@/lib/columns";
import { useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

// const TRASH_CONFIG = {
//   category: {
//     title: "Catrgoty Trash",
//     columns: DT_CATEGORY_COLUMN,
//     fetchUrl: "/api/category",
//     exportUrl: "/api/category/export",
//     deleteUrl: "/api/category/delete",
//   },
//   product: {
//     title: "Product Trash",
//     columns: DT_PRODUCT_COLUMN,
//     fetchUrl: "/api/product",
//     exportUrl: "/api/product/export",
//     deleteUrl: "/api/product/delete",
//   },
//   product: {
//     title: "Product Varient Trash",
//     columns: DT_PRODUCT_VARIANT_COLUMN,
//     fetchUrl: "/api/product-varient",
//     exportUrl: "/api/product-varient/export",
//     deleteUrl: "/api/product-varient/delete",
//   },
// };

const TRASH_CONFIG = {
  category: {
    title: "Category Trash",
    columns: DT_CATEGORY_COLUMN,
    fetchUrl: "/api/category",
    exportUrl: "/api/category/export",
    deleteUrl: "/api/category/delete",
  },

  product: {
    title: "Product Trash",
    columns: DT_PRODUCT_COLUMN,
    fetchUrl: "/api/product",
    exportUrl: "/api/product/export",
    deleteUrl: "/api/product/delete",
  },
  "product-varient": {
    title: "Product Trash",
    columns: DT_PRODUCTVARIANT_COLUMN,
    fetchUrl: "/api/product-varient",
    exportUrl: "/api/product-varient/export",
    deleteUrl: "/api/product-varient/delete",
  },
  order: {
    title: "Order Trash",
    columns: DT_ORDER_COLUMN,
    fetchUrl: "/api/order",
    exportUrl: "/api/order/export",
    deleteUrl: "/api/order/delete",
  },
};

const TrashView = () => {
  const searchParams = useSearchParams();
  const trashOf = searchParams.get("trashof");

  const config = TRASH_CONFIG[trashOf];

  const columns = useMemo(() => {
    return columnsConfig(config.columns, false, false, true);
  }, [config]);

  const action = useCallback((row, handleDelete, deleteType) => {
    return [
      <DeleteActionButton
        key="delete"
        handleDelete={handleDelete}
        row={row}
        deleteType={deleteType}
      />,
    ];
  }, []);

  return (
    <div className=" ">
      <Card className={"rounded-none w-250"}>
        <CardHeader className={"border-b [.border-b]:py-2"}>
          <div className="flex  justify-between px-4">
            <CardTitle>{config.title}</CardTitle>
            <div className="flex gap-2"></div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            queryKey={`${trashOf}-data-deleted`}
            fetchUrl={config.fetchUrl}
            initialPageSize={10}
            columnsConfig={columns}
            exportEndPoint={config.exportUrl}
            deleteEndPoint={config.deleteUrl}
            createAction={action}
            deleteType="PD"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TrashView;
