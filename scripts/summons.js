import animation from "./animation.js";
import canvasUtility from "./utilities/canvasUtility.js";
import flagUtility from "./utilities/flagUtility.js";
import itemUtility from "./utilities/itemUtility.js";
import actorUtility from "./utilities/actorUtility.js";
import utility from "./utilities/utility.js";

export const summons = {
    animTest: async (casterName) => {
        let casterToken = canvasUtility.findTokenByActorName(casterName);
        //const actorData = actorUtility.getActorByName(casterName);
        animation.playNormalTargetSummon(null, casterToken);        
    },
    
    summonActor: async (summonData) => {
        const casterToken = canvasUtility.findTokenById(summonData.actorTokenId);
        const casterColor = flagUtility.getCasterAnimationColor(summonData.itemData);
        const range = itemUtility.getRange(summonData.itemData);
        
        animation.startCasterSummon(casterToken, casterColor);
        animation.loopCasterSummon(casterToken, casterColor);
        
        const spawnedTokenId = await summons.spawnToken(summonData.summonData, summonData.actor, range);
        
        await utility.wait(50);
        const spawnedToken = canvasUtility.findTokenById(spawnedTokenId[0]);
        if(!spawnedToken) {
            console.error(`Unable to find token ${spawnedToken}`);
            await animation.endCasterSummon(casterToken, casterColor);
            return;
        }
        animation.playNormalTargetSummon(summonData.actor, spawnedToken);

        await animation.endCasterSummon(casterToken, casterColor);
    },



    spawnToken: async (actorToSummon, castingActor, range, updates = {}, callbacks = {}) => {
        const summonTokenDocument = await actorToSummon.getTokenDocument();

        const options = summons._configWarpgateOptions(summonTokenDocument, castingActor, updates);
        
        if(!callbacks.show) {
            callbacks.show = async crosshairs => {
                await summons._configWarpgateCrosshairs(crosshairs, castingActor, summonTokenDocument.texture.src, range);
            };
        }

        setProperty(updates, 'token.alpha', 0);

        return await warpgate.spawn(summonTokenDocument, updates, callbacks, options);
    },
    
    _configWarpgateCrosshairs: async (crosshairs, castingActor, summonTokenImg, range) => {
        const casterToken = actorUtility.getPlacedToken(castingActor);
        let distance = 0;
        let ray;
        while (crosshairs.inFlight) {
            await warpgate.wait(100);
            ray = new Ray(casterToken.center, crosshairs);
            distance = canvas.grid.measureDistances([{ray}], {'gridSpaces': true})[0];
            if (casterToken.checkCollision(ray.B, {
                'origin': ray.A, 'type': 'move', 'mode': 'any'
            }) || distance > range) {
                crosshairs.icon = 'icons/svg/hazard.svg';
            } else {
                crosshairs.icon = summonTokenImg;
            }
            crosshairs.draw();
            crosshairs.label = distance + '/' + range + 'ft.';
        }
    },
    
    _configWarpgateOptions: (tokenDocument, castingActor, updates) => {
        if(!castingActor) return {};
        const width = updates?.token?.width ?? tokenDocument.width;
        const interval = width % 2 === 0 ? 1 : -1;
        return {
            controllingActor: castingActor,
            crosshairs: {
                interval: interval
            }
        };
    }
}

export default summons;