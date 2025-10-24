function toggleEmailFormatOptions() {
    const mailingListCheckbox = document.getElementById("mailing-list"); // checkbox
    const emailFormatContainer = document.getElementById("email-format-container"); // radio

    if (mailingListCheckbox.checked) { // set format display based on checked
        emailFormatContainer.style.display = "block";
    } else {
        emailFormatContainer.style.display = "none";
    }
}
const mailingListCheckbox = document.getElementById("mailing-list"); // checkbox
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

document.getElementById('portfolio-form').onsubmit = () => {

    clearErrors();

    // Flag variable to determine if form data is valid
    let isValid = true;

    // Validate first name
    let fname = document.getElementById('fname').value.trim();
    if (!fname) {
        document.getElementById("err-fname").style.display = "block";
        isValid = false;
    }

    // Validate last name
    let lname = document.getElementById('lname').value.trim();
    if (!lname) {
        document.getElementById("err-lname").style.display = "block";
        isValid = false;
    }
    // Validate job title
    let jobTitle = document.getElementById('job-title').value.trim();
    if (!jobTitle) {
        document.getElementById("err-job-title").style.display = "block";
        isValid = false;
    }
    // Validate company
    let company = document.getElementById('company').value.trim();
    if (!company) {
        document.getElementById("err-company").style.display = "block";
        isValid = false;
    }
    // Validate LinkedIn url
    let linkedinurl = document.getElementById('linkedin-url').value.trim();
    if (linkedinurl && !linkedinurl.includes("https://linkedin.com/in/")) {
        document.getElementById("err-linkedin-url").style.display = "block";
        isValid = false;
    }

    // Validate email
    let email = document.getElementById('email').value.trim();
    if (email && (email.indexOf("@") === -1 || email.indexOf(".") === -1)) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }

    // Validate email format
    let formatButtons = document.getElementsByName("email-format");
    let count = 0;
    for (let i=0; i<formatButtons.length; i++) {
        if (formatButtons[i].checked) {
            count++;
        }
    }
    if (count === 0) {
        document.getElementById("err-format-radio").style.display = "block";
        isValid = false;
    }

    let mailingList = document.getElementsByName("mailing-list");
    let count1 = 0;
    for (let i=0; i<mailingList.length; i++) {
        if (mailingList[i].checked) {
            count1++;
        }
    }
    if (count1 > 0 && !email) {
        document.getElementById("err-email").style.display = "block";
        isValid = false;
    }
    // Validate how did we meet
    let size = document.getElementById('meet').value;
    if (size === "none") {
        document.getElementById("err-meet").style.display = "block";
        isValid = false;
    }
    let otherText = document.getElementById("other").value.trim();
    if (size === "other-dropdown" && !otherText) {
        document.getElementById("err-other").style.display = "block";
        isValid = false;
    }

    // Validate message
    let message = document.getElementById('message').value.trim();
    if (!message) {
        document.getElementById("err-message").style.display = "block";
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