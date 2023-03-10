import weeklogo from "../../../assets/images/addweek.png";
import succsess from "../../../assets/images/complete.png";
import upload from "../../../assets/images/upload.png";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./style.scss";
import dots from "../../../assets/images/thriple-dots.png";

export const Weeks = () => {

    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const [isAddedWeek, setIsAddedWeek] = useState([])

    const handleOpenPopUp = () => {
        setIsOpenPopUp(true)
    }

    const handleAddWeek = () => {
        setIsAddedWeek(isAddedWeek.concat(
            <div className={'week-card'} key={isAddedWeek.length}>
                <div className={'week-title'}>
                    <span>Week</span>
                    <img
                        src={dots}
                        alt={''}
                    />
                </div>
                <div className={'week-stats'}>
                    <div className={'NFTs'}>
                        <h3>2000</h3>
                        <span>NFTs</span>
                    </div>
                    <div className={'NFTs sold'}>
                        <h3>2000</h3>
                        <span>NFTs sold</span>
                    </div>
                    <div className={'XNL'}>
                        <h3>2000000.123</h3>
                        <span>XNL</span>
                    </div>
                    <div className={'ETH'}>
                        <h3>2000</h3>
                        <span>ETH</span>
                    </div>
                </div>
                <div className={'status'}>
                    <span>Not started</span>
                </div>
            </div>
        ))
        if(isAddedWeek.length >= 9) {
            return null;
        }
        setIsOpenPopUp(false)
    }

    const handleRemoveWeek = () => {
        setIsAddedWeek(false)
    }

    const navigate = useNavigate()
    const handleNav = () => {
        navigate(`/dashboard/upload`, {replace:true})
    }

    return(
        <div className={'weeks'}>
            <div className={'weeks-title'}>
                <h1>Weeks</h1>
                <div className={'add-week'} onClick={handleOpenPopUp}>
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
                {isAddedWeek}
            </div>
            {isOpenPopUp?
                <div className={'week-popup'}>
                    <div className={'modal-window'}>
                        <p>Set the quantity of items for <b>Week 1</b></p>
                        <input
                            placeholder={'Enter the quantity'}
                        />
                        <div className={'modal-buttons'}>
                            <button
                                onClick={() => {setIsOpenPopUp(false)}}
                                className={'cancel-btn'}
                            >
                                <span>Cancel</span>
                            </button>
                            <button
                                onClick={handleAddWeek}
                                className={'confirm-btn'}
                            >
                                <span>Confirm and create</span>
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