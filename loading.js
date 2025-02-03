// Loading screen handler
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Force hide loading screen after 5 seconds
    const maxLoadTime = 5000; // 5 seconds
    
    // Hide loading screen function
    const hideLoadingScreen = () => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300); // Matches transition time in CSS
    };

    // Start timer immediately when script loads
    setTimeout(hideLoadingScreen, maxLoadTime);

    // Also hide loading screen when all content is loaded (if before 5 seconds)
    window.addEventListener('load', () => {
        if (loadingScreen.style.display !== 'none') {
            hideLoadingScreen();
        }
    });
});