import constants from "./../constants.js";
import utility from "./utility.js";

export const flagUtility = {
    createUpdateObj: () => {
        const updateObj = {  flags: {} };
        updateObj.flags[constants.flags.flagNameSpace] = {};
        return updateObj;
    },
    
    updateKey: (updateObj, key, value) => {        
        updateObj.flags[constants.flags.flagNameSpace][key] = value;
        return updateObj;
    },

    createDefaultFlags: async (itemId) => {
        let updateObj = flagUtility.createUpdateObj();
        updateObj = flagUtility.updateKey(updateObj, constants.flags.summonActive, false);
        updateObj = flagUtility.updateKey(updateObj, constants.flags.casterColor, "darkBlue");
        updateObj = flagUtility.updateKey(updateObj, constants.flags.summonId, "");        
        await flagUtility.updateDocumentItem(itemId, updateObj);
    },

    updateDocumentItem: async (itemId, updateObj) => {
        const item = await fromUuid(itemId);
        if (!item) {
            console.error("Unable to update item!");
            return;
        }
        await item.update(updateObj, {render: false});
    },

    getCasterAnimationColor: (object) => {
        return  object.getFlag(constants.flags.flagNameSpace, constants.flags.casterColor);
    },

    getSummonId: (object) => {
        let id = object.getFlag(constants.flags.flagNameSpace, constants.flags.summonId);
        return utility.parseUuid(id);
    },

    getSummonEnabled: (object) => {
        return  object.getFlag(constants.flags.flagNameSpace, constants.flags.summonActive);
    },
}

export default flagUtility;