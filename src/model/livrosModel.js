const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")
const modelLeitor = require("../model/cadastroUserModel")
const bd = require("../config/bd")


//definindo a Tabela livros
// com sequelize
const livros = db.define("livros", {
    id:{
    type: Sequelize.INTEGER,
    autoIncrement: true, 
    allowNull: false,
    primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: 'SEM DESCRIÇÃO'
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'sem_imagem.png'
    }
})

//arranjo de inicio
const livros_iniciais = [
    {
        titulo: "Dom Casmurro",
        autor: "Machado de Assis",
        categoria: "Romance",
        descricao: "Em Dom Casmurro, o narrador Bento Santiago retoma a infância que passou na Rua de Matacavalos e conta a história do amor e das desventuras que viveu com Capitu, uma das personagens mais enigmáticas e intrigantes da literatura brasileira. Nas páginas deste romance, encontra-se a versão de um homem perturbado pelo ciúme, que revela aos poucos sua psicologia complexa e enreda o leitor em sua narrativa ambígua acerca do acontecimento ou não do adultério da mulher com olhos de ressaca, uma das maiores polêmicas da literatura brasileira.",
        imagem: "/img/livros/machado/dom casmurro.webp"
    },
    {
        titulo: "Memórias Póstumas de Brás Cubas",
        autor: "Machado de Assis",
        categoria: "Realismo",
        descricao: "Um dos principais romances da literatura brasileira, inaugura a fase madura de Machado de Assis. Brás Cubas é um defunto-autor que dedica sua obra ao verme que primeiro roeu as frias carnes de seu cadáver. O protagonista narra suas memórias, intercalando episódios, delírios e reflexões, expondo as atitudes mesquinhas que teve em vida.",
        imagem: "/img/livros/machado/memorias post.webp"
    },
    {
        titulo: "Quincas Borba",
        autor: "Machado de Assis",
        categoria: "Realismo",
        descricao: "Continuação temática de 'Memórias Póstumas', apresenta a história de Rubião, um ingênuo professor que herda uma fortuna do filósofo Quincas Borba. Aborda temas como a loucura, a ambição e a hipocrisia social sob a ótica do Humanitismo.",
        imagem: "/img/livros/machado/quincas.webp"
    },
    {
        titulo: "Otelo",
        autor: "William Shakespeare",
        categoria: "Drama",
        descricao: "A tragédia em que Shakespeare estudou os mecanismos da imaginação, da paixão e do ciúme. O general mouro Otelo é levado pelo manipulador Iago a suspeitar da fidelidade de sua esposa, Desdêmona, resultando em um final catastrófico.",
        imagem: "/img/livros/shakespeare/otelo.webp"
    },
    {
        titulo: "Hamlet",
        autor: "William Shakespeare",
        categoria: "Drama",
        descricao: "O jovem príncipe da Dinamarca tenta vingar a morte de seu pai após encontrar seu fantasma. Entre planos de vingança e simulações de loucura, a obra é um retrato eletrizante da complexa vida emocional humana.",
        imagem: "/img/livros/shakespeare/hamlet.webp"
    },
    {
        titulo: "Romeu e Julieta",
        autor: "William Shakespeare",
        categoria: "Drama",
        descricao: "Duas famílias rivais em Verona banham as ruas de sangue, enquanto dois jovens herdeiros desafiam a rixa familiar em um amor secreto. A primeira das grandes tragédias de Shakespeare sobre o destino e o amor impossível.",
        imagem: "/img/livros/shakespeare/romeu e julieta.webp"
    },
    {
        titulo: "O Castelo",
        autor: "Franz Kafka",
        categoria: "Existencialismo",
        descricao: "O personagem K. tenta desesperadamente entrar em contato com as autoridades de um castelo para assumir um emprego de agrimensor, mas se perde em uma burocracia absurda e aldeões hostis.",
        imagem: "/img/livros/kafka/o castelo.webp"
    },
    {
        titulo: "Carta ao Pai",
        autor: "Franz Kafka",
        categoria: "Autobiográfico",
        descricao: "Uma carta pungente onde Kafka realiza um ajuste de contas com seu pai autoritário, Hermann Kafka. Um documento profundo sobre a relação entre pais e filhos e a formação da culpa.",
        imagem: "/img/livros/kafka/carta ao pai.webp"
    },
    {
        titulo: "Metamorfose",
        autor: "Franz Kafka",
        categoria: "Ficção",
        descricao: "A história de Gregor Samsa, que acorda transformado em um inseto monstruoso. Um relato sobre o isolamento humano e a rejeição familiar diante do bizarro.",
        imagem: "/img/livros/kafka/metamorfose (1).webp"
    },
    {
        titulo: "A Hora da Estrela",
        autor: "Clarice Lispector",
        categoria: "Ficção",
        descricao: "A história de Macabéa, uma nordestina miserável no Rio de Janeiro que mal tem consciência de sua existência. Um romance profundo sobre o desamparo social e espiritual.",
        imagem: "/img/livros/clarice/hora da estrela.webp"
    },
    {
        titulo: "Água Viva",
        autor: "Clarice Lispector",
        categoria: "Romance",
        descricao: "Uma obra sem enredo tradicional, focada no fluxo de pensamento da narradora sobre a vida, o tempo e a arte. Um mergulho no infinito da identidade.",
        imagem: "/img/livros/clarice/agua viva.webp"
    },
    {
        titulo: "Um Sopro de Vida",
        autor: "Clarice Lispector",
        categoria: "Romance",
        descricao: "O último livro escrito por Clarice, onde um autor dialoga com sua criação, Ângela Pralini. Uma exploração sobre os limites da vida e da linguagem.",
        imagem: "/img/livros/clarice/sopro de vida.webp"
    },
    {
        titulo: "Crime e Castigo",
        autor: "Fiódor Dostoiévski",
        categoria: "Romance Psicológico",
        descricao: "A história de Raskólnikov, um jovem estudante que comete um assassinato acreditando estar acima da moral comum, mas é consumido pela culpa e pelo isolamento. Uma exploração profunda sobre o sofrimento e a redenção.",
        imagem: "/img/livros/dostoievski/crime e castigo.webp"
    },
    {
        titulo: "Noites Brancas",
        autor: "Fiódor Dostoiévski",
        categoria: "Romance",
        descricao: "Um jovem sonhador encontra uma moça em uma ponte de São Petersburgo. Durante quatro noites, eles compartilham suas histórias e solidões sob a luz do sol da meia-noite russa.",
        imagem: "/img/livros/dostoievski/noites brancas.webp"
    },
    {
    titulo: "Memórias do Subsolo",
    autor: "Fiódor Dostoiévski",
    categoria: "Romance Psicológico",
    descricao: "Um funcionário que vive no subsolo de um edifício em São Petersburgo expõe sua visão de mundo num discurso explosivo e labiríntico sobre a condição humana.",
    imagem: "/img/livros/dostoievski/memorias do subsolo.webp"
  }
];
livros.sync().then(async ()=>{ // Criar a tabela se não existir
    if(await livros.count() == 0) { //Se a tabela estiver vazia ele atribui os dados iniciais
        livros.bulkCreate(livros_iniciais) //bulkCreate -> Criar com arranjos
    }
});  

//Funções do sequelize
const Todos = () => livros.findAll()

//Função pra encontrar o id de acordo com os outros valores
const buscar = async (params) => await livros.findOne({
    where: {titulo: params.titulo, autor: params.autor, categoria: params.categoria}
})

const add = async (params) => await livros.create(params)

const buscar_id = (id) => livros.findByPk(id)

const buscar_titulo = async (titulo) => await bd.promise().query(`SELECT * FROM livros WHERE titulo = '${titulo}' LIMIT 1`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro
})

const buscar_autor = async (autor) => await bd.promise().query(`SELECT * FROM livros WHERE autor = '${autor}'`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro
})

const buscar_categoria = async (categoria) => await bd.promise().query(`SELECT * FROM livros WHERE categoria = '${categoria}'`)
    .then(([rows, fields]) => {return {resultados: rows, colunas: fields} })
    .catch((erro) => {return erro})


const delet = async(id) => {
    await livros
.destroy({
        where: {
            id: id
        }
    });
}

const mostrarDados = async () => {
    const tabelas = await bd.promise().query("show tables")
    .then(([rows, fields]) => {console.log(fields);return rows }
    )
    .catch (err => {return err}
    )
    const result = [];
    if (tabelas) {    
        for(let i = 0; i<tabelas.length; i++) {
            const n1 = await bd.promise().query(`select * from ${tabelas[i].Tables_in_bioeroy}`)
            .then(([rows, fields]) => {return {resultados: rows, colunas: fields} }
            )
            .catch(([erro]) => {return erro}
            )

            result.push(n1)  
        };
    }
    console.log(result[0].colunas[0].name)
    return result
}

module.exports = {livros, Todos, add, delet, buscar_id, buscar, buscar_titulo, buscar_autor, buscar_categoria, mostrarDados};