import "./style.scss";
import {useState} from "react";

export const Airdrop = () => {
    const [airdrop_max, setAirdropMax] = useState();
    const [airdrop_supply, setAirdropSupply] = useState();

    fetch("/contract/airdrop_supply").then((res)=>{
        res.json().then((res)=>{
            setAirdropMax(res.max_supply);
            setAirdropSupply(res.current_supply);
        })
    })

    return(
        <div className={'airdrop'}>
            <h1>Airdrop</h1>
            <div className={'airdrop-content'}>
                <div className={'drop-block'}>
                    <h3>Total items: {airdrop_max}</h3>
                    <h3>Items availabale to drop: {airdrop_max - airdrop_supply}</h3>
                    <div className={'upload-field'}>

                    </div>
                </div>
                <div className={'input-fields'}>
                    <div className={'quantity'}>
                        <label>Quantity of items</label>
                        <input
                            placeholder={'Input'}
                        />
                    </div>

                    <div className={'addresses'}>
                        <label>Addresses</label>
                        <textarea
                            type={"text"}
                            placeholder={'Enter recipients addresses'}
                        />
                    </div>

                    <button>
                        <span>Start airdrop</span>
                    </button>
                </div>
            </div>
        </div>
    )
}