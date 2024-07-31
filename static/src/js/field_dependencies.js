$(document).ready(function () {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    // Set the value of the date input
    document.getElementById("date_consent").value = formattedDate;

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
            input.value = "";
        }
    }
    // If condition match hide section
    function selectChangeHideSection(selectElementId, fieldId, otherText = "no income", inputId) {
        const selectElement = document.getElementById(selectElementId);
        const field = document.getElementById(fieldId);
        const input = document.getElementById(inputId);
        const selectedOptionText = selectElement.options[selectElement.selectedIndex].text
            .trim()
            .toLowerCase();

        if (selectedOptionText === otherText.toLowerCase()) {
            field.style.display = "none";
            input.removeAttribute("required");
        } else {
            field.style.display = "block";
            input.setAttribute("required", "required");
        }
    }
    // If condition match hide section
    function selectChangeShowSection(
        selectElementId,
        fieldId,
        otherText = "other",
        fieldId1,
        otherText1 = "no"
    ) {
        const selectElement = document.getElementById(selectElementId);
        const fieldSelectId = document.getElementById(fieldId);
        const selectotherText = document.getElementById(otherText);
        const field1 = document.getElementById(fieldId1);
        var selectedOptionText = "";
        var selectedotherText = "";
        if (selectElement !== null) {
            selectedOptionText = selectElement.options[selectElement.selectedIndex].text.trim().toLowerCase();
        }

        if (selectotherText !== null) {
            selectedotherText = selectotherText.options[fieldSelectId.selectedIndex].text
                .trim()
                .toLowerCase();
        }
        if (selectedOptionText !== otherText1.toLowerCase() && selectedotherText !== otherText) {
            field1.style.display = "none";
        } else if (selectedOptionText == otherText1.toLowerCase()) {
            field1.style.display = "none";
        } else {
            field1.style.display = "block";
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
            input.value = "";
        }
    }

    // Function to handle changes in a group of checkboxes
    function handleCheckboxChange(checkboxClass, fieldId, inputId, otherText = "other") {
        const checkboxes = document.querySelectorAll(checkboxClass);
        const field = document.getElementById(fieldId);
        const input = document.getElementById(inputId);
        let isChecked = false;

        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const label = checkbox.closest("label").textContent.trim().toLowerCase();
                if (label === otherText.toLowerCase()) {
                    isChecked = true;
                }
            }
        });

        if (isChecked) {
            field.style.display = "block";
            input.setAttribute("required", "required");
        } else {
            field.style.display = "none";
            input.removeAttribute("required");
            input.value = "";
        }
    }

    // Function to update options for a select element based on an AJAX response
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
                if (
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
                } else if (selectElement.selectedIndex == 0 && selectedName != "Select") {
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

    function showElementBasedOnRadioSelection(
        url,
        data,
        field1,
        input,
        field2,
        no_field = "",
        no_input = ""
    ) {
        $.ajax({
            url: url,
            method: "POST",
            dataType: "json",
            data: data,
            success: function (options) {
                options.forEach((option) => {
                    const selectedOptionText = option.name;
                    const fieldElement1 = document.getElementById(field1);
                    const inputElement = document.getElementById(input);
                    const fieldElement2 = document.getElementById(field2);
                    if (selectedOptionText === "Yes") {
                        if (no_field != "") {
                            const nofieldElement2 = document.getElementById(no_field);
                            nofieldElement2.style.display = "none";
                            if (no_input != "") {
                                const noinput_element = document.getElementById(no_input);
                                noinput_element.removeAttribute("required", "required");
                                noinput_element.value = "";
                            }
                        }
                        fieldElement1.style.display = "block";
                        inputElement.setAttribute("required", "required");
                    } else {
                        fieldElement1.style.display = "none";
                        fieldElement2.style.display = "none";
                        inputElement.removeAttribute("required");
                        inputElement.value = "";

                        if (field1 == "specific_additional_support-field") {
                            var checkboxes = document.querySelectorAll(".specific_support_options-checkbox");
                            checkboxes.forEach(function (checkbox) {
                                if (checkbox.type === "checkbox") {
                                    checkbox.checked = false;
                                }
                            });
                        }

                        if (no_field != "") {
                            const nofieldElement2 = document.getElementById(no_field);
                            nofieldElement2.style.display = "block";
                            if (no_input != "") {
                                const noinput_element = document.getElementById(no_input);
                                noinput_element.setAttribute("required", "required");
                            }
                        }
                    }
                });
            },
            error: function (error) {
                console.error("Error fetching options:", error);
            },
        });
    }

    document.querySelectorAll(".are-you-disabled-select").forEach((radioButton) => {
        radioButton.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            showElementBasedOnRadioSelection(
                "/get_selection_name",
                {selectedValue: selectedValue},
                "other-disability-field",
                "disability-selection",
                "specify-disability-field"
            );
            const field = document.getElementById("other-disability-field");
            const input = document.getElementById("other_disability");
            if (field.style.display == "none") {
                input.value = "";
            }
        });
    });

    document.querySelectorAll(".consent-selection").forEach((radioButton) => {
        radioButton.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            const firstElement = document.getElementById("application_form");
            if (selectedValue && firstElement.style.display === "none") {
                firstElement.style.display = "block";
            } else {
                firstElement.style.display = "none";
            }
        });
    });
    document.querySelectorAll(".consent-selection").forEach((radioButton) => {
        if (radioButton.checked) {
            radioButton.dispatchEvent(new Event("change"));
        }
    });

    document.querySelectorAll(".have-id-select").forEach((radioButton) => {
        radioButton.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            showElementBasedOnRadioSelection(
                "/get_selection_name",
                {selectedValue: selectedValue},
                "uid-div",
                "uid_input",
                "rid-div",
                "rid-div",
                "rid_input"
            );
        });
    });
    document.querySelectorAll(".received_any_assistance").forEach((radioButton) => {
        radioButton.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            showElementBasedOnRadioSelection(
                "/get_selection_name",
                {selectedValue: selectedValue},
                "select-received_any_assistance-field",
                "inistitutes-selection",
                "specify_inistitutes-field"
            );
            document.getElementById("inistitutes-selection").dispatchEvent(new Event("change"));
        });
    });
    document.querySelectorAll(".received_any_assistance").forEach((radioButton) => {
        if (radioButton.checked) {
            radioButton.dispatchEvent(new Event("change"));
        }
        $("#inistitutes-selection").trigger("change");
    });
    document.querySelectorAll(".received_any_assistance-current").forEach((radioButton) => {
        radioButton.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            showElementBasedOnRadioSelection(
                "/get_selection_name",
                {selectedValue: selectedValue},
                "select-received_any_assistance-field-current",
                "inistitutes-selection-current",
                "specify_inistitutes-field-current"
            );
            document.getElementById("inistitutes-selection-current").dispatchEvent(new Event("change"));
        });
    });
    document.querySelectorAll(".received_any_assistance-current").forEach((radioButton) => {
        if (radioButton.checked) {
            radioButton.dispatchEvent(new Event("change"));
        }
    });
    document.querySelectorAll(".additional_support-select").forEach((radioButton) => {
        radioButton.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            showElementBasedOnRadioSelection(
                "/get_selection_name",
                {selectedValue: selectedValue},
                "specific_additional_support-field",
                "specific_additional_support-checkbox",
                "other_additional_support-field"
            );

            document
                .getElementById("specific_additional_support-checkbox")
                .dispatchEvent(new Event("change"));
        });
    });
    document.querySelectorAll(".additional_support-select").forEach((radioButton) => {
        if (radioButton.checked) {
            radioButton.dispatchEvent(new Event("change"));
        }
    });
    document.querySelectorAll(".have-id-select").forEach((radioButton) => {
        if (radioButton.checked) {
            radioButton.dispatchEvent(new Event("change"));
        }
    });

    // Event listener for national ID selection change
    //    $("#have-national-id-selection").on("change", handleNationalIdSelection);

    $("#current_region_selection").on("change", function () {
        const selectedOptionText = $(this).find(":selected").text().trim();
        const label_current_zone = $("#label-current-zone");

        if (selectedOptionText === "Addis Ababa") {
            label_current_zone.text("Sub city");
        } else {
            label_current_zone.text("Zone");
        }
    });

    $("#region_selection").on("change", function () {
        const selectedOptionText = $(this).find(":selected").text().trim();
        const label_current_zone = $("#label-birth-zone");
        if (selectedOptionText === "Addis Ababa") {
            label_current_zone.text("Sub city");
        } else {
            label_current_zone.text("Zone");
        }
    });

    $("#region_selection").on("change", function (event) {
        const regionId = this.value;
        var ev = event.originalEvent;
        updateOptions("/update_zone_options", {region_id: regionId}, "zon_selection", "Select", ev, "region");
        updateOptions("/update_woreda_options", {zone_id: 0}, "woreda_selection", "Select", ev, "region");
    });

    $("#zon_selection").on("change", function (event) {
        const zoneId = this.value;

        var ev = event.originalEvent;
        updateOptions("/update_woreda_options", {zone_id: zoneId}, "woreda_selection", "Select", ev);
    });

    $("#current_region_selection").on("change", function (event) {
        const regionId = this.value;
        var ev = event.originalEvent;
        updateOptions(
            "/update_zone_options",
            {region_id: regionId, check_permission: true},
            "current_zon_selection",
            "Select",
            ev,
            "current_region"
        );
        updateOptions(
            "/update_woreda_options",
            {zone_id: 0, check_permission: true},
            "current_woreda_selection",
            "Select",
            ev,
            "current_region"
        );
        updateOptions(
            "/update_hotspot_options",
            {woreda_id: 0, check_permission: true},
            "hot_spot",
            "Select",
            ev,
            "current_region"
        );
    });

    $("#current_zon_selection").on("change", function (event) {
        const zoneId = this.value;

        var ev = event.originalEvent;
        updateOptions(
            "/update_woreda_options",
            {zone_id: zoneId, check_permission: true},
            "current_woreda_selection",
            "Select",
            ev
        );
        updateOptions(
            "/update_hotspot_options",
            {woreda_id: 0, check_permission: true},
            "hot_spot",
            "Select",
            ev,
            "current_region"
        );
    });

    $("#current_woreda_selection").on("change", function (event) {
        const woreda_id = this.value;

        var ev = event.originalEvent;
        updateOptions(
            "/update_hotspot_options",
            {woreda_id: woreda_id, check_permission: true},
            "hot_spot",
            "Select",
            ev
        );
    });

    $("#religion-select").on("change", function () {
        handleSelectChange("religion-select", "other-religion-field", "other_religion");
    });

    $("#marital_status-select").on("change", function () {
        handleSelectChange("marital_status-select", "other-marital-status-field", "other_marital_status");
    });

    $("#education-select").on("change", function () {
        handleSelectChange("education-select", "other-education-field", "other_education");
    });

    $("#mother-tongue-select").on("change", function () {
        handleSelectChange("mother-tongue-select", "other-language-field", "other_language");
    });

    $("#sleep_at_night-select").on("change", function () {
        handleSelectChange("sleep_at_night-select", "specify-sleep-field", "other_spend_night");
    });

    $(".homeless_reason-checkbox").on("change", function () {
        handleCheckboxChange(".homeless_reason-checkbox", "other_homeless-field", "other_homeless_reason");
    });

    $(".challenges_on_street-checkbox").on("change", function () {
        handleCheckboxChange(
            ".challenges_on_street-checkbox",
            "specify-challenge-field",
            "specify-challenge"
        );
    });

    $("#inistitutes-selection").on("change", function () {
        const field = document.getElementById("specify_inistitutes-field");
        const input = document.getElementById("specify_inistitutes");
        const selectElement = document.getElementById("inistitutes-selection");
        const selectedOptionStrings = Array.from(selectElement.selectedOptions).map((option) =>
            option.textContent.trim()
        );
        if (selectedOptionStrings.includes("Other") || selectedOptionStrings.includes("Other")) {
            field.style.display = "block";
            input.setAttribute("required", "required");
        } else {
            field.style.display = "none";
            input.value = "";
            input.removeAttribute("required");
        }
    });

    $("#inistitutes-selection-current").on("change", function () {
        const field = document.getElementById("specify_inistitutes-field-current");
        const input = document.getElementById("specify_inistitutes-current");
        const selectElement = document.getElementById("inistitutes-selection-current");
        const selectedOptionStrings = Array.from(selectElement.selectedOptions).map((option) =>
            option.textContent.trim()
        );
        if (selectedOptionStrings.includes("Other") || selectedOptionStrings.includes("Other")) {
            field.style.display = "block";
            input.setAttribute("required", "required");
        } else {
            field.style.display = "none";
            input.value = "";
            input.removeAttribute("required");
        }
    });

    $("#are-you-disabled-select").on("change", function () {
        toggleField("are-you-disabled-select", "other-disability-field", "other_disability");
    });

    $("#disability-selection").on("change", function () {
        handleSelectChange("disability-selection", "specify-disability-field", "other_disability");
    });

    $("#source_income-selection").on("change", function () {
        selectChangeHideSection("source_income-selection", "pre-earn-per-field", "no income", "earn_per");
        selectChangeHideSection("source_income-selection", "pre-earn-amount-field", "no income", "amount");

        handleSelectChange("source_income-selection", "other-source-income-field", "other_source_income");
    });

    $("#source_income-selection-current").on("change", function () {
        selectChangeHideSection(
            "source_income-selection-current",
            "earn-per-field",
            "no income",
            "current_earn_per"
        );
        selectChangeHideSection(
            "source_income-selection-current",
            "earn-amount-field",
            "no income",
            "current_amount"
        );
        handleSelectChange(
            "source_income-selection-current",
            "other-source-income-field-current",
            "other_source_income-current"
        );
    });

    $(".specific_support_options-checkbox").on("change", function () {
        handleCheckboxChange(
            ".specific_support_options-checkbox",
            "other_additional_support-field",
            "other_additional_support"
        );
    });

    $("#lang").on("change", function () {
        const field = document.getElementById("other-lang-field");
        const input = document.getElementById("other_lang");
        const selectedValues = Array.from(document.getElementById("lang").selectedOptions).map(
            (option) => option.value
        );
        if (selectedValues.includes("16")) {
            field.style.display = "block";
            input.setAttribute("required", "required");
        } else {
            field.style.display = "none";
            input.removeAttribute("required");
            input.value = "";
        }
    });
    $(".js-tags").select2({
        placeholder: "Select tags",
        allowClear: true,
        width: "resolve",
    });

    // Trigger the change event on page load to handle the initial state
    $("#current_region_selection").trigger("change");
    $("#region_selection").trigger("change");
    $("#current_woreda_selection").trigger("change");
    $(".received_any_assistance-current").trigger("change");
    $("#have-national-id-selection").trigger("change");
    $("#religion-select").trigger("change");
    $("#marital_status-select").trigger("change");
    $("#marital_status-select").trigger("change");
    $("#education-select").trigger("change");
    $("#mother-tongue-select").trigger("change");
    $("#sleep_at_night-select").trigger("change");
    $("#sleep_at_night-select").trigger("change");
    $(".homeless_reason-checkbox").trigger("change");
    $(".challenges_on_street-checkbox").trigger("change");
    $(".received_any_assistance").trigger("change");
    $("#inistitutes-selection").trigger("change");
    $("#inistitutes-selection-current").trigger("change");
    $("#disability-selection").trigger("change");
    $(".additional_support-select").trigger("change");
    $(".specific_support_options-checkbox").trigger("change");
    $("#source_income-selection-current").trigger("change");
    $("#source_income-selection").trigger("change");
    $("#lang").trigger("change");
    $(".have-id-select").trigger("change");
    // Validation for vid and email

    const uidInput = document.getElementById("uid_input");
    const lang = document.getElementById("lang");
    const lang_error = document.getElementById("lang_error");
    const uidError = document.getElementById("uid_error");
    const form = document.getElementById("updategroupForm");
    const emailInput = document.getElementById("email");
    const emailError = document.createElement("div");
    emailError.classList.add("invalid-feedback");
    emailInput.parentNode.appendChild(emailError);
    const checkboxes = document.querySelectorAll(".homeless_reason-checkbox");
    const homeless_reason = document.getElementById("homeless_reason");

    uidInput.addEventListener("input", function () {
        if (uidInput.value.length !== 12 && uidInput.value.length !== 0) {
            uidInput.classList.add("is-invalid");
            uidError.style.display = "block";
        } else {
            uidInput.classList.remove("is-invalid");
            uidError.style.display = "none";
        }
    });
    function isValidEmail(email) {
        // Basic email regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    emailInput.addEventListener("input", function () {
        if (emailInput.value.length !== 0) {
            if (!isValidEmail(emailInput.value)) {
                emailInput.classList.add("is-invalid");
                emailError.style.display = "block";
            } else {
                emailInput.classList.remove("is-invalid");
                emailError.style.display = "none";
            }
        } else {
            emailInput.classList.remove("is-invalid");
            emailError.style.display = "none";
        }
    });

    function isConsentChecked(consentName) {
        var checkboxes = document.querySelectorAll(`input[name="${consentName}"]:checked`);
        return checkboxes.length > 0;
    }

    function expandConsentSectionIfUnchecked(sectionId) {
        var consentSection = document.getElementById(sectionId);
        consentSection.classList.add("show");
    }
    function collapseConsentSectionIfUnchecked(sectionId) {
        var consentSection = document.getElementById(sectionId);
        consentSection.classList.add("hide");
    }

    window.customvalidateForm = function (isCreateForm) {

    console.log("in  field dependency")
        var isValid = true;
        var pre_name = " ";
        var field_check = true;
        var radio_field_check = false;
        var all_valid_checkbox = false;
        var requiredFields_checkbox = document.querySelectorAll('input[type="checkbox"][required]');
        requiredFields_checkbox.forEach(function (field) {
            const selected_homeless_reason = Array.from(field).filter((checkbox) => checkbox.checked);
            if (!field.checked && !isConsentChecked("consent")) {
                expandConsentSectionIfUnchecked("application_consent_section");
            }
            if (field.checked && isConsentChecked("consent")) {
                collapseConsentSectionIfUnchecked("application_consent_section");
            }
            if (!field.checked && !isConsentChecked("enumerator_consent")) {
                expandConsentSectionIfUnchecked("consent_section");
            }
            if (field.checked && isConsentChecked("enumerator_consent")) {
                collapseConsentSectionIfUnchecked("consent_section");
            }

            if (pre_name === " ") {
                pre_name = field.name;
                field_check = false;
                all_valid_checkbox = true;
            }
            if (pre_name !== field.name) {
                if (field_check && all_valid_checkbox) {
                    all_valid_checkbox = true;
                } else {
                    all_valid_checkbox = false;
                }
                field_check = false;
                pre_name = field.name;
            }
            if (!field_check && !field.checked) {
                var checkboxContainer = field.closest(".row");
                checkboxContainer.classList.add("is-invalid-multiple");
                const collapseElement = uidInput.closest(".collapse");
                if (collapseElement) {
                    const accordionButton = document.querySelector(
                        `[data-bs-target="#${collapseElement.id}"]`
                    );
                    if (accordionButton) {
                        accordionButton.click();
                    }
                }
            } else {
                var checkboxContainer = field.closest(".row");
                checkboxContainer.classList.remove("is-invalid-multiple");
                field_check = true;
            }
        });
        if (!all_valid_checkbox) {
            isValid = false;
        }
        var requiredFields_radio = document.querySelectorAll(".form-radio-group [required]");
        var pre_name_radio = " ";
        var field_check_radio = false;
        var all_valid = false;
        requiredFields_radio.forEach(function (field) {
            var check = false;
            if (pre_name_radio === " ") {
                pre_name_radio = field.name;
                field_check_radio = false;
                all_valid = true;
            }
            if (pre_name_radio !== field.name) {
                if (field_check_radio && all_valid) {
                    all_valid = true;
                } else {
                    all_valid = false;
                }
                field_check_radio = false;
                pre_name_radio = field.name;
            }
            if (field.checked) {
                field_check_radio = true;
                check = true;
            }
            if (!check && !field_check_radio) {
                const collapseElement = field.closest(".collapse");
                if (collapseElement) {
                    const accordionButton = document.querySelector(
                        `[data-bs-target="#${collapseElement.id}"]`
                    );
                    if (accordionButton) {
                        accordionButton.click();
                    }
                }
                var checkboxContainer = field.closest(".form-radio-group");
                checkboxContainer.classList.add("is-invalid-multiple");
                radio_field_check = false;
            } else {
                var checkboxContainer = field.closest(".form-radio-group");
                checkboxContainer.classList.remove("is-invalid-multiple");
                radio_field_check = true;
            }
        });
        if (!all_valid) {
            isValid = false;
        }
        var requiredFields = document.querySelectorAll(".s_website_form_field [required]");
        requiredFields.forEach(function (field) {
            var existingErrorMessage = field.parentNode.querySelector(".error-message");
            if (!field.value.trim()) {
                var errorMessage = document.createElement("span");
                errorMessage.className = "error-message";
                errorMessage.textContent = "This field is required";
                errorMessage.style.color = "red";

                if (existingErrorMessage) {
                    field.parentNode.replaceChild(errorMessage, existingErrorMessage);
                } else {
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                }

                field.style.border = "1px solid red";
                isValid = false;
                const collapseElement = field.closest(".collapse");
                if (collapseElement) {
                    const accordionButton = document.querySelector(
                        `[data-bs-target="#${collapseElement.id}"]`
                    );
                    if (accordionButton) {
                        accordionButton.click();
                    }
                }
            } else {
                if (existingErrorMessage) {
                    existingErrorMessage.parentNode.removeChild(existingErrorMessage);
                }
                field.style.border = "";
            }
        });
        var requiredSelectMultiple = document.querySelectorAll("select.js-tags[multiple][required]");
        requiredSelectMultiple.forEach(function (field) {
            if (field.value.length === 0) {
                var MultiContainer = field.closest(".col");
                MultiContainer.classList.add("is-invalid-multiple");
                isValid = false;
                const collapseElement = emailInput.closest(".collapse");
                if (collapseElement) {
                    const accordionButton = document.querySelector(
                        `[data-bs-target="#${collapseElement.id}"]`
                    );
                    if (accordionButton) {
                        accordionButton.click();
                    }
                }
            } else {
                var MultiContainer = field.closest(".col");
                MultiContainer.classList.remove("is-invalid-multiple");
            }
        });
        if (uidInput.value.length !== 12 && uidInput.value.length !== 0) {
            event.preventDefault(); // Prevent form submission if validation fails
            uidInput.classList.add("is-invalid");
            uidError.style.display = "block";
            const collapseElement = uidInput.closest(".collapse");
            if (collapseElement) {
                const accordionButton = document.querySelector(`[data-bs-target="#${collapseElement.id}"]`);
                if (accordionButton) {
                    accordionButton.click();
                }
            }
        } else if (!isValidEmail(emailInput.value) && emailInput.value.length !== 0) {
            emailInput.classList.add("is-invalid");
            emailError.style.display = "block";
            const collapseElement = emailInput.closest(".collapse");
            if (collapseElement) {
                const accordionButton = document.querySelector(`[data-bs-target="#${collapseElement.id}"]`);
                if (accordionButton) {
                    accordionButton.click();
                }
            }
        } else {
            uidInput.classList.remove("is-invalid");
            uidError.style.display = "none";
            emailInput.classList.remove("is-invalid");
            emailError.style.display = "none";
            if (isValid) {
                this.validateForm(isCreateForm);
            }
        }
    };
});
