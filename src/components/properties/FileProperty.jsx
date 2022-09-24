import PropertyLabel from "./PropertyLable";
import { useState } from "react";
import FileNameProperty from "./FileNameProperty";

//files are added in a way having {hash,file}

const FileProperty = (props) => {
    const property = props.property || { name: "file" };
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleClick = (e) => {
        //handle click , probably add a way to access file
        //from files explorer
    };

    const onDrop = (e) => {
        e.preventDefault();
        e.target.classList.remove("dropbox-dragover");

        const file = e.dataTransfer.files[0];

        //check validity
        const arr = file.name.split(".");
        if (property.extentions.indexOf(arr[arr.length - 1]) !== -1) {
            setSelectedFiles((s) => {
                return [file];
            });
            if (props.onChange) props.onChange({ ...property, file: file });
        }
    };

    const handleDragStart = (e) => {
        e.target.classList.add("dropbox-dragover");
    };
    const handleDragEnd = (e) => {
        e.target.classList.remove("dropbox-dragover");
    };

    const onRemoveFile = (index) => {
        setSelectedFiles([]);
        if (props.onChange) props.onChange({ ...property, file: null });
    };
    return (
        <>
            <div className="property flex-row-centre">
                <PropertyLabel name={property.name} />
                <div
                    className="property-content property-dropbox"
                    onClick={handleClick}
                    onDrop={onDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={handleDragStart}
                    onDragLeave={handleDragEnd}
                >
                    <div className="property-name disable-pointer-events">click or drop</div>
                </div>
            </div>
            <div>
                {selectedFiles.map((file, index) => {
                    return <FileNameProperty key={index} name={file.name} onChange={onRemoveFile} index={index} />;
                })}
            </div>
        </>
    );
};

export default FileProperty;
