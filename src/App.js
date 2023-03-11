import './App.scss';
import {Sidebar} from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {Navbar} from "./components/navbar/Navbar";
import {Airdrop} from "./pages/airdrop/Airdrop";
import {Upload} from "./pages/dashboard/upload/Upload";
import { useState } from 'react';
import { getAccount, signData } from "./utils/MetaMask";


async function adminLogin() {
    const from = await getAccount();
    if (!from){
        return false;
    }
    const res = await fetch('/admin/data');
    if (res.status == 200) {
        const data = await res.text();
        const sign = await signData(data);
        const loginRes = await fetch(`/admin/login?sign=${sign}`, {
            method: "POST"
        });
        return loginRes.status == 200;
    }
    return false;
}

let adminRequested = false;

function App() {
    const [isAdmin, setIsAdmin] = useState(false);

    const checkAdmin = () => {
        if (adminRequested) return;
        adminRequested = true;
        fetch("/admin/check").then((res)=>{
            adminRequested = false;
            if (res.status == 200) {
                setIsAdmin(true);
            } else if (res.status == 401) {
                adminLogin().then((res)=>{
                    if (res) {
                        checkAdmin();
                    }
                })
            }
        })
    }
    checkAdmin();

  return (
    isAdmin?
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
    :
    <div/>
  );
}

export default App;
