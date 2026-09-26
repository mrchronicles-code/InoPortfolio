const mainNav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        mainNav.classList.add("scrolled");
    } else {
        mainNav.classList.remove("scrolled");
    }

});


window.addEventListener("load", () => {

    setTimeout(() => {

        const targetSection =
            window.location.hash === "#contact"
                ? document.getElementById("contact")
                : document.querySelector(".id-card");

        if (targetSection) {

            targetSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 700);

});


const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document.getElementById("contactName").value.trim();

    const email =
        document.getElementById("contactEmail").value.trim();

    const message =
        document.getElementById("contactMessage").value.trim();


    const recipient =
        "hanahsofia.inosanto@cvsu.edu.ph";


    const subject =
        `I would like to know your portofolio, Hanah`;


    const body =
        `Message:\n${message}`;


    const gmailURL =
        "https://mail.google.com/mail/?view=cm&fs=1" +
        "&to=" + encodeURIComponent(recipient) +
        "&su=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);


    window.open(gmailURL, "_blank");

});