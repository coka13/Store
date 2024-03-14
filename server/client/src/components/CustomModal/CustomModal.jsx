import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import "./CustomModal.css"

export default function CustomModal({
  title,
  initialValues,
  handleAction,
  id,
  fields,
 endIcon
}) {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues || {});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleAction(formValues, id);
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
    
      <Button size="large" endIcon={endIcon}  onClick={handleOpen}>{title}</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>

          <form className="modalForm" onSubmit={handleFormSubmit}>
            {fields.map((field) => {
                return(
              <TextField
                id={field}
                name={field}
                label={field}
                variant="outlined"
                value={formValues[field] || ""}
                onChange={handleInputChange}
              />);
            })}
            <div>
            <Button type="submit">Submit</Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
