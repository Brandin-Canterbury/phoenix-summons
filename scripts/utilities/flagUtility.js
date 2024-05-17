import constants from "./../constants.js";
import utility from "./utility.js";

export const flagUtility = {
    createFlagObject: async (object) => {
        await object.setFlag(constants.flags.flagNameSpace, constants.flags.summonActive, false);
        await object.setFlag(constants.flags.flagNameSpace, constants.flags.casterColor, "darkBlue");
        await object.setFlag(constants.flags.flagNameSpace, constants.flags.summonId, "");
    },

    updateDocumentItem: (itemId, flagData) => {
        const item = game.items.get(itemId);
        item.update(flagData, { render: false });  
    },
        
    getCasterAnimationColor: (object) => {
        return object.getFlag(constants.flagName, constants.casterColorName);
    },
    
    getSummonId: (object) => {
        const id = object.getFlag(constants.flagName, constants.idName);
        return utility.parseUuid(id);
    },

    getSummonEnabled: (object) => {
        return object.getFlag(constants.flagName, constants.boolName);
    },
}

export default flagUtility;