import flagUtility from "../utilities/flagUtility.js";
import jb2a from "../jb2a.js";
import utility from "../utilities/utility.js";
import constants from "../constants.js";
import SummonRow from "./summonRow.js";

export default class SummonForm {
    flags = {
    }
    
    constructor(app, html) {
        this.html = html;
        this.itemObject = app.object;
        this.id = app.id;
        
        this.initForm();
        this.initFormData();
    }
    
    async initFormData() {
        this.flags[constants.flags.flagNameSpace] = {};
        if(this.itemObject.flags[constants.flags.flagNameSpace] === undefined) {
            await this.createFlagData();
        }
        this.flags[constants.flags.flagNameSpace] = this.itemObject.flags[constants.flags.flagNameSpace];
    }

    async initForm() {
        this.createTabButton();
        await this.createFormBody();
        this.createControls();
        this.renderForm();
    }
    
    //Initial Form Construction and Event Binding
    
    createTabButton() {
        const tabButton = $(`<a id="SummonsTab" class="item" data-tab="summons">Summons</a>`);
        const tabs = this.html.find('.tabs[data-group="primary"]');
        tabs.append(tabButton);
    }
    
    async createFormBody() {
        const tabContent = await utility.fetch(constants.urls.summonFormTemplate);
        this.html.find('.sheet-body').append(tabContent);

        const summonsDropContainer = this.html.find("#SummonsDrop");
        summonsDropContainer.on("drop", async event => {
            await this.actorDropContainerEvent(event, this.itemObject);
        });       
    }

    createControls() {
        const casterSelect = this.html.find("#SummonCasterAnimation");
        casterSelect.append(this.getCasterSelectOptions());
        casterSelect.change(event => {
            const value = event.target.value;
            this.setFlagData(constants.flags.casterColor, value);
            this.updateData();
        });

        const targetSelect = this.html.find("#SummonTargetAnimation");
        targetSelect.append(this.getTargetSelectOptions());
        targetSelect.change(event => {
            const value = event.target.value;
            this.setFlagData(constants.flags.targetAnimation, value);
            this.updateData();
        });
    }
    
    
    //Form Update and Re-Rendering
    
    renderForm() {
        this.updateDropContainer();
        this.updateSummonItem();
    }
    
    
    // Summon Updating and rendering
    updateSummonItem() {
        const summonId = this.getFlagData()[constants.flags.summonId];
        const summonContainer = this.html.find("#SummonItem");
        if(summonId === "") {
            summonContainer.empty();
            return;
        }
        
        this.summonRow = new SummonRow(this, summonId);
    }
    
    removeSummon() {
        this.summonRow = undefined;
        this.setFlagData(constants.flags.summonId, "");
        this.updateData();
        this.renderForm();
    }

    //Dropdown Controls

    getCasterSelectOptions() {
        return jb2a.getCircleMapping().map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
    }

    getTargetSelectOptions() {
        return jb2a.getSummonAnimationDropdown().map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
    }

    
    //Drop Container
    updateDropContainer() {
        const summonControls = this.html.find("#SummonControls");
        const summonDropGM = this.html.find("#SummonsDrop");
        const summonDropNoGM = this.html.find("#SummonDropNoGM");
        if (!summonControls.hasClass("summon-hidden")) {
            summonControls.addClass("summon-hidden");
        }
        if (!summonDropNoGM.hasClass("summon-hidden")) {
            summonDropNoGM.addClass("summon-hidden");
        }
        if (!summonDropGM.hasClass("summon-hidden")) {
            summonDropGM.addClass("summon-hidden");
        }

        if (this.getFlagData().summonId === "") {
            if (game.user.isGM) {
                summonDropGM.removeClass("summon-hidden");
                return;
            }
            summonDropNoGM.removeClass("summon-hidden");
        } else {            
            summonControls.removeClass("summon-hidden");
        }
    }
    
    async actorDropContainerEvent(event, itemObject) {
        event.preventDefault();
        event = event.originalEvent;
        try {
            const dropData = this.parseDropEventData(event);
            const summonId = utility.parseUuid(dropData.uuid);
            this.setFlagData(constants.flags.summonId, summonId);
            this.setFlagData(constants.flags.summonActive, true);
            this.updateData();
            this.renderForm();
        } catch (err) {
            console.log("Error on drop:", err);
        }
    }

    parseDropEventData(event) {
        const dropData = JSON.parse(event.dataTransfer.getData('text/plain'));
        if (dropData.type !== "Actor") {
            ui.notifications.error("You can only drop actors into this field.");
            throw new Error("Missing Drop Data!");
        }
        return dropData;
    }
    
    
    //Data Methods
    async createFlagData() {
        await flagUtility.createFlagObject(this.itemObject);
    }
    
    updateData() {
        flagUtility.updateDocumentItem(this.itemObject.id, this.flags);
    }
    
    getFlagData() {
        return this.flags[constants.flags.flagNameSpace];
    }
    
    setFlagData(key, value) {
        this.flags[constants.flags.flagNameSpace][key] = value;
    }
}