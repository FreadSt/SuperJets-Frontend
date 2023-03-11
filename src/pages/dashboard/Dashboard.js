import "./style.scss";
import weeklogo from "../../assets/images/addweek.png";
import succsess from "../../assets/images/complete.png";
import upload from "../../assets/images/upload.png";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import {Weeks} from "./weeks/Weeks";

export const Dashboard = () => {
    const [ETH, setETH] = useState("0.0");
    const [XNL, setXNL] = useState("0.0");
    const [total_supply, setTotalSupply] = useState(0);
    const [burned_supply, setBurnedSupply] = useState(0);
    const [airdrop_max, setAirdropMax] = useState(0);
    const [airdrop_supply, setAirdropSupply] = useState(0);

    useEffect(() => {
    }, [])
    
    fetch("/contract/balances").then((res)=>{
        res.json().then((res)=>{
            setETH(res.balance_eth);
            setXNL(res.balance_xnl);
        })
    })
    
    fetch("/contract/mint_supply").then((res)=>{
        res.json().then((res)=>{
            setTotalSupply(res.total_supply);
            setBurnedSupply(res.burned_supply);
        })
    })
    
    fetch("/contract/airdrop_supply").then((res)=>{
        res.json().then((res)=>{
            setAirdropMax(res.max_supply);
            setAirdropSupply(res.current_supply);
        })
    })

    const navigate = useNavigate()
    const handleNav = () => {
        navigate(`/dashboard/upload`, {replace:true})
    }
    return(
        <div className={'dashboard'}>
            <h1 className={"title-dashboard"}>Dashboard</h1>
            <h3 className={'suptitle-dashboard'}>Statistic</h3>
            <hr/>
            <div className={'wallet'}>
                <div className={'title'}>
                    <span>Revenue</span>
                    <p>Withdraw</p>
                </div>
                <div className={'coin-div'}>
                    <div className={'XNL'}>
                        <span>XNL</span>
                        <h1>{XNL}</h1>
                    </div>
                    <div className={'ETH'}>
                        <span>ETH</span>
                        <h1>{ETH}</h1>
                    </div>
                </div>
            </div>
            <div className={'nft-status'}>
                {
                    [
                        {title: total_supply, des:"NFTs sold", id:1},
                        {title: `${airdrop_max}/${airdrop_supply}`, des:"NFTs given via Airdrop", id:2},
                        {title: burned_supply, des:"NFTs burned", id:3}
                        ].map((item, key) => {
                            return(
                                <div className={'nft-block'} key={item.id}>
                                    <h1>{item.title}</h1>
                                    <span>{item.des}</span>
                                </div>
                            )
                    })
                }
            </div>
            <Weeks/>
        </div>
    )
}