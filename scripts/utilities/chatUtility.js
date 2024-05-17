import utility from "./utility.js";
import flagUtility from "./flagUtility.js";
import itemUtility from "./itemUtility.js";

export const chatUtility = {
    processChatMessage: (chatMessageData) => {
        if(chatMessageData.type !== 0) return;
        return chatUtility._getDataFromMessage(chatMessageData);
    },
    
    _getDataFromMessage: (chatMessageData) => {
        const chatItem = chatMessageData.flags?.dnd5e?.use;
        if(chatItem === undefined) return;
                
        const { actor, token } = chatMessageData.speaker;
        const actorData = utility.getActor(actor);
        const itemData = itemUtility.getItem(actorData, chatItem?.itemId);
        const summonId = flagUtility.getSummonId(itemData);
        const isSummon = flagUtility.getSummonEnabled(itemData) ?? false;
        const summonData = summonId ? utility.getActor(summonId) : undefined;
        
        return {
            actor: actorData,
            actorTokenId: token,
            itemData: itemData,
            isSummon: isSummon,
            summonData: summonData
        }
    }
}

export default chatUtility;