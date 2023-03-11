import './style.scss';
import {useState} from "react";

export const Navbar = () => {
    const [price_xnl, setPriceXNL] = useState();
    const [price_eth, setPriceETH] = useState();

    fetch("/contract/prices").then((res)=>{
        res.json().then((res)=>{
            setPriceETH(res.price_eth);
            setPriceXNL(res.price_xnl);
        })
    })

    return(
        <div className={'navbar'}>
            <div className={'navbar-content'}>
                <span>Pack price:</span>
                <div className={'buttons-group'}>
                    <button>
                        <span>XNL {price_eth}</span>
                    </button>
                    <button>
                        <span>ETH {price_xnl}</span>
                    </button>
                    <button className={'save-btn'}>
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    )
}