import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

export default function DiologeImage({ open, onClose }) {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Dialog One</DialogTitle>
        <DialogContent>i love you</DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
