export const effectsUtility = {
    createSummonedActorEffect: () => {
        return {
            'name': 'Summoned Creature',
            'icon': originItem.img,
            'duration': {
                'seconds': duration
            },
            'origin': originItem.uuid,
            'flags': {
                'effectmacro': {
                    'onDelete': {
                        'script': chris.functionToString(effectMacro)
                    }
                }
            }
        };
    },
    
    createCasterActorEffect: (abilityItem, targetEffectId) => {
        return {
            'name': abilityItem.name,
            'icon': abilityItem.img,
            'duration': {
                'seconds': duration
            },
            'origin': abilityItem.uuid,
            'flags': {
                'effectmacro': {
                    'onDelete': {
                        'script': 'let effect = await fromUuid("' + targetEffectId + '"); if (effect) await phoenixSummons.summons.unSummon(effect);'
                    }
                }
            }
        };
    }    
}

export default effectsUtility;