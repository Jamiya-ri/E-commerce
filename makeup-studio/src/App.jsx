import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerRoutes from "./CustomerUI/Routes/CustomerRoutes";
import AdminRoutes from "./admin/Routes/AdminRoutes";
import ClientRoutes from "./admin/Routes/ClientRoutes";

function App() {
  return (
      <Routes>
        {/* Customer UI */}
        <Route path="/*" element={<CustomerRoutes />} />

        {/* Admin Panel */}
        <Route path="/admin/*" element={<AdminRoutes />} />


       {/* Client Panel */}
        <Route path="/client/*" element={<ClientRoutes />} />

        
      </Routes>
  );
}

export default App;
