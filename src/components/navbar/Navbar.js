import './style.scss'

export const Navbar = () => {
    return(
        <div className={'navbar'}>
            <div className={'navbar-content'}>
                <span>Pack price:</span>
                <div className={'buttons-group'}>
                    <button>
                        <span>XNL 0.00</span>
                    </button>
                    <button>
                        <span>ETH 0.00</span>
                    </button>
                    <button className={'save-btn'}>
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    )
}