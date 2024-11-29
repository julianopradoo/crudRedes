// Função para salvar os dados no localStorage
function salvarCadastro(nome, idade, email) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({ nome, idade, email });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Função para exibir os usuários cadastrados na tabela
function exibirUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const tabela = document.getElementById('tabelaUsuarios').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados

    usuarios.forEach((usuario, index) => {
        const row = tabela.insertRow();
        const cellNome = row.insertCell(0);
        const cellIdade = row.insertCell(1);
        const cellEmail = row.insertCell(2);
        const cellAcoes = row.insertCell(3);

        cellNome.textContent = usuario.nome;
        cellIdade.textContent = usuario.idade;
        cellEmail.textContent = usuario.email;

        // Adicionar botões de Ação
        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.classList.add('edit');
        btnEditar.onclick = () => editarUsuario(index);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.classList.add('delete');
        btnExcluir.onclick = () => excluirUsuario(index);

        cellAcoes.appendChild(btnEditar);
        cellAcoes.appendChild(btnExcluir);
    });
}

// Função para editar o usuário
function editarUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    // Preencher o formulário com os dados do usuário
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('idade').value = usuario.idade;
    document.getElementById('email').value = usuario.email;

    // Alterar o evento do botão para editar (e não salvar como novo)
    const form = document.getElementById('formCadastro');
    form.onsubmit = function(event) {
        event.preventDefault();

        // Atualizar os dados no localStorage
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const email = document.getElementById('email').value;

        usuarios[index] = { nome, idade, email };
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Limpar e restaurar o formulário
        exibirUsuarios();
        form.reset();
        form.onsubmit = salvarFormulario;
    };
}

// Função para salvar o formulário (quando é um novo cadastro)
function salvarFormulario(event) {
    event.preventDefault(); // Evita o envio do formulário

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const email = document.getElementById('email').value;

    salvarCadastro(nome, idade, email); // Salva o cadastro
    exibirUsuarios(); // Atualiza a tabela com os dados

    // Limpa os campos do formulário
    document.getElementById('formCadastro').reset();
}

// Função para excluir o usuário
function excluirUsuario(index) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.splice(index, 1); // Remove o usuário pelo índice
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    exibirUsuarios(); // Atualiza a tabela
}

// Exibe os usuários cadastrados ao carregar a página
document.addEventListener('DOMContentLoaded', exibirUsuarios);

// Lidar com o envio do formulário
document.getElementById('formCadastro').onsubmit = salvarFormulario;

//######################################################################################

//router.post('/', ...); // Para criar cadastro
//router.get('/', ...);  // Para listar cadastros
//router.get('/:id', ...); // Para buscar um cadastro pelo ID
//router.put('/:id', ...); // Para atualizar um cadastro pelo ID
//router.delete('/:id', ...); // Para deletar um cadastro pelo ID

// Função para enviar os dados ao backend
async function enviarCadastro(dados) {
  try {
    const response = await fetch("http://localhost:3000/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error("Erro ao salvar os dados no backend");
    }

    const data = await response.json();
    console.log("Resposta do backend:", data);
    alert("Cadastro realizado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar com o backend:", error);
    alert("Erro ao enviar os dados.");
  }
}

// Evento associado ao botão de salvar
document.getElementById("salvarBtn").addEventListener("click", () => {
  // Coletando os dados do formulário
  const dados = {
    nome: document.getElementById("nome").value,
    idade: document.getElementById("idade").value,
    email: document.getElementById("email").value,
  };

  // Validação básica
  if (!dados.nome || !dados.idade || !dados.email) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Chamada da função para enviar os dados
  enviarCadastro(dados);
});