const rota = "http://localhost:3000/cadastro";

// Função para salvar os dados no backend
async function salvarCadastro(nome, idade, email) {
    const dados = { nome, idade, email };
    
    try {
        const response = await fetch(rota, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        if (!response.ok) {
            throw new Error("Erro ao salvar os dados no backend");
        }

        const data = await response.json();
        console.log("Cadastro salvo:", data);
        alert("Cadastro realizado com sucesso!");
        exibirUsuarios(); // Atualiza a tabela de usuários
    } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
        alert("Erro ao salvar os dados.");
    }
}

// Função para buscar todos os cadastros do backend
async function obterCadastros() {
    try {
        const response = await fetch(rota);
        if (!response.ok) {
            throw new Error("Erro ao buscar cadastros");
        }

        const usuarios = await response.json();
        return usuarios;
    } catch (error) {
        console.error("Erro ao buscar cadastros:", error);
    }
}

// Função para exibir os usuários na tabela
async function exibirUsuarios() {
    const usuarios = await obterCadastros(); // Obtém os usuários do backend
    const tabela = document.getElementById('tabelaUsuarios').getElementsByTagName('tbody')[0];
    tabela.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados

    usuarios.forEach((usuario) => {
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
        btnEditar.onclick = () => editarUsuario(usuario.id);

        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'Excluir';
        btnExcluir.classList.add('delete');
        btnExcluir.onclick = () => excluirUsuario(usuario.id);

        cellAcoes.appendChild(btnEditar);
        cellAcoes.appendChild(btnExcluir);
    });
}

// Função para editar o usuário
async function editarUsuario(id) {
    const usuarios = await obterCadastros();
    const usuario = usuarios.find(u => u.id === id);

    // Preencher o formulário com os dados do usuário
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('idade').value = usuario.idade;
    document.getElementById('email').value = usuario.email;

    // Alterar o evento do botão para editar (e não salvar como novo)
    const form = document.getElementById('formCadastro');
    form.onsubmit = function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const email = document.getElementById('email').value;

        atualizarCadastro(id, nome, idade, email);
    };
}

// Função para atualizar o cadastro no backend
async function atualizarCadastro(id, nome, idade, email) {
    const dados = { nome, idade, email };

    try {
        const response = await fetch(`${rota}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados),
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar os dados");
        }

        const data = await response.json();
        console.log("Cadastro atualizado:", data);
        alert("Cadastro atualizado com sucesso!");
        exibirUsuarios(); // Atualiza a tabela de usuários
    } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
        alert("Erro ao atualizar os dados.");
    }
}

// Função para excluir o usuário
async function excluirUsuario(id) {
    try {
        const response = await fetch(`${rota}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Erro ao excluir o usuário");
        }

        console.log("Usuário excluído com sucesso");
        alert("Usuário excluído com sucesso!");
        exibirUsuarios(); // Atualiza a tabela de usuários
    } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
        alert("Erro ao excluir o usuário.");
    }
}

// Exibe os usuários cadastrados ao carregar a página
document.addEventListener('DOMContentLoaded', exibirUsuarios);

// Lidar com o envio do formulário
document.getElementById('formCadastro').onsubmit = function(event) {
    event.preventDefault(); // Evita o envio do formulário

    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const email = document.getElementById('email').value;

    if (!nome || !idade || !email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    salvarCadastro(nome, idade, email); // Envia o cadastro para o backend
};
