import React from "react";
import AllRoutes from "./routes/AllRoutes";

import Issuereport from "./pages/StudentDashboard/Issuereport";
import { Sidebar } from "./components";
import { Button } from "./components/ui";

const App = () => {
  return (
    <div>
     <Button variant="default" size="lg" onClick={() => console.log("Clicked!")}>
  Default Button
</Button>

      {/* <Sidebar/> */}
      {/* <AllRoutes/> */}
     {/* <Issuereport/> */}
    </div>
  );
};

export default App;
