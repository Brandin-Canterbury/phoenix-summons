export const utility = {
    
    
    fetch: async (url) => {
        return await fetch(url)
            .then(response => response.text())
            .catch(err => console.error("Error loading html document:", err));
    },

    parseUuid: (string) => {
        if (!string) return undefined;
        let parts = string.split('.');
        if (parts.length > 1) {
            return parts[1];
        }
        return parts[0];
    },

   

    wait: async (time) => {
        await new Promise(resolve => setTimeout(resolve, time));
    },
    
    getActor: (actorId) => {
        return game.actors.get(actorId);
    },
    
}
export default utility;