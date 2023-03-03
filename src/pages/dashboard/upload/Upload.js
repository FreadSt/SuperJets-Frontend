import "./style.scss";
import { useNavigate} from 'react-router-dom';
import back from "../../../assets/images/left-arrow.png";
import alert from "../../../assets/images/alert-circle.png";
import upload from '../../../assets/images/upload.png';

export const Upload = () => {
    const navigate = useNavigate()
    const handleNav = () => {
        navigate(`/dashboard`, {replace:true})
    }
    return(
        <div className={'upload'}>
            <div className={'upload-title'}>
                <button onClick={handleNav}>
                    <img src={back} alt={'return'}/>
                </button>
                <h1>Upload weekly NFTs</h1>
            </div>
            <div className={'upload-alert'}>
                <img src={alert} alt={'alert'}/>
                <p>Within 9 weeks, <b>13 900 NFT</b> were sold.
                    You need to upload this number of items in order to distribute them to users</p>
            </div>
            <div className={'file-drop'}>

            </div>
            <div className={'upload-button'}>
                <button>
                    <span>Upload</span>
                    <img src={upload} alt={'upload-item'}/>
                </button>
            </div>
        </div>
    );
};