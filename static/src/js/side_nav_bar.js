 function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content > div').forEach(function(section) {
            section.style.display = 'none';
        });
        // Remove active class from all nav links
        document.querySelectorAll('.sidebar .nav-link').forEach(function(navLink) {
            navLink.classList.remove('active');
        });
        // Show the selected section
        document.getElementById(sectionId).style.display = 'block';
        // Add active class to the clicked nav link
        event.target.classList.add('active');
    }


function addSection() {
    const container = document.getElementById('sections-container');
    const newSection = document.createElement('div');
    newSection.className = 'section';

    newSection.innerHTML = `
                <div class="row">
                    <div class="col-lg-4">
                        <label for="given-name">Given Name:</label>
                        <input type="text" name="given-name" placeholder="Enter given name" required="True"/>
                    </div>
                    <div class="col-lg-4">
                        <label for="father-name">Father's Name:</label>
                        <input type="text" name="father-name" placeholder="Enter father's name" required="True"/>
                    </div>
                    <div class="col-lg-4">
                        <label for="grandfather-name">Grandfather's Name:</label>
                        <input type="text" name="grandfather-name" placeholder="Enter grandfather's name" required="True"/>
                    </div>
                   <div>
                        <i class="fas fa-trash delete-icon" onclick="deleteSection(this)"></i>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4">
                        <label for="dob">Date of Birth:</label>
                        <input type="date" name="dob" required="True"/>
                    </div>
                    <div class="col-lg-4">
                        <label for="gender">Gender:</label>
                        <select name="gender" required="True">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
    `;

    container.appendChild(newSection);
}

function deleteSection(icon) {
    const section = icon.closest('.section');
    section.remove();
}
  let farmerCount = 0;
    let mainAccordionVisible = false;

    function showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content > div').forEach(function(section) {
            section.style.display = 'none';
        });
        // Remove active class from all nav links
        document.querySelectorAll('.sidebar .nav-link').forEach(function(navLink) {
            navLink.classList.remove('active');
        });
        // Show the selected section
        document.getElementById(sectionId).style.display = 'block';
        // Add active class to the clicked nav link
        event.target.classList.add('active');
    }

    function toggleAccordion() {
        var accordionContent = document.getElementById('accordionContent');
        accordionContent.classList.toggle('show');
    }

    document.getElementById('farmerYes').addEventListener('change', function () {
        if (this.checked) {
            addFarmerAccordion();
        }
    });

    function addFarmerAccordion() {
        farmerCount++;

        if (!mainAccordionVisible) {
            // Show the main accordion and name it "Farmer 01"
            document.getElementById('accordionHeader').classList.remove('hidden');
            document.getElementById('mainAccordionTitle').innerText = `Farmer ${String(farmerCount).padStart(2, '0')}`;
            mainAccordionVisible = true;
        } else {
            const farmerAccordionId = `farmerAccordion${farmerCount}`;

            const accordionHTML = `
                <div class="accordion" id="${farmerAccordionId}">
                    <div class="card">
                        <div class="card-header" id="heading${farmerCount}" onclick="toggleFarmerAccordion(${farmerCount})">
                            <h5 class="mb-0">
                                Farmer ${String(farmerCount).padStart(2, '0')}
                            </h5>
                        </div>
                        <div id="collapse${farmerCount}" class="collapse" aria-labelledby="heading${farmerCount}" data-parent="#${farmerAccordionId}">
                            <div class="rounded-card">
                                <div class="sidebar">
                                    <ul class="nav flex-column">
                                        <li class="nav-item">
                                                        <a class="nav-link active" href="#" onclick="showSection('id-section')">Id Section</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#" onclick="showSection('individual-details${farmerCount}')">Individual Details</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#" onclick="showSection('family-members${farmerCount}')">Family Members</a>
                                                    </li>
                                                     <li class="nav-item">
                                                        <a class="nav-link" href="#" onclick="showSection('membership-details${farmerCount}')">Membership Details</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#" onclick="showSection('land-information')">Land Information</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#" onclick="showSection('crop-information')">Crop Information</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#" onclick="showSection('livestock-information')">Livestock Information</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#" onclick="showSection('agricultural-input')">Agricultural Input</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#" onclick="showSection('access-to-resouce')">Access to Resource</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#" onclick="showSection('financial-service')">Financial Service</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="#" onclick="showSection('social-status${farmerCount}')">Socio Economic Data</a>
                                                    </li>
                                    </ul>
                                </div>
                                <main role="main" class="content">
                                    <div id="applicant-consent${farmerCount}">
                                        <h2>Applicant Consent</h2>
                                        <p>The participant agrees to share the information requested and understands that the information may be used for specific government purposes. *</p>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="consent${farmerCount}" id="consentYes${farmerCount}" value="yes" checked>
                                            <label class="form-check-label" for="consentYes${farmerCount}">
                                                Yes
                                            </label>
                                        </div>
                                    </div>
                                    <div id="enumerator-consent${farmerCount}" style="display: none;">
                                        <h2>Enumerator Consent</h2>
                                        <p>Enumerator consent content goes here.</p>
                                    </div>
                                    <div id="id-section${farmerCount}" style="display: none;">
                                        <h2>ID Section</h2>
                                        <p>ID section content goes here.</p>
                                    </div>
                                    <div id="general-information${farmerCount}" style="display: none;">
                                        <h2>General Information</h2>
                                        <p>General information content goes here.</p>
                                    </div>
                                    <div id="contact-details${farmerCount}" style="display: none;">
                                        <h2>Contact Details</h2>
                                        <p>Contact details content goes here.</p>
                                    </div>
                                    <div id="geo-location${farmerCount}" style="display: none;">
                                        <h2>Geo Location</h2>
                                        <p>Geo location content goes here.</p>
                                    </div>
                                    <div id="social-status${farmerCount}" style="display: none;">
                                        <h2>Social Status</h2>
                                        <p>Social status content goes here.</p>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            document.getElementById('additionalFarmers').insertAdjacentHTML('beforeend', accordionHTML);
        }
    }

    function toggleFarmerAccordion(farmerNumber) {
        var accordionContent = document.getElementById(`collapse${farmerNumber}`);
        accordionContent.classList.toggle('show');
    }