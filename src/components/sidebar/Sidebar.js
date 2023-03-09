import './style.scss';
import logo from "../../assets/images/image 2.png";
import {Link} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const Sidebar = () => {
    const location = useLocation();
    const handleRemove = () => {
        let element = document.getElementById("dashboard");
        element.classList.remove("active");
    }
    return(
        <div>
            <header>
                <div className={'title'}>
                    <img src={logo} alt={''}/>
                    <div className={'side-title'}>
                        <h1>Super Jets</h1>
                        <span>by Chronicle</span>
                    </div>
                </div>
                <div className={'routes'} onClick={handleRemove}>
                    {
                        [
                            {title:"DASHBOARD", path:"/dashboard"},
                            {title:"AIRDROPS", path:"/airdrop"},
                        ].map(item=>
                            <div key={item.path}>
                                <Link to={item.path}
                                      className={item.path === location.pathname ? "active" : null}
                                      id={item.path === location.pathname ? "dashboard" : null}
                                ><span>{item.title}</span></Link>
                            </div>
                        )
                    }
                </div>
            </header>
        </div>
    )
}