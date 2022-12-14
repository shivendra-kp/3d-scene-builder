# ThreeJS Scene Utility for Web

A simple utility to load glb files and edit its material properties for each material indices.

![SS_02](https://user-images.githubusercontent.com/99546305/194720236-6f1eab91-4068-4131-9680-548183548169.png)


## UIContainer, Sections and Properties

This is the main wrapper component which takes in `sections` , `onChange`, `onUpdate` as props. UIContainers contains Sections and Sections contains Properties.

### Property

```
property={
    name:"display name",
    id:"id",
    type:"bool",
    initial:"",
}
```

Each property must contain atleast `name`, `id` and `type`. `initial` value can be passed by specifying it with approriate value . Available property types are `bool`, `color`, `integer`, `float`, `slider`, `texture`, `file` and `material`. Cetrain properties can take more elements

-   `slider` can also take min and max value.
-   `material` can take material and material index

Simply drill properties with data you want to use as all the properties pass what data is passed to them with the value after change by onChange and onUpdate callbacks.

### Section

```
section = {
        sectionName:"Awesome Section",
        SectionId:"Id",
        properties:[...],
    }
```

Used to group related propertes propeties.

### Final Structure

So summing it up, pass sections array to UIContainer and it will build the properties interface.

```
sections = [{
    sectionName:"Section A",
    sectionId:"01",
    property:[{
        name:"Awesome Property",
        id:"AP01",
        type:"bool",
        initial:true
    },...]
},...]
```

