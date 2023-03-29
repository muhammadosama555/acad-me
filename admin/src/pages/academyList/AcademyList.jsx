import "./academyList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDeleteAcademy, useGetAcadimies } from "../../apiCalls/academyApiCalls";

export default function AcademyList() {

 const {isLoading:isAcadamiesLoading,data,isError:isAcadamiesError,error:AcadamiesError} = useGetAcadimies()
 const {mutate, isLoading, isError, error} = useDeleteAcademy();

 if (isAcadamiesLoading) {
  return <h2>...isLoading</h2>
}

if (isAcadamiesError) {
  return <h2>{AcadamiesError.message}</h2>
}

 if (isLoading) {
  return <h2>...isLoading</h2>
}

if (isError) {
  return <h2>{error.message}</h2>
}

  const handleDelete = (academyId) => {
     mutate(academyId)
  };


  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "website",
      headerName: "Website",
      width: 120,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/academy/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
               onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <div style={{ padding: "10px 0px" }}>
        <Link to="/newAcademy">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
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
