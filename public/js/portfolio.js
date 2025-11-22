function toggleEmailFormatOptions() {
    const mailingListCheckbox = document.getElementById("mailingList"); // checkbox
    const emailFormatContainer = document.getElementById("emailFormat-container"); // radio

    if (mailingListCheckbox.checked) { // set format display based on checked
        emailFormatContainer.style.display = "block";
    } else {
        emailFormatContainer.style.display = "none";
    }
}
const mailingListCheckbox = document.getElementById("mailingList"); // checkbox
if (mailingListCheckbox) {
    mailingListCheckbox.addEventListener('change', toggleEmailFormatOptions); // if checkbox changes
}

function toggleOtherBox() {
    const otherDropdown = document.getElementById("meet"); // dropdown
    const otherContainer = document.getElementById("other-container"); // textbox

    if (otherDropdown.value === "other-dropdown") { // set format display based on if other dropdown selected
        otherContainer.style.display = "block";
    } else {
        otherContainer.style.display = "none";
    }
}
const otherDropdown = document.getElementById("meet"); // dropdown box
if (otherDropdown) {
    otherDropdown.addEventListener('change', toggleOtherBox); // if dropdown box changes
    toggleOtherBox();
}

document.getElementById('form').onsubmit = () => {
    clearErrors();
    let isValid = true;

    let mailingList = document.getElementsByName("mailingList");
    let emailFormat = document.getElementsByName("emailFormat");
    let fname = document.getElementById('fname').value.trim();
    let lname = document.getElementById('lname').value.trim();
    let jobTitle = document.getElementById('jobTitle').value.trim();
    let company = document.getElementById('company').value.trim();
    let linkedIn = document.getElementById('linkedIn').value.trim();
    let email = document.getElementById('email').value.trim();
    let meet = document.getElementById('meet').value;
    let other = document.getElementById("other").value.trim(); 
    let message = document.getElementById('message').value.trim();

    // Validate first name
    if (!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    // Validate last name
    if (!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }
    // Validate LinkedIn url
    if (linkedIn && !linkedIn.includes("https://linkedin.com/in/")) {
        document.getElementById("err-linkedIn").style.display = "block";
        isValid = false;
    }

    // If text in box and it does not contain @ and .
    if (email && (email.indexOf("@") === -1 || email.indexOf(".") === -1)) {
        document.getElementById("err-emailFormat").style.display = "block";
        isValid = false;
    }

    // check if mailing list is checked
    let isChecked = false;
    for (let i=0; i<mailingList.length; i++) {
        if (mailingList[i].checked) {
            isChecked = true;
        }
    }

    if (isChecked && !email) {
        document.getElementById("err-email-empty").style.display = "block";
        isValid = false;
    }

    // Validate email format
    let count = 0;
    for (let i=0; i<emailFormat.length; i++) {
        if (emailFormat[i].checked) {
            count++;
        }
    }
    if (count === 0 && isChecked) {
        document.getElementById("err-format-radio").style.display = "block";
        isValid = false;
    }
    // Validate how did we meet
    if (meet === "none") {
        document.getElementById("err-meet").style.display = "block";
        isValid = false;
    }
    if (meet === "other-dropdown" && !other) {
        document.getElementById("err-other").style.display = "block";
        isValid = false;
    }

    // Return isValid flag
    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display = "none";
    }
}