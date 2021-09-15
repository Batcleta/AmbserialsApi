
module.exports = (DataTypes, dbConnection) => {

    const table = `LICENCAS${'_'}CLIENTE`

    // Criando ou sincronizando as tabelas
    const ambiTab = dbConnection.define(table, {
        // Deffino uma table com o nome de tutorial e passo os campos
        PK_SERIAL: {
            // Parametros de cada campo
            type: DataTypes.STRING(15),
            primaryKey: true
        },
        CNPJ_CPF: {
            // Parametros de cada campo
            type: DataTypes.STRING(14)
        },
        RAZAO_SOCIAL: {
            type: DataTypes.STRING(64)
        },
        STATUS: {
            type: DataTypes.STRING(1)
        },
        VALIDADE: {
            type: DataTypes.DATEONLY
        },
        TOLERANCIA: {
            type: DataTypes.STRING(2)
        },
        MOTIV_BLOQUEIO: {
            type: DataTypes.STRING
        },
        NUM_TERMINAIS: {
            type: DataTypes.INTEGER(11)
        },
        OBSERVACOES: {
            type: DataTypes.STRING
        },
        ULTIMA_VALID: {
            type: DataTypes.DATEONLY
        },
        VERSAO_PDV: {
            type: DataTypes.STRING(32)
        },
    })
    return ambiTab
}

