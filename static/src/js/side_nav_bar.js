
    function wrapInitialCard() {
        const initiallyDisplayed = document.getElementById('initiallyDisplayed');
        const accordionContainer = document.getElementById('accordionContainer');

        if (initiallyDisplayed) {
            // Create the first accordion with the initially displayed card
            accordionContainer.innerHTML += `
                <div class="card">
                    <div class="card-header" id="heading${farmerCount}">
                        <h2 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${farmerCount}" aria-expanded="true" aria-controls="collapse${farmerCount}">
                                Farmer ${farmerCount}
                            </button>
                        </h2>
                    </div>
                    <div id="collapse${farmerCount}" class="collapse show" aria-labelledby="heading${farmerCount}" data-parent="#accordionContainer">
                        <div class="card-body">
                            ${initiallyDisplayed.outerHTML}
                        </div>
                    </div>
                </div>
            `;

            // Remove the initially displayed card
            initiallyDisplayed.remove();

            // Increment farmer count for the next click
            farmerCount++;
        }

        // Create a new empty accordion for the next farmer
        accordionContainer.innerHTML += `
            <div class="card">
                <div class="card-header" id="heading${farmerCount}">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${farmerCount}" aria-expanded="false" aria-controls="collapse${farmerCount}">
                            Farmer ${farmerCount}
                        </button>
                    </h2>
                </div>
                <div id="collapse${farmerCount}" class="collapse" aria-labelledby="heading${farmerCount}" data-parent="#accordionContainer">
                    <div class="card-body">
                        ${initiallyDisplayed.outerHTML}
                    </div>
                </div>
            </div>
        `;

        // Increment farmer count for the next click
        farmerCount++;

        // Reset the radio buttons after wrapping inside accordion
        document.getElementById('consentYes').checked = false;
    }

    // Collapse other accordions when one is expanded and hide/show header
    $('#accordionContainer').on('show.bs.collapse', function (event) {
        $('#accordionContainer .collapse').collapse('hide');
        $(event.target).prev('.card-header').addClass('hidden-header');
    }).on('hide.bs.collapse', function (event) {
        $(event.target).prev('.card-header').removeClass('hidden-header');
    });

    function addCropSection() {
    const container = document.getElementById('crop-sections-container');
    const newSection = document.createElement('div');
    newSection.className = 'section';

    // Fetching data from the controller
    fetch('/serviceprovider/individual/registrar/create/')
       // Adjust the URL to match your Odoo controller route
        .then(response => response.text())  // Using .text() to debug the raw response
        .then(responseText => {
            console.log("response", responseText)

            try {
                const data = JSON.parse(responseText);
                const { commodities, crop_illness_type } = data;

                newSection.innerHTML = `
                    <div class="row">
                        <div class="col-lg-4 left-margin-input">
                            <div class="s_website_form_field">
                                <label class="s_website_form_label">
                                    <span class="s_website_form_label_content">
                                        What Commodities do you produce</span>
                                    <span class="s_website_form_mark"> *</span>
                                </label>
                                <div class="row">
                                    <div class="col">
                                        <select class="form-select" name="commodities" required="required">
                                            <option value=" ">Select</option>
                                            ${commodities.map(option => `<option value="${option.id}">${option.name}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 left-margin-input">
                            <div class="s_website_form_field">
                                <label class="s_website_form_label">
                                    <span class="s_website_form_label_content">
                                        Disease Related Issue with crop</span>
                                    <span class="s_website_form_mark"> *</span>
                                </label>
                                <div class="row">
                                    <div class="col">
                                        <select class="form-select" name="crop_illness_type" required="required">
                                            <option value=" ">Select</option>
                                            ${crop_illness_type.map(option => `<option value="${option.id}">${option.name}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 left-margin-input">
                            <div class="s_website_form_field">
                                <label class="s_website_form_label">
                                    <span class="s_website_form_label_content">
                                        What are the common types of disease</span>
                                    <span class="s_website_form_mark"> *</span>
                                </label>
                                <div class="row">
                                    <div class="col">
                                        <select class="form-select" name="crop_illness_type" required="required">
                                            <option value=" ">Select</option>
                                            ${crop_illness_type.map(option => `<option value="${option.id}">${option.name}</option>`).join('')}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-2 left-margin-input">
                            <svg class="delete-icon" onclick="deleteCropSection(this)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 6H5H21" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M10 11V17" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14 11V17" stroke="#dc3545" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>`;

                container.appendChild(newSection);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                console.error('Response text:', responseText);
            }
        })
        .catch(error => console.error('Error fetching crop data:', error));
}


    function deleteCropSection(icon) {
        const section = icon.closest('.section');
        section.remove();
    }


 let farmerCount = 1; // Starting from 1 since initially displayed card is considered Farmer 01

function showSection(sectionId, event) {
        const activeAccordion = event.target.closest('.rounded-card');
        // Hide all sections within the active accordion
        activeAccordion.querySelectorAll('.content > div').forEach(function(section) {
            section.style.display = 'none';
        });
        // Remove active class from all nav links within the active accordion
        activeAccordion.querySelectorAll('.sidebar .nav-link').forEach(function(navLink) {
            navLink.classList.remove('active');
        });
        // Show the selected section within the active accordion
        activeAccordion.querySelector(`#${sectionId}`).style.display = 'block';
        // Add active class to the clicked nav link within the active accordion
        event.target.classList.add('active');
    }

function addFarmer() {
    const initialFarmer = document.getElementById('initial-farmer');
    const accordion = document.getElementById('accordionExample');

    if (farmerCount === 1) {
        // Move the initial rounded-card into the first accordion item
        const firstAccordionItem = `
            <div class="card">
                <div class="card-header" id="headingFarmer01">
                    <div class="farmer-card" data-toggle="collapse" data-target="#collapseFarmer01" aria-expanded="true" aria-controls="collapseFarmer01">
                        <div class="farmer-card-bg"></div>
                        <div class="farmer-card-topbar"></div>
                        <div class="farmer-label">Farmer 01</div>
                        <div class="farmer-name">Ahmed Kassa</div>
                        <div class="uid">UID : 0045AHK576</div>
                    </div>
                </div>
                <div id="collapseFarmer01" class="collapse show" aria-labelledby="headingFarmer01" data-parent="#accordionExample">
                    <div class="card-body">
                    </div>
                </div>
            </div>
        `;
        accordion.insertAdjacentHTML('beforeend', firstAccordionItem);
        document.querySelector('#collapseFarmer01 .card-body').appendChild(initialFarmer);
    }

    farmerCount++;
    const farmerId = 'farmer' + farmerCount;
    const farmerTitle = 'Farmer ' + (farmerCount < 10 ? '0' + farmerCount : farmerCount);
    const newAccordionItem = `
        <div class="card">
            <div class="card-header" id="heading${farmerId}">
                <div class="farmer-card" data-toggle="collapse" data-target="#collapse${farmerId}" aria-expanded="false" aria-controls="collapse${farmerId}">
                    <div class="farmer-card-bg"></div>
                    <div class="farmer-card-topbar"></div>
                    <div class="farmer-label">${farmerTitle}</div>
                    <div class="farmer-name">Farmer Name</div>
                    <div class="uid">UID : XXXXXXX</div>
                </div>
            </div>
            <div id="collapse${farmerId}" class="collapse" aria-labelledby="heading${farmerId}" data-parent="#accordionExample">
                <div class="card-body">
                    <div class="rounded-card" id="rounded-card-${farmerCount}">
                           <!-- New farmer card content goes here -->
                        ${initialFarmer.outerHTML}
                    </div>
                </div>
            </div>
        </div>
    `;
    accordion.insertAdjacentHTML('beforeend', newAccordionItem);

    // Clone the initial farmer card content and append to the new accordion item
    const newFarmerCard = document.querySelector(`#rounded-card-${farmerCount} #initial-farmer`);
    newFarmerCard.id = `farmer-card-${farmerCount}`;
    const newInputs = newFarmerCard.querySelectorAll('input, textarea, select');
    newInputs.forEach(input => {
        const oldId = input.id;
        input.id = `${oldId}-${farmerCount}`;
        input.name = `${input.name}-${farmerCount}`;
    });

    // Add event listeners to toggle header visibility
    $(`#collapse${farmerId}`).on('show.bs.collapse', function () {
        $(this).prev().hide();
    }).on('hide.bs.collapse', function () {
        $(this).prev().show();
    });
}

// Add event listeners to toggle header visibility for the first item
$('#collapseFarmer01').on('show.bs.collapse', function () {
    $(this).prev().hide();
}).on('hide.bs.collapse', function () {
    $(this).prev().show();
});
