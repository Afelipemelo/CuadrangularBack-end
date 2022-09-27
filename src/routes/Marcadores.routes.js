const { Router } = require('express');
const express = require('express');
const Marcadores = require('../controller/Marcadores.controller')
const router = express.Router();

router.post('/CrearMarcador', async (req, res) => {


    try {


        const {idEquipo , golesAfabor, golesEncontra, puntos, partidosJugados  } = req.body;

        const campos = [
            {
                nombre: "idEquipo",
                valor: idEquipo
            },
            {
                nombre: "golesAfabor",
                valor: golesAfabor
            },
            {
                nombre: "golesEncontra",
                valor: golesEncontra
            }
            ,
            {
                nombre: "puntos",
                valor: puntos
            }
            ,
            {
                nombre: "partidosJugados",
                valor: partidosJugados
            }
        ]

        const camposVacios = campos.find(item => !item.valor);

        if (camposVacios) {
            return res.status(400).json({
                message: `No ingreso el campo ${camposVacios.nombre}`,
                code: -1
            });
        }

        const respuesta = await  Marcadores.agregarMarcador( idEquipo , golesAfabor, golesEncontra, puntos, partidosJugados )

        if (respuesta) {

            res.status(200).json({
                msg: 'registro exitoso'
            })
        } else {
            return res.status(400).json({
                msg: "error el registro"
            })
        }

    } catch (error) {
        console.log("error: " + error)
    }


})



router.get('/getAllMarcadores', async (req , res) => {
    try {
        
        const respuesta = await Marcadores.consultarMarcadores()

        res.status(200).json({
            respuesta
        })
    
        } catch (error) {
            console.log(error)
        }
})


module.exports = router