import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BulkSMS from "./pages/BulkSMS";

function Pages() {
  return (
    <Router>
      <Routes>
        <Route path="/bulksms" element={<BulkSMS />} />
      </Routes>
    </Router>
  );
}

export default Pages;
