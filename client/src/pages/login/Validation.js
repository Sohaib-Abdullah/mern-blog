export default function Validation(values) {
 
    const errors ={}

    
    const password_pattern = "^[A-Za-z9-0]{6,}$"

 
    if(values.password === ""){
        errors.password = "password is Required";
    }
   
    return errors;
}