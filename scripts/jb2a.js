import constants from "./constants.js";

export const jb2a = {
    
    getCircleMapping: () => {
        return [
            { value: jb2a.colors.darkblue, label: "Dark Blue" },
            { value: jb2a.colors.darkgreen, label: "Dark Green" },
            { value: jb2a.colors.darkpink, label: "Dark Pink" },
            { value: jb2a.colors.darkpurple, label: "Dark Purple" },
            { value: jb2a.colors.darkred, label: "Dark Red" },
            { value: jb2a.colors.darkyellow, label: "Dark Yellow" },
            { value: jb2a.colors.blue, label: "Blue" },
            { value: jb2a.colors.green, label: "Green" },
            { value: jb2a.colors.pink, label: "Pink" },
            { value: jb2a.colors.purple, label: "Purple" },
            { value: jb2a.colors.red, label: "Red" },
            { value: jb2a.colors.yellow, label: "Yellow" },
        ];
    },
    
    getSummonAnimationDropdown: () => {
        return [
            { value: constants.animationTypes.Normal, label: "Normal" },
            { value: constants.animationTypes.Fire, label: "Fire" },
            { value: constants.animationTypes.Ice, label: "Ice" },
            { value: constants.animationTypes.Void, label: "Void" },
            { value: constants.animationTypes.Nature, label: "Nature" },
            { value: constants.animationTypes.Poison, label: "Poison" },
        ];
    },
    
    buildCasterSummonCircle: (type, color) => {
        return jb2a.buildCasterCircle(this.spheres.conjuration, type, color);  
    },
    
    buildCasterCircle: (sphere, type, color) => {
        const arr = [
            jb2a.baseCaster,
            sphere,
            type,
            color
        ];
        return arr.join(".");
    },
    
    
    
    baseCaster: "jb2a.magic_signs.circle.02",
    spheres: {
        abjuration: "abjuration",
        conjuration: "conjuration",
        divination: "divination",
        enchantment: "enchantment",
        evocation: "evocation",
        illusion: "illusion",
        necromancy: "necromancy",
        transmutation: "transmutation"
    },
    types: {
        complete: "complete",
        intro: "intro",
        loop: "loop",
        outro: "outro"
    },
    colors: {
        darkblue: "dark_blue",
        darkgreen: "dark_green",
        darkpink: "dark_pink",
        darkpurple: "dark_purple",
        darkred: "dark_red",
        darkyellow: "dark_yellow",
        blue: "blue",
        green: "green",
        pink: "pink",
        purple: "purple",
        red: "red",
        yellow:"yellow"
    }
}

export default jb2a;