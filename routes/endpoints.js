const sqlite = require('../database.js')

const standardFormat = where => {
    const format = `
        SELECT candidato.nome, cargo.nome as cargo, sum(votacao.votos) as votos,
        candidato.status
        FROM candidato 
        INNER JOIN cargo ON candidato.cargo = cargo.id
        INNER JOIN votacao ON candidato.id = votacao.candidato and
        candidato.cargo = votacao.cargo
        LEFT JOIN partido ON candidato.nome = partido.nome
        ${where}
        AND candidato.nome NOT IN ('Nulo', 'Branco')
        AND partido.nome IS NULL
        GROUP BY candidato.nome
        ORDER BY candidato.nome;
    `
    return format
}

const candidates = name => {
    const nameCand = name.toUpperCase()
    const sql = standardFormat(`WHERE candidato.nome like '${nameCand}%'`)

    return databaseQuery(sql)
}

const offices = office => {
    const sql = standardFormat(`WHERE cargo.nome like '%${office}%'`)
    return databaseQuery(sql)
}

const cities = city => {
    const where = `WHERE votacao.municipio = 
        (SELECT id FROM municipio WHERE nome LIKE '%${city.toUpperCase()}%')`
    const sql = standardFormat(where)

    return databaseQuery(sql)
}

const overallResult = search => {
    const sql = standardFormat(`WHERE candidato.nome NOT IN ('maycon', 'douglas')`)
    return databaseQuery(sql)
}



function databaseQuery(sql) {
    return new Promise((resolve, reject) => {
        sqlite.dataBase.all(
            sql,
            (error, rows) => {
                if (error) {
                    reject(error)
                }

                const data = rows.map((cand) => {
                    return {
                        name: cand.nome,
                        office: cand.cargo,
                        votes: cand.votos,
                        status: cand.status === 1 ? 'Eleito' : 'Não eleito' 
                    }
                })
                
                resolve(data)
            }
        )
    })   
}

module.exports = {
    candidates,
    offices,
    cities,
    overallResult
}