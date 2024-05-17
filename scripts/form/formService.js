import SummonForm from "./summonForm.js";

export const formService = {
    formData: [],
    
    createForm: (app, html, data) => {
      let itemForm = new SummonForm(app, html);
      formService.formData.push(itemForm);
    },
    
    getForm: (formId) => {
      return formService.formData.find(x => x.id === formId);  
    },
    
    addForm: (form) => {
        formService.formData.push(form);
    },
    
    removeForm: (formId) => {
        formService.formData = formService.formData.filter(x => x.id !== formId);
    },
}

export default formService;