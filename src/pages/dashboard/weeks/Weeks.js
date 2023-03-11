import weeklogo from "../../../assets/images/addweek.png";
import succsess from "../../../assets/images/complete.png";
import upload from "../../../assets/images/upload.png";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "./style.scss";
import dots from "../../../assets/images/thriple-dots.png";

const week_list = new Array(9);

export const Weeks = () => {

    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const [weeks, setWeek] = useState([])

    const sortWeekList = () => {
        let list = [];
        for (let e of week_list) {
            if (e) {
                list.push(e);
            }
        }
        return list;
    };

    const handleOpenPopUp = () => {
        setIsOpenPopUp(true)
    }

    const handleAddWeek = (week, quantity, sold_quantity, state) => {
        if(week < 1 || week > 9) {
            return null;
        }
        week_list[week] = (
            <div key={week} className={'week-card'}>
                <div className={'week-title'}>
                    <span>Week {week}</span>
                    <img
                        src={dots}
                        alt={''}
                    />
                </div>
                <div className={'week-stats'}>
                    <div className={'NFTs'}>
                        <h3>{quantity}</h3>
                        <span>NFTs</span>
                    </div>
                    <div className={'NFTs sold'}>
                        <h3>{sold_quantity}</h3>
                        <span>NFTs sold</span>
                    </div>
                    {/* <div className={'XNL'}>
                        <h3>2000000.123</h3>
                        <span>XNL</span>
                    </div>
                    <div className={'ETH'}>
                        <h3>2000</h3>
                        <span>ETH</span>
                    </div> */}
                </div>
                <div className={'status'}>
                    <span>{state}</span>
                </div>
            </div>
        );
        setWeek(sortWeekList());
    }

    
    useEffect(()=>{
        fetch("/contract/sales_state").then((res)=>{
            res.json().then((res)=>{
                let state = res.state;
                fetch("/contract/current_week").then((res)=>{
                    res.json().then((res)=>{
                        let current_week = res.week;
                        
                        for (let week = 1;week <= 9;week ++) {
                            fetch(`/contract/week_supply?week=${week}`).then((res)=>{
                                res.json().then((res)=>{
                                    let week_state = week < current_week?"Finish":"Not started";
                                    if (week == current_week) {
                                        if (state == "sale") {
                                            week_state = "In progress";
                                        } else {
                                            week_state = "Finish"
                                        }
                                    }
                                    if (week == current_week + 1) {
                                        if (state == "paused") {
                                            week_state = "Start";
                                        }
                                    }
                                    handleAddWeek(week, res.max_supply, res.total_supply, week_state);
                                })
                            })
                        }
                    })
                })
            })
        })
    }, [])

    const handleRemoveWeek = () => {
        setWeek([]);
    }

    const changeWeek = () =>{
        let week = parseInt(document.getElementById("week").value);
        let quantity = parseInt(document.getElementById("quantity").value);
        fetch("/contract/current_week").then((res)=>{
            res.json().then((res)=>{
                if (week >= res.week) {
                    fetch(`/contract/set_quantity?week=${week}&quantity=${quantity}`, {
                        method: "POST"
                    }).then((res)=>{
                        if (res.status == 200) {
                            handleAddWeek(week, quantity, 0, "Not started");
                        }
                    });
                } else {
                    console.log("Week is already completed!");
                }
            })
        })
        setIsOpenPopUp(false);
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
                {weeks}
            </div>
            {isOpenPopUp?
                <div className={'week-popup'}>
                    <div className={'modal-window'}>
                        <p>Set week for configure</p>
                        <input id="week"
                            placeholder={'Enter the week'}
                        />
                        <p>Set the quantity of items</p>
                        <input id="quantity"
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
                                onClick={ changeWeek }
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