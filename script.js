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
  async function loadTemplate(id, file) {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  }

document.addEventListener('DOMContentLoaded', () => {
  loadTemplate('template-header', '_header.html');
  loadTemplate('template-sidebar', '_sidebar.html').then(() => {
    const btnAddMotivo = document.getElementById('btn-add-motivo');
    if (btnAddMotivo) {
      btnAddMotivo.addEventListener('click', () => {
        window.location.href = 'criar-motivo.html';
      });
    }
  });

  const btnCancelar = document.getElementById("btn-cancelarForm");
  if (btnCancelar) {
    btnCancelar.addEventListener("click", function () {
      history.back();
    });
  }
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const btnAddMotivo = document.getElementById('btn-add-motivo');
    if (btnAddMotivo) {
      btnAddMotivo.addEventListener('click', () => {
        window.location.href = 'criar-motivo.html';
      });
    }

  document.getElementById('criar-motivo-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nomeMotivo').value.trim();
    const descricao = document.getElementById('descricaoMotivo').value.trim();
    let dataCriacao = document.getElementById('dataCriacao').value.trim();

    if (nome === "" || descricao === "") {
      alert("Preencha os campos Nome e Descrição!");
      return;
    }

    if (!dataCriacao) {
      const hoje = new Date();
      const dia = String(hoje.getDate()).padStart(2, '0');
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const ano = hoje.getFullYear();
      dataCriacao = `${dia}/${mes}/${ano}`;
    }

    const novoMotivo = {
      nome,
      descricao,
      dataCriacao
    };

    const motivosExistentes = JSON.parse(localStorage.getItem('motivos')) || [];
    motivosExistentes.push(novoMotivo);
    localStorage.setItem('motivos', JSON.stringify(motivosExistentes));

    window.location.href = 'motivos.html';
  });

  flatpickr("#dataCriacao", {
    dateFormat: "d/m/Y",
    locale: "pt"
  });

  

  const grid = document.getElementById('lista-motivos');
  if (grid) {
    const motivos = JSON.parse(localStorage.getItem('motivos')) || [];
    const btnAdd = document.getElementById('btn-add-motivo');
    motivos.forEach(motivo => {
      const div = document.createElement('div');
      div.classList.add('motivo-pequeno');
      div.innerHTML = `
        <strong>${motivo.nome}</strong><br>
        <small>${motivo.dataCriacao || motivo.data}</small>
        <p style="margin-top: 5px;">${motivo.descricao || motivo.texto || ''}</p>
      `;
      grid.insertBefore(div, btnAdd);
    });
  }

  const campoData = document.getElementById("dataMotivo");
  if (campoData && !campoData.value) {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    campoData.value = `${ano}-${mes}-${dia}`;
  }

  const form = document.getElementById('form-criar-motivo');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nomeMotivo').value.trim();
      const descricao = document.getElementById('descricaoMotivo').value.trim();
      const dataCriacao = campoData ? campoData.value : new Date().toLocaleDateString();

      if (!nome || !descricao) {
        alert('Preencha todos os campos.');
        return;
      }

      const novoMotivo = { nome, descricao, dataCriacao };

      const motivos = JSON.parse(localStorage.getItem('motivos')) || [];
      motivos.push(novoMotivo);
      localStorage.setItem('motivos', JSON.stringify(motivos));

      window.location.href = 'motivos.html';
    });
  }
});



// fim - motivos