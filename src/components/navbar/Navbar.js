import './style.scss';
import {useState} from "react";

export const Navbar = () => {
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const [isAddKey, setIsAddKey] = useState()
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
    
    const handleAddKey = () => {
        setIsAddKey();
    }

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
            <div className='buttons-div'>
                <buton 
                    className={'nav-btn'}
                    onClick={() => {setIsOpenPopUp(true)}}>
                    <span>Enter key</span>
                </buton>
                <a
                    target={'_blank'}
                    href='https://www.google.com.ua/webhp?tab=rw'
                >Dropbox Access</a>
            </div>
            {
                isOpenPopUp?
                <div className={'navbar-popup'}>
                    <div className={'modal-window'}>
                        <p>Please, enter account private key</p>
                        <input id="quantity"
                            placeholder={'Enter account private key'}
                        />
                        <div className={'modal-buttons'}>
                            <button
                                onClick={() => {setIsOpenPopUp(false)}}
                                className={'cancel-btn'}
                            >
                                <span>Cancel</span>
                            </button>
                            <button
                                onClick={handleAddKey}
                                className={'confirm-btn'}
                            >
                                <span>Confirm</span>
                            </button>
                        </div>
                    </div>
                </div>
                :
                null 
            }
        </div>
    )
}