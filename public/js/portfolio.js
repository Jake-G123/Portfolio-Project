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
    if (!linkedinurl) {
        document.getElementById("err-linkedin-url").style.display = "block";
        isValid = false;
    }

    // Validate email
    let email = document.getElementById('email').value.trim();
    if (!email || email.indexOf("@") === -1) {
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

    // Validate how did we meet
    let size = document.getElementById('meet').value;
    if (size === "none") {
        document.getElementById("err-meet").style.display = "block";
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