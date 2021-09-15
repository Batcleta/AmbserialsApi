const dbConfig = require('../server/02-config')
const Db = dbConfig.AmbAseSync
const Op = dbConfig.Sequelize.Op

const serialando = require('./serial')

exports.create = (req, res) => {

    // Validando a request
    if (!req.body.RAZAO_SOCIAL) {
        res.status(400).send({ Message: 'RAZAO_SOCIAL Cannot be Empty' })
        return
    }
    const serialFinal = serialando.gerarSerial()

    const getDate = data => {
        let resDate = new Date(data)
        let newDate = new Date()
        newDate.setDate((resDate.getDate() + 1) + 365)

        const yearDate = newDate.getFullYear()
        const monthDate = newDate.getMonth() + 1
        const dayDate = newDate.getDate()

        return `${yearDate}-${monthDate}-${dayDate}`
    }

    const setStatus = data => {

        let status = ''

        switch (data) {
            case 'Ativo': status = 'A'
                break

            case 'Inativo': status = 'I'
                break

            case 'Bloqueado': status = 'B'
                break

            default: status = 'I'
        }

        return status

    }

    //Criando um novo cliente
    const dbData = {

        RAZAO_SOCIAL: req.body.RAZAO_SOCIAL,
        CNPJ_CPF: req.body.CNPJ_CPF,
        VALIDADE: getDate(req.body.CONTR_DATE),
        STATUS: setStatus(req.body.STATUS),
        OBSERVACOES: req.body.OBSERVACOES,
        NUM_TERMINAIS: req.body.NUM_TERMINAIS,
        RAZAO_SOCIAL: req.body.RAZAO_SOCIAL,
        PK_SERIAL: serialFinal,
        TOLERANCIA: '14'
    }

    // save in db
    // inputa na tabela os dadod do objeto tutorial
    Db.create(dbData)
        .then(data => {
            res.send(data)
        })
        .catch(err => res.status(500).send({
            message: err.message || 'error'
        })
        )

}

exports.findAll = (req, res) => {

    const { page } = req.query
    const pageSize = 12

    const { pesquisa } = req.query
    let condition = pesquisa ? { RAZAO_SOCIAL: { [Op.like]: `%${pesquisa}%` } } : null

    const getPagination = (page, size) => {
        const limit = size ? +size : 10
        const offset = page ? page * limit : 0
        return { limit, offset }
    }

    const { limit, offset } = getPagination(page, pageSize)

    const getPagingData = (data, page, limit) => {
        const { count: totalItems, rows: clients } = data
        const currentPage = page ? +page : 0
        const totalPages = Math.ceil(totalItems / limit)
        return { totalItems, clients, totalPages, currentPage }
    }

    Db.findAndCountAll({
        limit,
        offset,
        where: condition
    })
        .then(data => {
            const response = getPagingData(data, page, limit)
            res.send(response)
        })
        .catch(err => res.status(500).send({
            message: err.message || 'Error'
        }))

};

exports.findOne = (req, res) => {
    const id = req.query.id

    Db.findByPk(id)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || 'Error'
        }))
};


exports.update = (req, res) => {
    const id = req.query.id

    Db.update(req.body, { where: { PK_SERIAL: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: 'Updated sussesfulluy' })
            } else {
                res.send({ message: `cannot updated id ${id} not found or empty` })
            }
        })
        .catch(err => res.status(500).send({
            message: err.message || `Errod on ${id}`
        }))

};


// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const { PK_SERIAL } = req.query

    Db.destroy({ where: { PK_SERIAL: PK_SERIAL } })
        .then(num => {
            if (num == 1) {
                res.send({ message: 'Updated sussesfulluy' })
            } else {
                res.send({ message: `cannot updated id ${PK_SERIAL} not found or empty` })
            }
        })
        .catch(err => res.status(500).send({
            message: err.message || `Errod on ${PK_SERIAL}`
        }))
};