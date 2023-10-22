import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDeleteOrder, useGetOrders } from "../../apiCalls/orderApiCalls";
import Loader from '../../components/Loader'

export default function OrderList() {
  const {isLoading:isOrdersLoading,data,isError:isOrdersError,error:ordersError} = useGetOrders()
  const {mutate, isLoading, isError, error} = useDeleteOrder();
 
  if (isOrdersLoading) {
    return <Loader/>
 }
 
 if (isOrdersError) {
   return <h2>{ordersError.message}</h2>
 }
 
  if (isLoading) {
    return <Loader/>
 }
 
 if (isError) {
   return <h2>{error.message}</h2>
 }
 
   const handleDelete = (orderId) => {
      mutate(orderId)
   };

console.log(data)

  const columns = [
    { field: "_id", headerName: "ID", width: 90 }, 
    { field: "totalAmount", headerName: "Total", width: 250 },
    { field: "paymentStatus", headerName: "Payment", width: 250 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="orderListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="orderList">
      <DataGrid
        rows={data?.data.data}
        getRowId={(row) => row._id}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
