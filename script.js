document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
    const searchHistoryTable = document.getElementById("searchHistoryTable");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");

    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    function displayHistory() {
        searchHistoryTable.innerHTML = `
            <tr>
                <th>Search Term</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        ` + searchHistory
            .map((entry, index) => `
                <tr>
                    <td>${entry.term}</td>
                    <td>${entry.date}</td>
                    <td><button class="deleteBtn" data-index="${index}">Delete</button></td>
                </tr>
            `)
            .join("");

        // Add event listeners for delete buttons
        const deleteBtns = document.querySelectorAll(".deleteBtn");
        deleteBtns.forEach(btn => {
            btn.addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                deleteSearchTerm(index);
            });
        });
    }

    function addSearchTerm(term) {
        if (term && !searchHistory.some(entry => entry.term === term)) {
            const date = new Date().toLocaleDateString();
            searchHistory.push({ term, date });
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            displayHistory();
        }
    }

    function deleteSearchTerm(index) {
        searchHistory.splice(index, 1);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        displayHistory();
    }

    searchBtn.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();
        addSearchTerm(searchTerm);
        searchInput.value = "";
    });

    clearHistoryBtn.addEventListener("click", () => {
        searchHistory = [];
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        displayHistory();
    });

    displayHistory();
});
