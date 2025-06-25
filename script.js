function toggleSidebar() {
    const sidebar = $('.temp-sidebar');
    const btn = $('#temp-sidebar-btn');
    
    sidebar.toggleClass('expanded');
    
    if (sidebar.hasClass('expanded')) {
        btn.html('<i class="fas fa-times"></i>');
        btn.css('margin-left', 'auto');
    } else {
        btn.html('<i class="fas fa-bars"></i>');
        btn.css('margin-left', '0');
    }
}


$(document).on("click","#temp-sidebar-btn",function() {
    toggleSidebar();
});


// início - motivos

document.getElementById('btn-add-motivo').addEventListener('click', function() {
    window.location.href = 'criar-motivo.html';
});

// add pros outros motivos -> botao e arquivo

document.getElementById("btn-cancelarForm").addEventListener("click", function () {
  history.back(); 
});

// fim - motivos