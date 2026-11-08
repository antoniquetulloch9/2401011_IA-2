const savedRegistration = localStorage.getItem("codingConfRegistration");


if (!savedRegistration) {
    window.location.href = "index.html";
} else {
    const registration = JSON.parse(savedRegistration);

    document.getElementById("ticketName").textContent =
        registration.fullName.split(" ")[0];

    document.getElementById("ticketFullName").textContent =
        registration.fullName;

    document.getElementById("ticketEmail").textContent =
        registration.email;

    document.getElementById("ticketAvatar").src =
        registration.avatar;

    document.getElementById("serialNumber").textContent =
        registration.ticketNumber;

    const githubUsername = registration.github.substring(1);

    const githubLink = document.getElementById("ticketGithub");

    githubLink.textContent = registration.github;
    githubLink.href =
        "https://github.com/" + encodeURIComponent(githubUsername);
}