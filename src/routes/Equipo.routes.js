const { Router } = require('express');
const express = require('express');
const Equipo = require('../controller/Equipo.controller')
const Marcadores = require('../controller/Marcadores.controller')

const router = express.Router();
const uuid = require('uuid');


router.post('/CrearEquipo', async (req, res) => {


    try {

        const id = uuid.v4();

        const { nombreEquipo, directorTecnico, capitan } = req.body;

        const campos = [
            {
                nombre: "nombreEquipo",
                valor: nombreEquipo
            },
            {
                nombre: "directorTecnico",
                valor: directorTecnico
            },
            {
                nombre: "capitan",
                valor: capitan
            }
        ]

        const camposVacios = campos.find(item => !item.valor);

        if (camposVacios) {
            return res.status(400).json({
                message: `No ingreso el campo ${camposVacios.nombre}`,
                code: -1
            });
        }

        const respuesta = await Equipo.agregarEquipo(id , nombreEquipo, directorTecnico, capitan)
        const marcador = await Marcadores.agregarMarcador(id , 0, 0, 0, 0)

        console.log(marcador)

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





router.get('/getAllEquipo', async (req , res) => {
    try {
        
        const respuesta = await Equipo.consultarEquipo();

        console.log(respuesta)
    
        res.status(200).json({
             respuesta
        })
    
        } catch (error) {
                    console.log(error)
    
        }
})

module.exports = router