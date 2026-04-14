import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-800">
      <Outlet />
    </div>
  );
};

export default App;
