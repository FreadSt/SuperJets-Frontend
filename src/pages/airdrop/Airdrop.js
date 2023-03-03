import "./style.scss"

export const Airdrop = () => {
    return(
        <div className={'airdrop'}>
            <h1>Airdrop</h1>
            <div className={'airdrop-content'}>
                <div className={'drop-block'}>
                    <h3>Total items: 940</h3>
                    <h3>Items availabale to drop: 545</h3>
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