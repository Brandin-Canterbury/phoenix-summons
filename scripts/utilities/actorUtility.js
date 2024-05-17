import canvasUtility from "./canvasUtility.js";

export const actorUtility = {
    getPlacedToken: (actorData) => {
        return canvasUtility.findTokenByActorId(actorData.id);        
    },
    
    getActorByName: (actorName) => {
        return game.actors.find(x => x.name === actorName);
    }
}

export default actorUtility;