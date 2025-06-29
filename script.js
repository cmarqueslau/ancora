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
    console.log("Botão '+ Criar Motivo' encontrado");
    btnAddMotivo.addEventListener('click', () => {
      console.log("Redirecionando para criar-motivo.html");
      window.location.href = 'criar-motivo.html';
    });
  } else {
    console.warn("Botão '+ Criar Motivo' NÃO encontrado");
  }

  // Cancelar formulário
  const btnCancelar = document.getElementById('btn-cancelarForm');
  if (btnCancelar) {
    btnCancelar.addEventListener('click', () => {
      console.log("Cancelado. Voltando à página anterior.");
      history.back();
    });
  }

  // Formulário de criação de motivo
  const formCriarMotivo = document.getElementById('criar-motivo-form');
  console.log("formCriarMotivo:", formCriarMotivo);
  if (formCriarMotivo) {
    console.log("Formulário encontrado e escutando submit");

    formCriarMotivo.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log("Submit interceptado");

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

      console.log("Motivo salvo:", novoMotivo);
      window.location.href = 'motivos.html';
    });

    // Flatpickr se necessário
    if (window.flatpickr) {
      flatpickr("#dataCriacao", {
        dateFormat: "d/m/Y",
        locale: "pt"
      });
    }
  }

  // Mostrar lista de motivos
// Mostrar motivos na página motivos.html
const listaMotivos = document.getElementById('lista-motivos');

if (listaMotivos) {
  const motivos = JSON.parse(localStorage.getItem('motivos')) || [];
  const btnAdd = document.getElementById('btn-add-motivo');

  listaMotivos.innerHTML = ''; // Limpa antes de adicionar

  motivos.forEach(motivo => {
    const div = document.createElement('div');
    div.classList.add('motivo-pequeno');
    div.innerHTML = `
      <div class="d-flex flex-column text-center">
        <strong>${motivo.nome}</strong>
        <small>${motivo.dataCriacao}</small>
        <p style="margin-top: 5px;">${motivo.descricao}</p>
      </div>
    `;
    listaMotivos.appendChild(div); // adiciona normalmente
  });

  listaMotivos.appendChild(btnAdd); // garante que o botão fique por último
}

document.getElementById('btn-add-motivo').addEventListener('click', () => {
  window.location.href = 'criar-motivo.html';
});

});

// fim - motivos