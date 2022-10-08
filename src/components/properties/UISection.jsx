import { Images } from "../../assets";
import BoolProperty from "./BoolProperty";
import IntegerProperty from "./IntegerProperty";
import FloatProperty from "./FloatProperty";
import TextureProperty from "./TextureProperty";
import TextboxProperty from "./TextboxProperty";
import VectorProperty from "./VectorProperty";
import ColorProperty from "./ColorProperty";
import ScalarSliderProperty from "./ScalarSliderProperty";
import FileProperty from "./FileProperty";
import MaterialProperty from "./MaterialProperty";
import Spacer from "./Spacer";
import LineDivider from "./LineDivider";

// props structure = {sectionName , properties=[{id,name,type}]}

const mapNameToProperty = {
    bool: (property, onChange) => {
        return <BoolProperty key={property.id} property={property} onChange={onChange} />;
    },
    integer: (property, onChange) => {
        return <IntegerProperty key={property.id} property={property} onChange={onChange} />;
    },
    float: (property, onChange) => {
        return <FloatProperty key={property.id} property={property} onChange={onChange} />;
    },
    slider: (property, onChange, onUpdate) => {
        return <ScalarSliderProperty key={property.id} property={property} onChange={onChange} onUpdate={onUpdate} />;
    },
    vector: (property, onChange) => {
        return <VectorProperty key={property.id} property={property} onChange={onChange} />;
    },
    color: (property, onChange, onUpdate) => {
        return <ColorProperty key={property.id} property={property} onChange={onChange} onUpdate={onUpdate} />;
    },
    texture: (property, onChange) => {
        return <TextureProperty key={property.id} property={property} onChange={onChange} />;
    },
    textbox: (property, onChange) => {
        return <TextboxProperty key={property.id} property={property} onChange={onChange} />;
    },
    file: (property, onChange) => {
        return <FileProperty key={property.id} property={property} onChange={onChange} />;
    },
    material: (property, onChange) => {
        return <MaterialProperty key={property.id} property={property} onChange={onChange} />;
    },
    spacer: (property) => {
        return <Spacer key={property.id} />;
    },
    lineDivider: (property) => {
        return <LineDivider key={property.id} />;
    },
};

const UISection = (props) => {
    const section = props.section || {
        sectionName: "",
        sectionId: 0,
        properties: [],
    };

    const toggleCollapse = (e) => {
        const body = e.target.parentNode.parentNode.children[1];

        if (body.style.display === "none") {
            body.style.display = "block";
            e.target.style.transform = "rotate(0deg)";

            return;
        }
        body.style.display = "none";
        e.target.style.transform = "rotate(-90deg)";
    };

    return (
        <div className="ui-section">
            {!section.sectionName ? (
                <></>
            ) : (
                <div className="ui-section-header">
                    <img src={Images.dropDownArrow} alt="" onClick={toggleCollapse} />
                    <span>{section.sectionName}</span>
                </div>
            )}
            <div className="ui-section-body">
                {section.properties.map((property) => {
                    const func = mapNameToProperty[property.type];
                    if (func) return func(property, props.onChange, props.onUpdate);
                    return "";
                })}
            </div>
        </div>
    );
};

export default UISection;
