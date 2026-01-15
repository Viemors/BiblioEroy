const model = require("../model/resenhasModel") //isso aq é o mesmo que ta no bdcontroller, pq ambos fazem a mesma coisa
const modelUser = require("../model/cadastroUserModel")

//SEQUELIZE
const teste = async (req, res) => {
    const result = await model.Todos()
    res.status(200).json(result);
}

const add = async (req, res) => {
    const dadosResenha = { //ajustar pra pegar os dados do form
        livroId: req.body.livroId,
        username: req.session.username,
        texto: req.body.texto,
        avaliacao: req.body.avaliacao || 0 
    };
    
    const result = await model.add(dadosResenha);
    
    if (result) {
        req.flash('success','resenha publicada com sucesso.');
        return res.redirect(`/perfilLivro/${req.body.livroId}`); //redireciona pra pagina do livro depois de publicar a resenha
    } else {
        req.flash('error','erro ao publicar resenha.');
        return res.redirect(`/perfilLivro/${req.body.livroId}`);
    }
}

const delet = async (req, res) => {
    await model.delet(req.params.id)
     req.flash('success','resenha deletada com sucesso.');
    return res.redirect('/mostrarResenhas');
}

//Buscar por alguma coisa
const buscar = async (req, res) => {
    if (!req.body.tipo){ 
        req.flash("error", "Selecione um tipo para busca.")
        return res.redirect("/pages/perfilLiv");
    }
    if (req.body.tipo == "titulo") {
       try{
          const result = await model.buscar_titulo(req.body.busca);
          res.render("tabelaLivro/consultas", {result});
    } catch(error){
        req.flash("error", "Titulo não encontado.")
        return res.redirect("/perfil/livro");
    }
    }
    if (req.body.tipo == "username") {
       try{
            const result = await model.buscar_username(req.body.busca);
            if (result.resultados.length == 0) {
                req.flash("error", "username não encontrado.")
                return res.redirect("/perfil/livro");
           }
           res.render("tabelaLivro/consultas", {result});
    } catch(error){
        req.flash("error", error.message)
        return res.redirect("/perfil/livro");
    }
    }
}

const mostrar = async (req, res) => {
    try {
        const resenhas = await model.Todos();
        res.render('tabelaLivro/consultas', {result: {resultados: resenhas, colunas: []}});
    } catch(error) {
        req.flash('error', 'Erro ao carregar resenhas');
        return res.redirect('/perfil/livro');
    }
}

const atualizar = async (req, res) => {
    await model.atualizar(req.body)
    req.flash('success','resenha atualizada com sucesso.');
    return res.redirect('/mostrarResenhas');
}

const perfilLivro = async (req, res) => {
    const livro = await model.buscar_id(req.params.id);
    const usuario = await modelUser.buscar_nome(req.session.username); //pegar o username do usuario logado pra add como autor da resenha

    if (livro) {
        res.render("pages/perfilLiv", { livro, usuario });
    } else {
        req.flash("error", "Livro não encontrado.");
        return res.redirect("/perfil/livro");
    }
};

module.exports = {add, teste, buscar, delet, atualizar, mostrar, perfilLivro}