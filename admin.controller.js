import {selectAll, select, insert, update, erase } from "./crud.globalController.js";

export const dataGetAll = async(req, res) => {
    try {
        const {table} = req.body;
        const [rows] = await selectAll('*', table);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message:"We have technical dificulties" + error
        });  
    }
}

export const dataGet = async (req,res) => {
    try {
        const {data, cond, where} = req.body;
        const [rows] = await select('*', data, cond, where);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message:"We have technical dificulties" + error
        });
    }
}

export const dataInsert = async (req, res) => {
    try {
        const {type, data} = req.body;
        const [rows] = await insert(type, data);
        res.send(rows);
    } catch (error) {
        return res.status(500).json({
            message:"We have technical dificulties" + error
        });
    }
}

export const dataUpdate = async (req, res) => {
    try {
        const {type, arrayColumns, data, condicional, where} = req.body;
        const [rows] = await update(type, arrayColumns, data, condicional, where);
        res.send(rows);
    } catch (error) {
        return res.status(500).json({
            message:"We have technical dificulties" + error
        });
    }
}

export const dataDelete = async (req, res) => {
    try {
        const {type, condicional, where} = req.body;
        const [rows] = await erase (type, condicional, where);
        res.send(rows);
    } catch (error) {
        return res.status(500).json({
            message:"We have technical dificulties" + error
        });
    }
}