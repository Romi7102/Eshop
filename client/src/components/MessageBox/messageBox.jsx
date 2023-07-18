import React from "react";
import { Alert } from "react-bootstrap";

const MassageBox = ({ children, variant }) => {
  return (
    <div className="text-center">
      <Alert variant={variant || "info"}>{children}</Alert>
    </div>
  );
};

export default MassageBox;