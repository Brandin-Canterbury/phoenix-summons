import utility from "./utilities/utility.js";
import chatUtility from "./utilities/chatUtility.js";
import summons from "./summons.js";
import formService from "./form/formService.js";


Hooks.on("renderItemSheet", async (app, html, data) => {
    formService.createForm(app, html, data);
    console.log(`Render Called on ${app.object.name}`);    
});

Hooks.on("preCreateChatMessage", async (chatMessageData, options, userId) => {
    const chatData = chatUtility.processChatMessage(chatMessageData);
    if(!chatData.isSummon) return;
    summons.summonActor(chatData);
});

Hooks.on("closeItemSheet", async  (app, html, data) => {
    formService.removeForm(app.id);
});

globalThis['phoenixSummons'] = {
    formService,
    utility,
    summons
}