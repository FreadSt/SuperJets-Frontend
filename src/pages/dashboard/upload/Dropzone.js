import React from "react";
import { useDropzone } from "react-dropzone";
import './style.scss';
import cloud from "../../../assets/images/cloud.png";
import deck from "../../../assets/images/deck.png";
import remove from "../../../assets/images/x.png";

function Dropzone({ onDrop, accept, open }) {
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
        useDropzone({
            accept,
            onDrop,
        });
    const truncate = (str, n) => {
        return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    };
    const files = acceptedFiles.map((file) => (
        <div key={file.path} className={'item-name'}>
            <p>{truncate(file.path, 7)}</p>
            <button>
                <img src={remove} alt={'x'}/>
            </button>
        </div>
    ));
    return (
        <div className={'drop-wrapper'}>
            <div {...getRootProps({ className: "dropzone" })}>
                <input className="input-zone" {...getInputProps()} />
                <div className="text-center">
                    {isDragActive ? (
                            <div className={'active'}>
                                <p className="dropzone-content">
                                    {files}
                                </p>
                            </div>
                    ) : (
                        <div className={'default-state'}>
                            <img src={cloud}/>
                            <p className="dropzone-content">
                                Drag-n-drop or <a onClick={open}>Browse File</a> to upload
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <aside>{files}</aside>
        </div>
    );
}
export default Dropzone;