import "./style.scss";
import weeklogo from "../../assets/images/addweek.png";
import succsess from "../../assets/images/complete.png";
import upload from "../../assets/images/upload.png";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";

export const Dashboard = () => {
    const [isData, setIsData] = useState()

    useEffect(() => {
        if(window.ethereum){
            console.log("metamask ready")
        }else{
            alert("install metamask extension!!")
        }
    }, [])

    async function getAccount() {
        let accounts = [];
        if (accounts.length == 0) {
            accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            console.log(accounts, "accounts")
        }
        return accounts[0];
    }
    console.log(getAccount(), "account")

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
                        <h1>0.00</h1>
                    </div>
                    <div className={'ETH'}>
                        <span>ETH</span>
                        <h1>0.00</h1>
                    </div>
                </div>
            </div>

            <div className={'nft-status'}>
                {
                    [
                        {title:"0", des:"NFTs sold", id:1},
                        {title:"0/0", des:"NFTs given via Airdrop", id:2},
                        {title:"0", des:"NFTs burned", id:3}
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

            <div className={'weeks'}>
                <div className={'weeks-title'}>
                    <h1>Weeks</h1>
                    <div className={'add-week'}>
                        <span>Create a week</span>
                        <img src={weeklogo} alt={'week-logo'}/>
                    </div>
                </div>
                <hr/>
                <div className={'week-cards'}>
                    <div className={'alert-weeks'}>
                        <img src={succsess} alt={"succsess"}/>
                        <p>Congratulations! All scheduled weeks are over. Buyers are waiting for their purchases.
                            Therefore, you need to upload content that will be sent to their owners.</p>
                        <button onClick={handleNav}>
                            <span>Go to upload</span>
                            <img src={upload} alt={'upload-dashboard'}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}