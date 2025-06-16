function toggleSidebar() {
    const sidebar = document.getElementsByClassName('temp-sidebar');
    const btn = document.getElementById('temp-sidebar-btn');
    
    sidebar.toggleClass('expanded');
    
    if (sidebar.classList.contains('expanded')) {
        btn.html('<i class="fas fa-times"></i>');
        btn.css('margin-left', 'auto');
    } else {
        btn.html('<i class="fas fa-bars"></i>');
        btn.css('margin-left', '0');
    }
}

document.getElementById("temp-sidebar-btn").addEventListener("click", (e) => {
    console.log("toggle!");
    toggleSidebar();
}); 

