// Define a URL base da API de alunos.
// Usada para buscar (GET) e inserir (POST) alunos via requisições HTTP.
const API_URL = "http://leoproti.com.br:8004/alunos";

// Função assíncrona responsável por buscar os alunos da API e exibi-los na tabela HTML.
async function carregarAlunos() {
    // Realiza uma requisição HTTP GET para a URL da API.
    const resp = await fetch(API_URL);
    // Converte a resposta da API para um objeto JavaScript (array de alunos).
    const alunos = await resp.json();
    // Seleciona o elemento <tbody> da tabela onde os alunos serão exibidos.
    const tbody = document.getElementById("produtosBody");
    // Limpa o conteúdo anterior da tabela para evitar duplicidade.
    tbody.innerHTML = "";
    // Percorre cada aluno retornado pela API.
    alunos.forEach((aluno) => {
        // Cria um novo elemento de linha da tabela (<tr>).
        const tr = document.createElement("tr");
        // Monta o conteúdo HTML da linha usando template strings.
        // Exibe o ID, o nome, a turma, o curso e a matrícula do aluno.
        tr.innerHTML = `
      <td>${aluno.id}</td>
      <td>${aluno.nome}</td>
      <td>${aluno.turma}</td>
      <td>${aluno.curso}</td>
      <td>${aluno.matricula}</td>
    `;
        // Adiciona a linha criada ao corpo da tabela.
        tbody.appendChild(tr);
    });
}

// Adiciona um ouvinte de evento para o envio do formulário de cadastro de aluno.
// Quando o formulário é enviado, executa a função assíncrona abaixo.
document
    .getElementById("produtoForm")
    .addEventListener("submit", async function (e) {
        // Previne o comportamento padrão do formulário (recarregar a página).
        e.preventDefault();
        // Obtém e remove espaços extras de cada campo do formulário.
        const nome = document.getElementById("nome").value.trim();
        const turma = document.getElementById("turma").value.trim();
        const curso = document.getElementById("curso").value.trim();
        const matricula = document.getElementById("matricula").value.trim();

        // Validação: todos os campos devem estar preenchidos.
        if (!nome || !turma || !curso || !matricula) {
            alert("Preencha todos os campos.");
            return;
        }

        try {
            // Envia uma requisição HTTP POST para a API com os dados do novo aluno.
            // Os dados são enviados no corpo da requisição em formato JSON.
            const resp = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, turma, curso, matricula }),
            });

            // Se a resposta não for bem-sucedida (status HTTP diferente de 2xx), lança um erro.
            if (!resp.ok) {
                throw new Error("Erro HTTP: " + resp.status);
            }

            // Se o aluno foi inserido com sucesso:
            // - Exibe mensagem de sucesso ao usuário.
            // - Limpa os campos do formulário.
            // - Atualiza a tabela de alunos chamando carregarAlunos().
            alert("Aluno inserido com sucesso!");
            this.reset();
            carregarAlunos();
        } catch (err) {
            // Em caso de erro na requisição, exibe mensagem detalhada ao usuário.
            alert("Erro ao salvar aluno na API: " + err.message);
        }
    });

// Ao carregar o script, chama a função para exibir os alunos já cadastrados.
// Isso garante que a tabela esteja sempre atualizada ao abrir a página.
carregarAlunos();
