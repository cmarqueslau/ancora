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

async function loadTemplate(id, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;
  } catch (error) {
    console.error(`Erro ao carregar ${file}:`, error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("DOM carregado");

  // Botão '+ Criar Motivo'
  const btnAddMotivo = document.getElementById('btn-add-motivo');
  if (btnAddMotivo) {
    btnAddMotivo.addEventListener('click', () => {
      window.location.href = 'criar-motivo.html';
    });
  }

  // Cancelar formulário
  const btnCancelar = document.getElementById('btn-cancelarForm');
  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      history.back();
    });
  }

  // Formulário de criação de motivo
  const formCriarMotivo = document.getElementById('criar-motivo-form');
  if (formCriarMotivo) {
    formCriarMotivo.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nomeMotivo').value.trim();
      const descricao = document.getElementById('descricaoMotivo').value.trim();
      let dataCriacao = document.getElementById('dataCriacao').value.trim();

      if (!nome || !descricao) {
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

      const novoMotivo = { nome, descricao, dataCriacao };
      const motivos = JSON.parse(localStorage.getItem('motivos')) || [];
      motivos.push(novoMotivo);
      localStorage.setItem('motivos', JSON.stringify(motivos));

      window.location.href = 'motivos.html';
    });

    // Flatpickr
    if (window.flatpickr) {
      flatpickr("#dataCriacao", {
        dateFormat: "d/m/Y",
        locale: "pt"
      });
    }
  }

  // Mostrar lista de motivos na motivos.html
  const listaMotivos = document.getElementById('lista-motivos');
  const btnAdd = document.getElementById('btn-add-motivo');

  if (listaMotivos && btnAdd) {
    const motivos = JSON.parse(localStorage.getItem('motivos')) || [];

    motivos.forEach(motivo => {
      const div = document.createElement('div');
      div.classList.add('motivo-pequeno');
      div.innerHTML = `
        <div class="text-center">
          <strong>${motivo.nome}</strong><br>
          <small>${motivo.dataCriacao}</small><br>
          <p class="mt-2 mb-0">${motivo.descricao}</p>
        </div>
      `;

      div.addEventListener('click', () => {
        localStorage.setItem('motivoSelecionado', JSON.stringify(motivo));
        window.location.href = 'visualizar-motivo.html';
      });

      listaMotivos.insertBefore(div, btnAdd);
    });
  }

  // Carregar visualização do motivo
  console.log("visualizar-motivo: carregando dados...");

  const spanNome = document.getElementById('motivo-nome');
  const spanDesc = document.getElementById('motivo-descricao');
  const spanData = document.getElementById('motivo-data');

  if (spanNome && spanDesc && spanData) {
    const motivo = JSON.parse(localStorage.getItem('motivoSelecionado'));

    if (!motivo) {
      window.location.href = 'motivos.html';
      return;
    }

    spanNome.textContent = motivo.nome;
    spanDesc.textContent = motivo.descricao;
    spanData.textContent = motivo.dataCriacao;
  }
});

  document.addEventListener('DOMContentLoaded', () => {
  const nomeEl = document.getElementById('motivo-nome');
  const descricaoEl = document.getElementById('motivo-descricao');
  const dataEl = document.getElementById('motivo-data');

  if (nomeEl && descricaoEl && dataEl) {
    const motivo = JSON.parse(localStorage.getItem('motivoSelecionado'));
    console.log("Motivo recuperado:", motivo);

    if (motivo) {
      nomeEl.textContent = motivo.nome;
      descricaoEl.textContent = motivo.descricao;
      dataEl.textContent = motivo.dataCriacao;
    }
  }
});

// fim - motivos