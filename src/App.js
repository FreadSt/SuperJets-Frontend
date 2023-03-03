import './App.scss';
import {Sidebar} from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {Navbar} from "./components/navbar/Navbar";
import {Airdrop} from "./pages/airdrop/Airdrop";
import {Upload} from "./pages/dashboard/upload/Upload";

function App() {
  return (
      <Router>
          <div className="App">
              <Sidebar/>
              <Navbar/>
              <div className={'pages'}>
                  <Routes>
                      <Route path={'/dashboard'} element={<Dashboard/>}/>
                      <Route path={'/dashboard/upload'} element={<Upload/>}/>
                      <Route path={'/airdrop'} element={<Airdrop/>}/>
                  </Routes>
              </div>
          </div>
      </Router>
  );
}

export default App;
