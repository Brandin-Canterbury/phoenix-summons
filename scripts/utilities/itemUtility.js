export const itemUtility = {
    getItem: (actor, itemId) => {
        return actor.items.get(itemId);
    },
    
    getRange: (item) => {
        const maxRange = 999;
        
        const range = item.labels?.range;
        if(range === undefined) return maxRange;
        
        const intRange = parseInt(range);
        if(isNaN(intRange)) return maxRange;
        return intRange;
    },
    
    getDuration: (item) => {
        
    },
}

export default itemUtility;