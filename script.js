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
console.log("script.js carregado");

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM carregado");

  const formCriarMotivo = document.getElementById('criar-motivo-form');
  console.log("formCriarMotivo:", formCriarMotivo);

  if (formCriarMotivo) {
    formCriarMotivo.addEventListener('submit', e => {
      e.preventDefault();
      console.log("Submit do formulário detectado");

      const nome = document.getElementById('nomeMotivo').value.trim();
      const descricao = document.getElementById('descricaoMotivo').value.trim();
      let dataCriacao = document.getElementById('dataCriacao').value.trim();

      if (!nome || !descricao) {
        alert('Preencha os campos Nome e Descrição!');
        return;
      }

      if (!dataCriacao) {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0');
        const ano = hoje.getFullYear();
        dataCriacao = `${dia}/${mes}/${ano}`;
      }

      const motivos = JSON.parse(localStorage.getItem('motivos')) || [];
      motivos.push({ nome, descricao, dataCriacao });
      localStorage.setItem('motivos', JSON.stringify(motivos));
      console.log("Novo motivo salvo:", { nome, descricao, dataCriacao });

      window.location.href = 'motivos.html';
    });
  } else {
    console.warn("Formulário não encontrado");
  }
});
// fim - motivos