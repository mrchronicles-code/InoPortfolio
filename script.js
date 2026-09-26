const mainNav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        mainNav.classList.add("scrolled");
    } else {
        mainNav.classList.remove("scrolled");
    }

});


const projectTabs = document.querySelectorAll(".category-buttons button");
const dropdownItems = document.querySelectorAll(".category-dropdown-menu button");
const activityItems = document.querySelectorAll(".activity");
const folderSearch = document.getElementById("folderSearch");

const categoryButtons = document.querySelector(".category-buttons");
const categoryDropdown = document.querySelector(".category-dropdown");
const categoryDropdownToggle = document.getElementById("categoryDropdownToggle");
const categoryDropdownMenu = document.getElementById("categoryDropdownMenu");
const categoryDropdownText = document.getElementById("categoryDropdownText");


function filterProjects(category) {

    const searchText =
        folderSearch.value.toLowerCase().trim();

    activityItems.forEach((activity) => {

        const activityName =
            activity.querySelector("p")?.textContent.toLowerCase() || "";

        const matchesCategory =
            category === "all" ||
            activity.dataset.category === category;

        const matchesSearch =
            activityName.includes(searchText);

        if (matchesCategory && matchesSearch) {
            activity.classList.remove("hidden");
        } else {
            activity.classList.add("hidden");
        }

    });

}


function updateCategory(category) {

    projectTabs.forEach((button) => {

        button.classList.toggle(
            "active",
            button.dataset.category === category
        );

    });

    dropdownItems.forEach((button) => {

        button.classList.toggle(
            "active",
            button.dataset.category === category
        );

    });

    const selectedButton =
        [...dropdownItems].find(
            (button) => button.dataset.category === category
        );

    if (selectedButton) {
        categoryDropdownText.textContent =
            selectedButton.textContent.trim();
    }

    filterProjects(category);

}


projectTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        const category = tab.dataset.category;

        updateCategory(category);

    });

});


categoryDropdownToggle.addEventListener("click", (event) => {

    event.stopPropagation();

    const isOpen =
        categoryDropdownMenu.classList.contains("open");

    categoryDropdownMenu.classList.toggle(
        "open",
        !isOpen
    );

    categoryDropdownToggle.classList.toggle(
        "open",
        !isOpen
    );

    categoryDropdownToggle.setAttribute(
        "aria-expanded",
        !isOpen
    );

});


dropdownItems.forEach((item) => {

    item.addEventListener("click", () => {

        const category = item.dataset.category;

        updateCategory(category);

        categoryDropdownMenu.classList.remove("open");
        categoryDropdownToggle.classList.remove("open");
        categoryDropdownToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


document.addEventListener("click", (event) => {

    if (!categoryDropdown.contains(event.target)) {

        categoryDropdownMenu.classList.remove("open");
        categoryDropdownToggle.classList.remove("open");

        categoryDropdownToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


folderSearch.addEventListener("input", () => {

    const activeTab =
        document.querySelector(
            ".category-buttons button.active"
        );

    const category =
        activeTab?.dataset.category || "all";

    filterProjects(category);

});


function checkCategoryLayout() {

    if (!categoryButtons || !categoryDropdown) {
        return;
    }

    categoryButtons.style.display = "flex";
    categoryDropdown.style.display = "none";

    const needsDropdown =
        categoryButtons.scrollWidth >
        categoryButtons.clientWidth + 1;

    if (needsDropdown) {

        categoryButtons.style.display = "none";
        categoryDropdown.style.display = "block";

    } else {

        categoryButtons.style.display = "flex";
        categoryDropdown.style.display = "none";

        categoryDropdownMenu.classList.remove("open");
        categoryDropdownToggle.classList.remove("open");

        categoryDropdownToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


window.addEventListener("resize", checkCategoryLayout);


window.addEventListener("load", () => {

    checkCategoryLayout();

    updateCategory("all");

    const params =
        new URLSearchParams(window.location.search);

    if (params.get("scroll") === "projects") {

        history.replaceState(
            null,
            "",
            window.location.pathname
        );

        setTimeout(() => {

            const projectsSection =
                document.getElementById("projects");

            if (projectsSection) {

                projectsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 100);

    }

});