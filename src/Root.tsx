import './Root.css';
import { Outlet } from "react-router-dom";

export default function Root() {

  return (
      <div className="root-layout">
        <header className="root-layout-header">
          <h1>HEADER</h1>
        </header>
        <Outlet />
        <footer className="root-layout-footer">
          <h3>FOOTER</h3>
        </footer>
     </div>  
  );
}