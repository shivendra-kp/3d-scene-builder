const SPEED = 80;

const PropertyLabel = (props) => {
    const handleMouseHover = (element, hovered) => {
        const rectname = element.children[0].getBoundingClientRect();
        const rectlabel = element.getBoundingClientRect();
        const name = element.children[0];
        let newPos = 0;

        if (rectname.width < rectlabel.width) return;

        if (hovered) {
            newPos = rectname.width - rectlabel.width;
        }
        name.style.right = newPos + "px";
        name.style.transitionDuration = newPos / SPEED + "s";
    };

    return (
        <>
            <div
                className="property-label"
                onMouseOver={(e) => handleMouseHover(e.target, true)}
                onMouseOut={(e) => handleMouseHover(e.target, false)}
            >
                <div className="property-name">{props.name || "default"}</div>
            </div>
            <div className="property-divider"></div>
        </>
    );
};

export default PropertyLabel;
