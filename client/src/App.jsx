import React from "react";
import AllRoutes from "./routes/AllRoutes";
import { Issuetable } from "./components";
import Test from "./components/Test";
import GoodCard from './components/GoodCard'
import Auth from "./components/Auth"
import Button from "./components/ui/Button";
import Textarea from "./components/ui/Textarea";
import Input from "./components/ui/Input";

const App = () => {
  return (
    <div>
      {/* <GoodCard/> */}
      {/* <Test/> */}
      {/* <AllRoutes /> */}
      {/* <div className="p-4 space-x-2">
      <Button variant="default" size="lg">Default Button</Button>
      <Button variant="outline">Outline Button</Button>
      <Button variant="destructive" size="sm">Destructive Button</Button>
    </div> */}
{/* <Textarea/> */}
<Input type='text'  placeholder='enter '/>
      {/* <IssueTracking/> */}
      {/* <Auth/> */}
    </div>
  );
};

export default App;
