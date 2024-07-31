const alltable = document.getElementById("newreimbursements");
const allheadercells = alltable.querySelectorAll("th");
const allRows = Array.from(alltable.querySelectorAll("tbody tr"));
const tbody = alltable.getElementsByTagName("tbody");
const totalRow = tbody[0].children.length;
const itemsPerPage = 12;
let currentPage = 1;

function addTableSrNo() {
    for (let i = 0; i < totalRow; i++) {
        tbody[0].children[i].firstElementChild.innerText = i + 1;
    }
}

addTableSrNo();
let filteredRows = [];
function showPage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const rows = filteredRows.slice(startIndex, endIndex);
    // Hide all rows
    allRows.forEach((row) => (row.style.display = "none"));
    // Show rows for current page
    rows.forEach((row) => (row.style.display = ""));
}
function updatePaginationButtons() {
    const pageButtonsContainer = document.getElementById("page-buttons");
    if (pageButtonsContainer) {
        const buttons = pageButtonsContainer.querySelectorAll("button");
        buttons.forEach((button) => {
            button.classList.remove("active");
            if (Number(button.textContent) === currentPage) {
                button.classList.add("active");
            }
        });
    }
    if (pageButtonsContainer) {
        const prevButton = pageButtonsContainer.querySelector("button:first-child");
        const nextButton = pageButtonsContainer.querySelector(".next-button");

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === Math.ceil(filteredRows.length / itemsPerPage);
    }
}

function applySearchFilter(searchValue) {
    filteredRows = allRows.filter((row) => {
        const cellValue1 = row.cells[1].innerText.toLowerCase();
        const cellValue2 = row.cells[2].innerText.toLowerCase();
        const cellValue3 = row.cells[5].innerText.toLowerCase();
        const cellValue4 = row.cells[7].innerText.toLowerCase();
        return (
            cellValue1.includes(searchValue) ||
            cellValue2.includes(searchValue) ||
            cellValue3.includes(searchValue) ||
            cellValue4.includes(searchValue)
        );
    });
}
function applySelectionFilter(selectionValue) {
    filteredRows = filteredRows.filter((row) => {
        // Assuming each row has a data attribute or a cell with the selection value
        const cellValue2 = row.cells[2].innerText.trim().replace(/\s/g, "");
        const selectedText_2 = selectionValue.options[selectionValue.selectedIndex].text;
        const selectedText = selectedText_2.trim().replace(/\s/g, "");
        return cellValue2 === selectedText || selectedText === "Region";
    });
}
function applySelectionFilterZone(selectionValue) {
    filteredRows = filteredRows.filter((row) => {
        const cellValue2 = row.cells[3].innerText.trim().replace(/\s/g, "");
        const selectionValue2 = selectionValue.trim().replace(/\s/g, "");
        return cellValue2 === selectionValue2;
    });
}
function applySelectionFilterWoreda(selectionValue) {
    filteredRows = allRows.filter((row) => {
        const cellValue2 = row.cells[4].innerText.trim().replace(/\s/g, "");
        const selectionValue2 = selectionValue.trim().replace(/\s/g, "");
        return cellValue2 === selectionValue2;
    });
}

function renderPageButtons() {
    const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
    const pageButtonsContainer = document.getElementById("page-buttons");
    if (pageButtonsContainer) {
        pageButtonsContainer.innerHTML = "";
    }
    // Add previous page button
    const prevButton = document.createElement("button");
    prevButton.innerHTML = '<i class="fa fa-angle-left"></i>';

    // Add next page button
    const nextButton = document.createElement("button");
    nextButton.innerHTML = '<i class="fa fa-angle-right"></i>';

    // Angle bracket for left arrow
    prevButton.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updatePaginationButtons();
        }
    });
    if (pageButtonsContainer) {
        pageButtonsContainer.appendChild(prevButton);
    }
    // Add page buttons
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        if (i === currentPage) {
            button.classList.add("active");
        }

        button.addEventListener("click", function () {
            currentPage = i;
            showPage(currentPage);
            updatePaginationButtons();
        });
        if (pageButtonsContainer) {
            pageButtonsContainer.appendChild(button);
        }
    }

    // Angular bracket for right arrow
    nextButton.classList.add("next-button");
    nextButton.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
            updatePaginationButtons();
        }
    });
    if (pageButtonsContainer) {
        pageButtonsContainer.appendChild(nextButton);
    }
    updatePaginationButtons();
}
function compareCellValues(a, b, columnIndex) {
    const aCellValue = a.cells[columnIndex].textContent.trim().replace(/,/g, "");
    const bCellValue = b.cells[columnIndex].textContent.trim().replace(/,/g, "");
    const aNumber = parseFloat(aCellValue);
    const bNumber = parseFloat(bCellValue);

    if (!isNaN(aNumber) && !isNaN(bNumber)) {
        return aNumber - bNumber;
    }

    return aCellValue.localeCompare(bCellValue);
}

allheadercells.forEach(function (th) {
    // Default sort order
    let sortOrder = "asc";
    th.addEventListener("click", function () {
        const columnIndex = th.cellIndex;
        allRows.sort(function (a, b) {
            let comparison = compareCellValues(a, b, columnIndex);

            if (sortOrder === "desc") {
                comparison *= -1;
            }
            return comparison;
        });

        sortOrder = sortOrder === "asc" ? "desc" : "asc";
        allRows.forEach((row) => {
            alltable.tBodies[0].appendChild(row);
        });
        allRows.forEach((row, index) => {
            const firstCell = row.cells[0];
            firstCell.innerText = index + 1;
        });
        currentPage = 1;
        showPage(currentPage);
        renderPageButtons();
    });
});

const searchResultCount = document.getElementById("search-result-count");
const searchInputText = document.getElementById("search-text");
const SelectionRegion = document.getElementById("region_selection");

// Const selectedOption = selectionRegion.options[selectionRegion.selectedIndex];
// const selectedOptionText = selectedOption.textContent || selectedOption.innerText;
const SelectionZon = document.getElementById("zon_selection");
const SelectionWoreda = document.getElementById("woreda_selection");
const searchClearText = document.getElementById("search-text-clear");

searchClearText.style.display = "none";

// Function updateOptions(url, data, targetSelectId, defaultOptionText) {
//     $.ajax({
//         url: url,
//         method: "POST",
//         dataType: "json",
//         data: data,
//         success: function (options) {
//             const selectElement = document.getElementById(targetSelectId);
//             selectElement.innerHTML = "";
//             const defaultOption = document.createElement("option");
//             defaultOption.value = "";
//             defaultOption.textContent = defaultOptionText;
//             selectElement.appendChild(defaultOption);

//             options.forEach((option) => {
//                 const opt = document.createElement("option");
//                 opt.value = option.id;
//                 opt.textContent = option.name;
//                 selectElement.appendChild(opt);
//             });
//         },
//         error: function (error) {
//             console.error("Error fetching options:", error);
//         },
//     });
// }
function updateOptions(
    url,
    data,
    targetSelectId,
    defaultOptionText = "Select",
    originalEvent = "",
    selectdropdown = ""
) {
    $.ajax({
        url: url,
        method: "POST",
        dataType: "json",
        data: data,
        success: function (options) {
            var selectedvalue = " ";
            const selectElement = document.getElementById(targetSelectId);
            const selectedName = selectElement.options[selectElement.selectedIndex].text;
            if (selectdropdown === "reset") {
                selectedvalue = " ";
                defaultOptionText = "Zone";
                if (targetSelectId === "woreda_selection") {
                    defaultOptionText = "Woreda";
                }
            } else if (
                originalEvent !== "" &&
                (selectdropdown === "current_region" || selectdropdown === "region")
            ) {
                selectedvalue = " ";
            } else if (originalEvent !== "") {
                selectedvalue = " ";
            } else if (selectElement.selectedIndex > 0) {
                selectedvalue = selectElement.options[selectElement.selectedIndex].value;
                if (selectedName) {
                    defaultOptionText = selectedName;
                }
            } else if (selectElement.selectedIndex === 0 && selectedName !== "Select") {
                selectedvalue = selectElement.options[selectElement.selectedIndex].value;
                if (selectedName) {
                    defaultOptionText = selectedName;
                }
            }
            selectElement.innerHTML = "";
            const defaultOption = document.createElement("option");
            defaultOption.value = selectedvalue;
            defaultOption.textContent = defaultOptionText;
            selectElement.appendChild(defaultOption);

            options.forEach((option) => {
                const opt = document.createElement("option");
                opt.value = option.id;
                opt.textContent = option.name;
                selectElement.appendChild(opt);
            });
        },
        error: function (error) {
            console.error("Error fetching options:", error);
        },
    });
}

function handleSearch() {
    var searchValue = searchInputText.value;
    var SelectionRegionValue = SelectionRegion;
    var SelectionZonValue = SelectionZon.value;
    var SelectionWoredaValue = SelectionWoreda.value;

    if (typeof searchValue === "string") {
        searchValue = searchValue.toLowerCase();
    }

    if (
        searchValue ||
        SelectionRegionValue.value.trim() ||
        SelectionZonValue.trim() ||
        SelectionWoredaValue.trim()
    ) {
        filteredRows = allRows;
        if (searchValue) {
            applySearchFilter(searchValue);
            currentPage = 1;
            showPage(currentPage);
            renderPageButtons();
            // Update search result count
            searchResultCount.textContent = `Search found ${filteredRows.length} result(s)`;
        }
        if (SelectionRegionValue.value.trim()) {
            applySelectionFilter(SelectionRegionValue);
            currentPage = 1;
            showPage(currentPage);
            renderPageButtons();
            // Update search result count
            searchResultCount.textContent = `Search found ${filteredRows.length} result(s)`;
        }
        if (SelectionZonValue.trim()) {
            applySelectionFilterZone(SelectionZonValue);
            currentPage = 1;
            showPage(currentPage);
            renderPageButtons();
            if (searchValue) {
                applySearchFilter(searchValue);
            }
            // Update search result count
            searchResultCount.textContent = `Search found ${filteredRows.length} result(s)`;
        }
        if (SelectionWoredaValue.trim()) {
            applySelectionFilterWoreda(SelectionWoredaValue);
            if (searchValue) {
                applySearchFilter(searchValue);
            }
            currentPage = 1;
            showPage(currentPage);
            renderPageButtons();
            // Update search result count
            searchResultCount.textContent = `Search found ${filteredRows.length} result(s)`;
        }
    } else {
        filteredRows = allRows;
        currentPage = 1;
        showPage(currentPage);
        renderPageButtons();
        // Clear search result count
        searchResultCount.textContent = "";
    }

    searchClearText.style.display = searchValue ? "block" : "none";
}

searchInputText.addEventListener("input", handleSearch);
SelectionRegion.addEventListener("input", function (event) {
    handleSearch();
    const regionId = this.value;
    var ev = event.originalEvent;

    if (regionId === " ") {
        updateOptions(
            "/update_zone_options",
            {region_id: 0, check_permission: true, list: true},
            "zon_selection",
            "Select",
            ev,
            "reset"
        );
        updateOptions(
            "/update_woreda_options",
            {zone_id: 0, check_permission: true, list: true},
            "woreda_selection",
            "Select",
            ev,
            "reset"
        );
    } else {
        updateOptions(
            "/update_zone_options",
            {region_id: regionId, check_permission: true},
            "zon_selection",
            "Select",
            ev,
            "reset"
        );

        updateOptions(
            "/update_woreda_options",
            {zone_id: 0, check_permission: true, regionId: regionId},
            "woreda_selection",
            "Select",
            ev,
            "reset"
        );
    }
});
SelectionZon.addEventListener("input", function () {
    handleSearch();
    const zoneId = this.value;
    var ev = event.originalEvent;
    if (zoneId === " ") {
        updateOptions(
            "/update_woreda_options",
            {zone_id: 0, check_permission: true, list: true},
            "woreda_selection",
            "Select",
            ev,
            "reset"
        );
    } else {
        updateOptions(
            "/update_woreda_options",
            {zone_id: zoneId, check_permission: true},
            "woreda_selection",
            "Select",
            ev,
            "reset"
        );
    }
});
SelectionWoreda.addEventListener("input", handleSearch);

searchClearText.addEventListener("click", function () {
    searchInputText.value = "";
    handleSearch();
});

document.addEventListener("click", function (event) {
    if (event.target !== searchInputText && event.target !== searchClearText) {
        searchClearText.style.display = searchInputText.value ? "block" : "none";
    }
});

// Initial setup
filteredRows = allRows;
showPage(currentPage);
renderPageButtons();

function validateForm() {
    var approvedBy = document.getElementById("approved_by").value;
    var reason = document.getElementById("reason").value;

    if (approvedBy === "" || reason.trim() === "") {
        alert("Please fill out all required fields.");
        return false; // Prevent form submission
    }

    // Additional custom validation logic can be added here

    return true; // Allow form submission
}

window.openModalWithButtonData = function (att) {
    var groupId = att.getAttribute("data-group-id");
    const buttonText = att.textContent.trim();
    const number = buttonText.split(" ").pop();
    sessionStorage.setItem("EditRequestId", number);

    var editRequestId = sessionStorage.getItem("EditRequestId");

    if (editRequestId) {
        updateOptions("/set_edit_request_id", {edit_request_id: editRequestId});
    } else {
        console.error("EditRequestId not found in sessionStorage");
    }
};

function updateOptions(
    url,
    data,
    targetSelectId,
    defaultOptionText = "Select",
    originalEvent = "",
    selectdropdown = ""
) {
    $.ajax({
        url: url,
        method: "POST",
        dataType: "json",
        data: data,
        success: function () {
            console.log("update option success");
        },
    });
}
