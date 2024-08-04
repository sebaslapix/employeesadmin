const FormValidation = (form) => {

    const formData = new FormData(form);

    let completeObject = {};
    let count = 0;

    for (let [name, value] of formData) {
        completeObject[name] = value;
        if(completeObject[name].toString().trim() === ""){
            count = count + 1;
        }
    }

    return count === 0 ? true : false;
}

export default FormValidation;