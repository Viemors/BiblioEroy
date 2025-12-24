const model = require("../model/resenhasModel") //isso aq é o mesmo que ta no bdcontroller, pq ambos fazem a mesma coisa
const modelUser = require("../model/cadastroUserModel")

//SEQUELIZE
const teste = async (req, res) => {
    const result = await model.Todos()
    res.status(200).json(result);
}

const add = async (req, res) => {
    const result = await model.add(req.body)
    if (result) {
        req.flash('success','resenha publicada com sucesso.');
        return res.redirect('/pages/perfilLiv');
    } else {
        req.flash('error','erro ao publicar resenha.');
        return res.redirect('/pages/perfilLiv');
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
    if (req.body.tipo == "autor") {
       try{
            const result = await model.buscar_autor(req.body.busca);
            if (result.resultados.length == 0) {
                req.flash("error", "autor não encontrado.")
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

    if (livro) {
        res.render("pages/perfilLiv", { livro });
    } else {
        req.flash("error", "Livro não encontrado.");
        return res.redirect("/perfil/livro");
    }
};

module.exports = {add, teste, buscar, delet, atualizar, mostrar, perfilLivro}