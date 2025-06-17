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

document.getElementById('btn-add-motivo').addEventListener('click', () => {
  alert('Botão + clicado - aqui você pode implementar adicionar um motivo');
});
