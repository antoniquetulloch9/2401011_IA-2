
const registrationForm = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");

const email = document.getElementById("email");

const github = document.getElementById("github");

const avatar = document.getElementById("avatar");

const nameError = document.getElementById("nameError");

const emailError = document.getElementById("emailError");

const githubError = document.getElementById("githubError");

const avatarError = document.getElementById("avatarError");


registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    githubError.textContent = "";
    avatarError.textContent = "";

    let isValid = true;

    const nameValue = fullName.value.trim();

    const emailValue = email.value.trim();

    const githubValue = github.value.trim();

    const avatarFile = avatar.files[0];

    
    if (nameValue === "") {
        nameError.textContent = "Please enter your full name.";
        isValid = false;
    }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

   
    const githubPattern = /^@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

    if (!githubPattern.test(githubValue)) {
        githubError.textContent =
            "Enter a valid GitHub username beginning with @.";
        isValid = false;
    }

    
    if (!avatarFile) {
        avatarError.textContent = "Please upload a profile picture.";
        isValid = false;
    } else if (
        avatarFile.type !== "image/jpeg" &&
        avatarFile.type !== "image/png"
    ) {
        avatarError.textContent = "Only JPEG and PNG images are allowed.";
        isValid = false;
    } else if (avatarFile.size >= 500 * 1024) {
        avatarError.textContent = "Image must be smaller than 500KB.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    
    const reader = new FileReader();

    reader.onload = function () {

        

        const ticketNumber =
            "CC-" + Math.floor(10000 + Math.random() * 90000);

      
        const registrationDetails = {
            fullName: nameValue,
            email: emailValue,
            github: githubValue,
            avatar: reader.result,
            ticketNumber: ticketNumber
        };

        try {
            localStorage.setItem(
                "codingConfRegistration",
                JSON.stringify(registrationDetails)
            );

            
            window.location.href = "ticket.html";

        } catch (error) {
            avatarError.textContent =
                "Unable to save your picture. Try a smaller image.";
        }
    };

    reader.onerror = function () {
        avatarError.textContent =
            "Unable to read your picture. Please try again.";
    };

    reader.readAsDataURL(avatarFile);
});
   