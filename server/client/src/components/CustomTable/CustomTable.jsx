import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import CustomModal from "../CustomModal/CustomModal";
import { useNavigate } from 'react-router-dom';

function createData(item, labels) {
  const data = {};
  labels.forEach((label) => {
    data[label] = item[label];
  });
  return data;
}

export default function CustomTable({ items, labels, handleDelete, handleAction, fields }) {
  const navigate = useNavigate(); 

  const rows = items.map((item) => createData(item, labels));

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {labels.map((label) => {
              return <TableCell key={label} align="center">{label}</TableCell>;
            })}
            <TableCell align="center">actions</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {labels.map((label) => {
                if (label === "image") {
                  return (
                    <TableCell key={label} align="center">
                      <img src={row[label]} alt={label} onClick={() => navigate(`/items/${row._id}`)}></img>
                    </TableCell>
                  );
                } else if (label === "price") {
                  return (
                    <TableCell key={label} align="center">
                      {row[label]}$
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={label} align="center">
                      {row[label]}
                    </TableCell>
                  );
                }
              })}
              <TableCell align="center">
                
                <Button variant="text" onClick={() => handleDelete(row._id)}>
                  Delete
                </Button>
                <CustomModal title="Edit" handleAction={handleAction} fields={fields} id={row._id}/>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
