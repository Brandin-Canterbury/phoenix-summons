export const canvasUtility = {
    findTokenById: (tokenId) => {
        if(!canvasUtility._validateCanvas()) return undefined;

        const tokens = canvas.scene.tokens;
        
        const token = tokens.find(t => t.id === tokenId);

        if(canvasUtility._validateToken(token)) return token;
        return undefined;
    },
    
    findTokenByActorId: (actorId) => {
        if(!canvasUtility._validateCanvas()) return undefined;

        const tokens = canvas.tokens.placeables;
        const token = tokens.find(t => t.actor && t.actor.id === actorId);

        if(canvasUtility._validateToken(token)) return token;
        return undefined;
    },

    findTokenByActorName: (tokenName) => {
        if(!canvasUtility._validateCanvas()) return undefined;

        const tokens = canvas.scene.tokens;
        const token = tokens.find(t => t.actor && t.actor.name === tokenName);
        
        if(canvasUtility._validateToken(token)) return token;
        return undefined;        
    },
    
    _validateCanvas: () => {
        if (!canvas || !canvas.tokens) {
            console.log("Canvas not initialized or tokens layer is not available.");
            return false;
        }
        return true;
    },
    
    _validateToken: (token) => {
        if (token) {
            return true;
        } else {
            console.log("No token found!");
            return false;
        }
    },
}

export default canvasUtility;