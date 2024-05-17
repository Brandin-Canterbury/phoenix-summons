import jb2a from "./jb2a.js";
import utility from "./utilities/utility.js";
import actorUtility from "./utilities/actorUtility.js";
import constants from "./constants.js";

export const animation = {
    startCasterSummon: (casterToken, color) => {
        const casterFull = jb2a.buildCasterCircle(jb2a.spheres.conjuration, jb2a.types.complete, color);
        animation.getSequence(casterToken, casterFull).play();
    },
    
    loopCasterSummon: (casterToken, color) => {
        const casterLoop = jb2a.buildCasterCircle(jb2a.spheres.conjuration, jb2a.types.loop, color);

        animation.getLoopSequence(casterToken, casterLoop).delay(4000).play();
    },
    
    endCasterSummon: async (casterToken, color) => {
        const casterOutro = jb2a.buildCasterCircle(jb2a.spheres.conjuration, jb2a.types.outro, color);

        animation.getSequence(casterToken, casterOutro).play();

        await utility.wait(1000);
        await animation.endPersistentAnimation(casterToken);
    },

    getLoopSequence: (token, anim) => {
        return animation.getSequence(token, anim).persist().name(token.actor.name);
    },

    getSequence: (token, anim) => {
        return new Sequence().effect().file(anim).atLocation(token).belowTokens(true).scale(0.25);
    },
    
    endPersistentAnimation: async (token) => {
        await Sequencer.EffectManager.endEffects({ name: token.actor.name });
    },
    
    playNormalTargetSummon: (casterActor, summonedToken) => {
        
        const preSpawn = "jb2a.misty_step.02.grey";
        const spawnAnim = "jb2a.impact.boulder.01";
        const floorMark = "jb2a.burrow";
        
        new Sequence()
            .sound()
            .file(`${constants.modulePath}sounds/Normal_Summon_2.wav`)
            .effect()
            .file(preSpawn)
            .atLocation(summonedToken)
            .play();
        
        new Sequence()
            .animation()
            .delay(1000)
            .on(summonedToken)
            .fadeIn(1000)
            .play()
            
        new Sequence()
            .effect()
            .delay(1500)
            .file(spawnAnim)
            .atLocation(summonedToken)
            .belowTokens(true)
            .effect()
            .file(floorMark)
            .atLocation(summonedToken)
            .delay(1500)
            .belowTokens(true)
            .play();
    },
    
    playFireTargetSummon: (casterActor, summonedActor) => {
        const linkAnim = "jb2a.scorching_ray.orange.02";
        const preSpawn = "jb2a.flaming_sphere.200px.orange.02";
        const spawnAnim = "jb2a.fireball.explosion.orange";
        const floorMark = "jb2a.ground_cracks.orange.01";        
    },
    
    playVoidTargetSummon: (casterActor, summonedActor) => {
        const linkAnim = "jb2a.eldritch_blast.orange";
        const preSpawn = "jb2a.arms_of_hadar.dark_purple";
        const spawnAnim = "jb2a.fireball.explosion.orange";
        const floorMark = "jb2a.burrow";

    },

    playIceTargetSummon: (casterActor, summonedActor) => {
        const linkAnim = "jb2a.eldritch_blast.orange";
        const preSpawn = "jb2a.eruption.orange.01";
        const spawnAnim = "jb2a.ice_spikes.radial.burst.white";
        const floorMark = "jb2a.impact.ground_crack.frost.01.white";
    },
    
    playEarthTargetSummon: (casterActor, summonedActor) => {
        const spawnAnim = "jb2a.impact.earth.01.browngreen";
    },


    playPoisonTargetSummon: (casterActor, summonedActor) => {
        const linkAnim = "jb2a.eldritch_blast.orange";
        const preSpawn = "jb2a.eruption.orange.01";
        const spawnAnim = "jb2a.fireball.explosion.orange";
        const floorMark = "jb2a.burrow";

    },

    playNatureTargetSummon: (casterActor, summonedActor) => {
        const linkAnim = "jb2a.eldritch_blast.orange";
        const preSpawn = "jb2a.eruption.orange.01";
        const spawnAnim = "jb2a.fireball.explosion.orange";
        const floorMark = "jb2a.plant_growth.03.round.4x4.complete.greenyellow";
    },
    
    playDemonicTargetSummon: (casterActor, summonedActor) => {
        const overlayAnim = "jb2a.energy_strands.complete.grey";
        const floorAnim = "jb2a.burrow";
        const linkAnim = "jb2a.energy_strands.range.multiple.grey";
        
    }
    
}

export default animation;