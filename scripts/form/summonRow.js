import utility from "../utilities/utility.js";
import constants from "../constants.js";

export default class SummonRow {
    constructor(summonForm, summonId) {
        this.summonForm = summonForm;
        this.html = summonForm.html;

        const actor = game.actors.get(summonId);
        if (!actor) {
            console.error(`Actor not found to build summon row! actorId: ${summonId}`);
        }
        this.summonData = actor;
        
        this.createForm();
    }
    
    async createForm() {
        const rowContent = await utility.fetch(constants.urls.summonFormTemplateRow);

        const container = this.html.find("#SummonItem");
        container.append(rowContent);
        
        this.setRowImage();
        this.setRowText();
        this.setRowButton();        
    }

    setRowImage() {
        const summonImage = this.html.find("#SummonImage");
        summonImage.attr("src", this.summonData.img);
    }

    setRowText() {
        const summonText = this.html.find("#SummonText");
        summonText.append(`<p>${this.summonData.name}</p>`);
    }

    setRowButton() {
        const summonRemove = this.html.find("#SummonRemove");
        summonRemove.on("click", async event => {
            this.summonForm.removeSummon();
        });
    }
    
}