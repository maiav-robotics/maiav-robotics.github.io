document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab-item");
    const contents = document.querySelectorAll(".tab-content");

    // Function to activate a tab and its corresponding content
    function activateTab(tab) {
        tabs.forEach(item => item.classList.remove("active"));
        contents.forEach(content => content.classList.remove("active"));

        tab.classList.add("active");
        document.getElementById(tab.getAttribute("data-tab")).classList.add("active");
    }

    // Set default active tab to Day 1
    const defaultTab = document.querySelector(".tab-item[data-tab='day1']");
    activateTab(defaultTab);

    // Add click event listener to all tabs
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            activateTab(this);
        });
    });
});
