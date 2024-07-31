$(document).ready(function () {
    $('.selectpicker').selectpicker();
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    console.log(cropIllnessType);
    console.log(livestockInfoData); 

    // Determine starting index based on existing crop_info_data
    var cropMaxIndex = 0;
    $('.crop-section-wrapper').each(function() {
        var cropIndex = parseInt($(this).attr('data-index'));
        if (!isNaN(cropIndex)) {
            cropMaxIndex = Math.max(cropMaxIndex, cropIndex);
        }
    });
    var cropIndex = cropMaxIndex + 1;

    var livestockMaxIndex = 0;
    $('.livestock-section-wrapper').each(function() {
        var livestockIndex = parseInt($(this).attr('data-index'));
        if (!isNaN(livestockIndex)) {
            livestockMaxIndex = Math.max(livestockMaxIndex, livestockIndex);
        }
    });
    var livestockIndex = livestockMaxIndex + 1;

    var landMaxIndex = 0;
    $('.land-section-wrapper').each(function() {
        var landIndex = parseInt($(this).attr('data-index'));
        if (!isNaN(landIndex)) {
            landMaxIndex = Math.max(landMaxIndex, landIndex);
        }
    });
    var landIndex = landMaxIndex + 1;

    if (cropInfoData && cropInfoData.length > 0) {
        cropInfoData.forEach(function(cropInfo) {
            VirtualSelect.init({
                ele: `#crop_illness_types_${cropInfo['index']}`,
                options: cropIllnessType,
                search: true,
                multiple: true,
                selectedValue: cropInfo.illness_type,
            });
        });
    }
    else {
        VirtualSelect.init({
            ele: `#crop_illness_types_0`,
            options: cropIllnessType,
            search: true,
            multiple: true,
        });
    }

    if (livestockInfoData && livestockInfoData.length > 0) {
        livestockInfoData.forEach(function(livestockInfo) {
            VirtualSelect.init({
                ele: `#livestock_illness_types_${livestockInfo['index']}`,
                options: livestockIllnessType,
                search: true,
                multiple: true,
                selectedValue: livestockInfo.illness_type,
            });
        });
    }
    else {
        VirtualSelect.init({
            ele: `#livestock_illness_types_0`,
            options: livestockIllnessType,
            search: true,
            multiple: true,
        });
    }

    $('#add-crop-info').click(function() {
        var $template = $('#crop-hidden-template').html();
        var $formContainer = $('#section-content-crop');

        // Use jQuery to replace {cropIndex} placeholder in the template
        var newLineHtml = $template.replace(/\{9999\}/g, cropIndex);
        var $newLine = $(newLineHtml);
        $formContainer.append($newLine);

        var newSelectIdIllness = `crop_illness_types_${cropIndex}`;
            VirtualSelect.init({
                ele: `#${newSelectIdIllness}`,
                options: cropIllnessType,
                search: true,
                multiple: true,
            });
        cropIndex++; // Increment index for next line
    });

    $('#add-livestock-info').click(function() {
        var $template = $('#livestock-hidden-template').html();
        var $formContainer = $('#section-content-livestock');

        // Use jQuery to replace {cropIndex} placeholder in the template
        var newLineHtml = $template.replace(/\{9999\}/g, livestockIndex);
        console.log(newLineHtml);
        var $newLine = $(newLineHtml);
        $formContainer.append($newLine);

        var newSelectIdIllness = `livestock_illness_types_${livestockIndex}`;
            VirtualSelect.init({
                ele: `#${newSelectIdIllness}`,
                options: livestockIllnessType,
                search: true,
                multiple: true,
            });
        livestockIndex++; // Increment index for next line
    });

    $('#add-land-info').click(function() {
        var $template = $('#land-hidden-template').html();
        var $formContainer = $('#section-content-land');

        // Use jQuery to replace {cropIndex} placeholder in the template
        var newLineHtml = $template.replace(/\{9999\}/g, landIndex);
        console.log(newLineHtml);
        var $newLine = $(newLineHtml);
        $formContainer.append($newLine);

        landIndex++; // Increment index for next line
    });

    $('#add-family-info').click(function() {
        var $template = $('#hiden-family-template').html();
        var $formContainer = $('#section-content-family');

        // Use jQuery to replace {cropIndex} placeholder in the template
        var newLineHtml = $template.replace(/\{9999\}/g, landIndex);
        console.log(newLineHtml);
        var $newLine = $(newLineHtml);
        $formContainer.append($newLine);

        landIndex++; // Increment index for next line
    });

    // Function to toggle display and required attribute of a field
    function toggleField(selectElementId, fieldId, inputId, yesText = "yes") {
        const selectElement = document.getElementById(selectElementId);
        const field = document.getElementById(fieldId);
        const input = document.getElementById(inputId);
        const selectedOptionText = selectElement.options[selectElement.selectedIndex].text
            .trim()
            .toLowerCase();

        if (selectedOptionText === yesText.toLowerCase()) {
            field.style.display = "block";
            input.setAttribute("required", "required");
        } else {
            field.style.display = "none";
            input.removeAttribute("required");
        }
    }

    // Function to handle changes in a select element
    function handleSelectChange(selectElementId, fieldId, inputId, otherText = "other") {
        const selectElement = document.getElementById(selectElementId);
        const field = document.getElementById(fieldId);
        const input = document.getElementById(inputId);
        const selectedOptionText = selectElement.options[selectElement.selectedIndex].text
            .trim()
            .toLowerCase();
        if (selectedOptionText === otherText.toLowerCase()) {
            field.style.display = "block";
            input.setAttribute("required", "required");
        } else {
            field.style.display = "none";
            input.removeAttribute("required");
        }
    }

    // Event listeners
    function handleNationalIdSelection() {
        const selectElement = document.getElementById("have-national-id-selection");
        const uidDiv = document.getElementById("uid-div");
        const ridDiv = document.getElementById("rid-div");
        const ridInput = document.getElementById("rid_input");
        const uidInput = document.getElementById("uid_input");
        const selectedOptionText = selectElement.options[selectElement.selectedIndex].text
            .trim()
            .toLowerCase();

        if (selectedOptionText === "yes") {
            uidDiv.style.display = "block";
            uidInput.setAttribute("required", "required");
            ridDiv.style.display = "none";
            ridInput.removeAttribute("required");
        } else if (selectedOptionText === "no") {
            uidDiv.style.display = "none";
            uidInput.removeAttribute("required");
            ridDiv.style.display = "block";
            ridInput.setAttribute("required", "required");
        } else {
            uidDiv.style.display = "none";
            uidInput.removeAttribute("required");
            ridDiv.style.display = "none";
            ridInput.removeAttribute("required");
        }
    }

    function handlePhoneNumberSelection() {
        const selectElement = document.getElementById("have-phone-no-selection");
        const primaryPhoneDiv = document.getElementById("primary-div");
        const otherPhoneDiv = document.getElementById("other-div");
        const primaryPhone = document.getElementById("primary_phone");
        const otherPhone = document.getElementById("other_phone");
        const selectedOptionText = selectElement.options[selectElement.selectedIndex].text
            .trim()
            .toLowerCase();

        if (selectedOptionText === "yes") {
            primaryPhoneDiv.style.display = "block";
            primaryPhone.setAttribute("required", "required");
            otherPhoneDiv.style.display = "none";
            otherPhone.removeAttribute("required");
        } else if (selectedOptionText === "no") {
            primaryPhoneDiv.style.display = "none";
            primaryPhone.removeAttribute("required");
            otherPhoneDiv.style.display = "block";
            otherPhone.setAttribute("required", "required");
        } else {
            primaryPhoneDiv.style.display = "none";
            primaryPhone.removeAttribute("required");
            otherPhoneDiv.style.display = "none";
            otherPhone.removeAttribute("required");
        }
    }

    // Event listener for national ID selection change
    $("#have-national-id-selection").on("change", handleNationalIdSelection);
    // Event listener for phone number selection change
    $("#have-phone-no-selection").on("change", handlePhoneNumberSelection);

    $("#access-to-machinery-selection").on("change", function() {
        toggleField("access-to-machinery-selection", "machinery-field", "machinery-types-select")
    });

    $("#access-to-finance-selection").on("change", function() {
        toggleField("access-to-finance-selection", "finance-field", "finance-selection")
    });

    // Trigger the change event on page load to handle the initial state
    $("#have-national-id-selection").trigger("change");
    $("#have-phone-no-selection").trigger("change");
    $("#access-to-machinery-selection").trigger("change");
    $("#access-to-finance-selection").trigger("change");


//     // Validation for vid and email

//     const uidInput = document.getElementById("uid_input");
//     const uidError = document.getElementById("uid_error");
//     const form = document.getElementById("updategroupForm");
//     const emailInput = document.getElementById("email");
//     const emailError = document.createElement("div");
//     emailError.classList.add("invalid-feedback");
//     emailInput.parentNode.appendChild(emailError);

//     uidInput.addEventListener("input", function () {
//         console.log("hey hey")
//         if (uidInput.value.length !== 12 && uidInput.value.length !== 0) {
//             uidInput.classList.add("uid_error");
//             uidError.style.display = "block";
//         } else {
//             uidInput.classList.remove("is-invalid");
//             uidError.style.display = "none";
//         }
//     });
    function isValidEmail(email) {
        // Basic email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

//     emailInput.addEventListener("input", function () {
//         if (emailInput.value.length !== 0) {
//             if (!isValidEmail(emailInput.value)) {
//                 emailInput.classList.add("is-invalid");
//                 emailError.style.display = "block";
//             } else {
//                 emailInput.classList.remove("is-invalid");
//                 emailError.style.display = "none";
//             }
//         } else {
//             emailInput.classList.remove("is-invalid");
//             emailError.style.display = "none";
//         }
//     });

    window.customvalidateForm = function (isCreateForm) {
        console.log("Here");
        this.validateForm(isCreateForm);
        // if (uidInput.value.length !== 12 && uidInput.value.length !== 0) {
        //     event.preventDefault(); // Prevent form submission if validation fails
        //     uidInput.classList.add("is-invalid");
        //     uidError.style.display = "block";
        //     const collapseElement = uidInput.closest(".collapse");
        //     if (collapseElement) {
        //         const accordionButton = document.querySelector(`[data-bs-target="#${collapseElement.id}"]`);
        //         if (accordionButton) {
        //             accordionButton.click();
        //         }
        //     }
        // } else if (!isValidEmail(emailInput.value) && emailInput.value.length !== 0) {
        //     emailInput.classList.add("is-invalid");
        //     emailError.style.display = "block";
        //     const collapseElement = emailInput.closest(".collapse");
        //     if (collapseElement) {
        //         const accordionButton = document.querySelector(`[data-bs-target="#${collapseElement.id}"]`);
        //         if (accordionButton) {
        //             accordionButton.click();
        //         }
        //     }
        // } else {
        //     uidInput.classList.remove("is-invalid");
        //     uidError.style.display = "none";
        //     emailInput.classList.remove("is-invalid");
        //     emailError.style.display = "none";
        //     this.validateForm(isCreateForm);
        // }
    };
});


function showSection(sectionId, element) {
    document.querySelectorAll(".section-container").forEach((section) => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
    document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
        link.classList.remove("active");
    });
    if (element) {
        element.classList.add("active");
    }
}

function showNextSection(nextSectionId, currentSectionId) {
    // val = validateSection(currentSectionId);
    console.log("this next")
    val = true

    if (val) {
        var activeLink = document.querySelector(".sidebar .nav-link.active");
        console.log(activeLink);
        var nextLink = activeLink.parentElement.nextElementSibling.querySelector(".nav-link");
        if (nextLink) {
            nextLink.classList.remove("disabled");
            showSection(nextSectionId, nextLink);
        }
    }
}

function showNextModal(nextSectionId, currentSectionId) {
    // val = validateSection(currentSectionId);
    console.log("this Modal")
    val = true

    if (val) {
        var activeLink = document.querySelector(".sidebar .nav-link.active");
        console.log(activeLink);
        var nextLink = activeLink.parentElement.nextElementSibling.querySelector(".nav-link");
        if (nextLink) {
            nextLink.classList.remove("disabled");
            showSection(nextSectionId, nextLink);
        }
    }
}
function toggleFieldBasedOnRadio(inputName, fieldIdToToggle, toggleValue = "Yes") {
    const radios = document.querySelectorAll(`input[name="${inputName}"]`);
    let shouldShowField = false;

    radios.forEach(radio => {
        if (radio.checked && radio.dataset.text === toggleValue) {
            shouldShowField = true;
        }
    });

    const fieldToToggle = document.getElementById(fieldIdToToggle);
    fieldToToggle.style.display = shouldShowField ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    // Initial check on page load
    toggleFieldBasedOnRadio('is_member_of_primary_coop', 'primary-coop-field');
    toggleFieldBasedOnRadio('is_member_of_coop_union', 'coop-union-field');
    toggleFieldBasedOnRadio('in_farmer_cluster', 'primary-commodity-field');
    toggleFieldBasedOnRadio('in_farmer_cluster', 'role-in-cluster-field');

    // Attach event listeners to the radio buttons
    const primaryCoopRadios = document.querySelectorAll('input[name="is_member_of_primary_coop"]');
    primaryCoopRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            toggleFieldBasedOnRadio('is_member_of_primary_coop', 'primary-coop-field');
        });
    });

    const coopUnionRadios = document.querySelectorAll('input[name="is_member_of_coop_union"]');
    coopUnionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            toggleFieldBasedOnRadio('is_member_of_coop_union', 'coop-union-field');
        });
    });

    const isMemberRadios = document.querySelectorAll('input[name="in_farmer_cluster"]');
    isMemberRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            toggleFieldBasedOnRadio('in_farmer_cluster', 'primary-commodity-field');
            toggleFieldBasedOnRadio('in_farmer_cluster', 'role-in-cluster-field');
        });
    });

});