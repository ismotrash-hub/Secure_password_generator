const button = document.getElementById("generate_button"); // interraction with the generate-button stored inside "button"
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const password_length = document.getElementById("number_amount");
const numbers = document.getElementById("numbers");
const copybutton = document.getElementById("copy-button");
const symbols = document.getElementById("symbols")
const length = document.getElementById("number-amount")


button.addEventListener("click", button_clicked);
uppercase.addEventListener("change", uppercase_chosen);
lowercase.addEventListener("change", lowercase_chosen);
numbers.addEventListener("change", numbers_chosen);
copybutton.addEventListener("click", copybutton_clicked);
symbols.addEventListener("change", symbols_chosen)


let user_uppercase = true;
let user_lowercase = true;
let user_numbers_included = true;
let user_symbols_included = true;

function uppercase_chosen() {
    if (uppercase.checked === true){
        user_uppercase = true;

    }
    else {
        user_uppercase = false;

    }

}

function lowercase_chosen() {
    if (lowercase.checked === true){
        user_lowercase = true;
    }
    else {
        user_lowercase = false;

    }

}

function numbers_chosen() {
    if (numbers.checked === true){
        user_numbers_included = true;
    }
    else {
        user_numbers_included = false;
    }
}


function symbols_chosen(){
    if (symbols.checked === true){
        user_symbols_included = true;
    }
    else{
        user_symbols_included = false;
    }
}

function user_variables_included(){
    const upper_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower_list = "abcdefghijklmnopqrstuvwxyz";
    const number_list = "0123456789";
    const symbol_list = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
    let character_list = "";



    // Checking if elements are included
    if (user_uppercase === true){character_list += upper_list;}
    if (user_lowercase === true){character_list += lower_list;}
    if (user_numbers_included === true){character_list += number_list;}
    if (user_symbols_included === true){character_list += symbol_list;}



    if (character_list.length === 0){
        const password_error_output = document.getElementById("password-output");
        password_error_output.textContent = "No checkboxes checked";
        return;
    }
    return character_list;
    
}

function password_generation(settings, password_length) {
    const randomArray = new Uint32Array(1);
    let password_array = [];
    const value_password_length = password_length;
    while(password_array.length < value_password_length){
        let number_found = false;
            while(number_found === false){
                crypto.getRandomValues(randomArray);
                const randomNumber = randomArray[0];
                let max_number_allowed = 2**32 -(2**32%settings.length);
                max_number_allowed -= 1;
                if (randomNumber <= max_number_allowed){
                    const indx_for_list = randomNumber % settings.length;
                    const password_character = settings[indx_for_list];
                    password_array.push(password_character);
                    number_found = true;
                }

            }
        }
    const password_return = password_array.join("");

    return password_return;
}

function testgenerator(){
    console.log("testing started");
    const character_listtest = user_variables_included();
    for (let i = 0; i < 10000; i++){
        const passwordtest = password_generation(character_listtest, 64);
        error_handling(passwordtest,64,character_listtest);
    }
}




function error_handling(password,value_password_length,character_list){

    console.assert(password.length === value_password_length, `Error, incorrect password length; expected: ${value_password_length} got: ${password.length}`);
    if(user_uppercase === false){console.assert((!/[A-Z]/.test(password)),"Error, user_uppercase");}
    if(user_lowercase === false){console.assert((!/[a-z]/.test(password)),"Error, user_lowercase");}
    if(user_numbers_included === false){console.assert((!/[0-9]/.test(password)),"Error, user_numbers_included");}
    if(user_symbols_included === false){console.assert((!/[^A-Za-z0-9]/.test(password)),"Error, user_symbols_included");}


    // Check if we have a character from outside the character pool
    const password_array = password.split("");
    console.assert(password_array.every(x => character_list.includes(x)),"{x} is not in the selected character list.");
    return;
}

function entropy(password,character_list){
    const entropy = password.length*Math.log2(character_list.length);
    const entropy_output = document.getElementById("entropy-output");
    const entropy_rounded = entropy.toFixed(2);
    entropy_output.textContent = entropy_rounded;

}
function button_clicked(){
    const password_length = length.valueAsNumber;
    const character_list = user_variables_included();
    const user_password = password_generation(character_list, password_length);
    error_handling(user_password, password_length, character_list);

    // Print the password to the user and let the user copy it
    const password_output = document.getElementById("password-output");
    password_output.textContent = user_password;
    const copied_output = document.getElementById("copied-message");
    copied_output.textContent = "";   
    entropy(user_password,character_list);
}
 




async function copybutton_clicked(){

    const current_password = document.getElementById("password-output");
    const current_password1 = current_password.textContent;
    const copied_output = document.getElementById("copied-message");
    try {
        await navigator.clipboard.writeText(current_password1);
        copied_output.textContent = "Copy successful";
    } catch(error){
        copied_output.textContent = "Password not copied, error";
    }

}


