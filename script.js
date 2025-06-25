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

document.getElementById('form-criar-motivo').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nomeMotivo').value;
    const descricao = document.getElementById('descricaoMotivo').value;
    const data = document.getElementById('dataMotivo').value;

    const novoMotivo = {
      nome,
      descricao,
      data
    };

    const motivos = JSON.parse(localStorage.getItem('motivos')) || [];
    motivos.push(novoMotivo);
    localStorage.setItem('motivos', JSON.stringify(motivos));

    window.location.href = 'motivos.html';
  });

// fim - motivos