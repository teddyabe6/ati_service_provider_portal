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