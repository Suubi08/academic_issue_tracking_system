import React from "react";
import AllRoutes from "./routes/AllRoutes";
import { Issuetable } from "./components";
import Test from "./components/Test";
import GoodCard from './components/GoodCard'
import IssueTracking from "./components/IssueTracking";
import Auth from "./components/Auth"

const App = () => {
  return (
    <div>
      {/* <GoodCard/> */}
      {/* <Test/> */}
      {/* <AllRoutes /> */}
      {/* <IssueTracking/> */}
      <Auth/>
    </div>
  );
};

export default App;
