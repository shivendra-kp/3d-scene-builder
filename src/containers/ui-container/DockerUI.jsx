import { useRef } from "react";
import UIContainer from "./UIContainer";
import { Images } from "../../assets";

const DockerUI = (props) => {
    const buttonRef = useRef();
    const docker = useRef();

    const resizeStart = (e) => {
        e.preventDefault();
        if (e.button !== 0) return;
        // console.log("resize start");
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const resizeFinish = () => {
        // console.log("resize finished");
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e) => {
        // console.log("resize");
        let width = parseInt(docker.current.style.width) - e.movementX;
        if (width < 200) {
            width = 200;
        }

        docker.current.style.width = width + "px";
    };

    const handleMouseUp = (e) => {
        if (e.button === 0) {
            resizeFinish();
        }
    };

    const handleHideDocker = (e) => {
        docker.current.style.width = "0px";
        buttonRef.current.style.display = "inline-block";
    };

    const handleShowDocker = (e) => {
        docker.current.style.width = "250px";
        buttonRef.current.style.display = "none";
    };
    return (
        <div className="flex-row">
            <div style={{ width: "0px" }}>
                <button
                    ref={buttonRef}
                    style={{ width: "20px", height: "20px", position: "relative", right: "24px", display: "none" }}
                    onClick={handleShowDocker}
                    className="btn-editor"
                ></button>
            </div>
            <div style={{ width: "0px" }}>
                <div
                    style={{
                        width: "3px",
                        cursor: "col-resize",
                        height: "100%",
                        position: "relative",
                    }}
                    onMouseDown={resizeStart}
                ></div>
            </div>
            <div className="flex-column" style={{ width: "250px" }} ref={docker}>
                <div className="flex-row-centre">
                    <div className="ui-heading-text ui-heading-container">{props.heading || ""}</div>
                    <img
                        onClick={handleHideDocker}
                        className="img-btn"
                        src={Images.arrowRight}
                        alt=""
                        style={{ height: "15px" }}
                    ></img>
                </div>
                <div className="flex-grow" style={{ padding: "0px 5px 0px 5px" }}>
                    <UIContainer
                        sections={props.sections}
                        id={props.id}
                        onChange={props.onChange}
                        onUpdate={props.onUpdate}
                    />
                </div>
                <div className="btn-container-center">
                    <button className="btn-editor" onClick={props.onSave}>
                        Save
                    </button>
                    <button className="btn-editor" onClick={props.onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DockerUI;
