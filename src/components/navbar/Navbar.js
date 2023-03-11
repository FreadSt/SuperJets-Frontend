import './style.scss';
import {useState} from "react";

export const Navbar = () => {
    const [price_xnl, setPriceXNL] = useState("0.0");
    const [price_eth, setPriceETH] = useState("0.0");

    const savePrices = () => {
        fetch(`/contract/set_prices?price_eth=${price_eth}&price_xnl=${price_xnl}`, {
            method: "POST",
        }).catch((err)=>{
            console.log("Save price error");
        });
    }

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
                    <button className={'save-btn'}
                    onClick={ savePrices }
                    >
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    )
}