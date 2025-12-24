const express = require("express")
const router = express.Router()

const controller = require("../controllers/resenhasController")

router.get("/mostrarResenhas", controller.mostrar)
router.get("/perfilLivro/:id", controller.perfilLivro)
router.post("/addResenha", controller.add) //
router.get("/deleteResenha/:id", controller.delet)
router.post("/buscarResenha", controller.buscar)
router.post("/atualizarResenha", controller.atualizar)

module.exports = router