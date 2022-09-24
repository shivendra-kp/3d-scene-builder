import { Images } from "../../assets";

const DefaultGeometryUI = (props) => {
    const handleCollapse = (e) => {
        const parent = e.target.parentNode;
        if (parent.getAttribute("collapsed") === "true") {
            parent.setAttribute("collapsed", "false");
            parent.style.height = "272px";
            parent.children[1].style.pointerEvents = "auto";
        } else {
            parent.setAttribute("collapsed", "true");
            parent.style.height = "13px";
            parent.children[1].style.pointerEvents = "none";
        }
    };
    const handleClick = (e) => {
        const tag = e.target.getAttribute("tag");
        if (props.onClick) props.onClick(tag);
    };
    return (
        <>
            <div className="default-geomerty-ui" collapsed="false" style={{ height: "272px" }}>
                <div className="hide" onClick={handleCollapse}></div>
                <img className="" src={Images.plane} alt="" tag="plane" onClick={handleClick} draggable="false"></img>
                <img className="" src={Images.cube} alt="" tag="cube" onClick={handleClick} draggable="false"></img>
                <img className="" src={Images.sphere} alt="" tag="sphere" onClick={handleClick} draggable="false"></img>
                <img
                    className=""
                    src={Images.cylinder}
                    alt=""
                    tag="cylinder"
                    onClick={handleClick}
                    draggable="false"
                ></img>
                <img className="" src={Images.cone} alt="" tag="cone" onClick={handleClick} draggable="false"></img>
                <img className="" src={Images.mesh} alt="" tag="scene" onClick={handleClick} draggable="false"></img>
            </div>
        </>
    );
};

export default DefaultGeometryUI;
