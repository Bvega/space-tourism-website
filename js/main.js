// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Fetch JSON data for dynamic content
    const data = await fetchData();
    
    // Determine current page and initialize content
    initCurrentPage(data);
    
    // Add active nav highlighting based on current page
    highlightCurrentNav();
});

/**
 * Fetches data from the JSON file
 */
async function fetchData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

/**
 * Highlights the current page in the navigation
 */
function highlightCurrentNav() {
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Select all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove active class from all links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) || 
            (currentPath.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Initializes page-specific content based on current URL
 */
function initCurrentPage(data) {
    if (!data) return;
    
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Initialize page-specific content
    if (currentPath.includes('destination')) {
        initDestinationPage(data.destinations);
    } else if (currentPath.includes('crew')) {
        initCrewPage(data.crew);
    } else if (currentPath.includes('technology')) {
        initTechnologyPage(data.technology);
    }
}

// Add the destination, crew, and technology initialization functions
// (These come from the bootstrap-main.js file)