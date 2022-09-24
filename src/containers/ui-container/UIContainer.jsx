// Main wrapper component for Properties
// takes sections as props

import UISection from "../../components/properties/UISection";

const UIContainer = (props) => {
    const sections = props.sections || [];

    return (
        <div className="ui-container">
            {sections.map((element) => {
                return (
                    <UISection
                        key={element.sectionId}
                        section={element}
                        onChange={props.onChange}
                        onUpdate={props.onUpdate}
                    />
                );
            })}
        </div>
    );
};

export default UIContainer;
