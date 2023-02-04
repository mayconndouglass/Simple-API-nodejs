const sqlite = require('../database.js')

const candidates = name => {
    const nameCand = name.toUpperCase()
    const sql = `
        SELECT candidato.nome, cargo.nome as cargo, sum(votacao.votos) as votos,
        candidato.status
        FROM candidato 
        INNER JOIN cargo ON candidato.cargo = cargo.id
        INNER JOIN votacao ON candidato.id = votacao.candidato
        WHERE candidato.nome like '${nameCand}%'
        GROUP BY candidato.nome;
    `

    return databaseQuery(sql)
}

const offices = office => {
    const sql = `
        SELECT candidato.nome, cargo.nome as cargo, sum(votacao.votos) as votos,
        candidato.status
        FROM candidato 
        INNER JOIN cargo ON candidato.cargo = cargo.id
        INNER JOIN votacao ON candidato.id = votacao.candidato
        WHERE cargo.nome like '%${office}%'
        GROUP BY candidato.nome;
    `
    
    return databaseQuery(sql)
}

function databaseQuery(sql) {    
    /* console.log('sql')
    console.log(sql) */
    return new Promise((resolve, reject) => {
        sqlite.dataBase.all(
            sql,
            (error, rows) => {
                if (error) {
                    reject(error)
                }
                
                console.log('log rows');
                console.log(rows)

                const data = rows.map((cand) => {
                    return {
                        name: cand.nome,
                        office: cand.cargo,
                        votes: cand.votos,
                        status: cand.status === 1 ? 'Eleito' : 'Não eleito' 
                    }
                })

                console.log('log do endpoint');
                console.log(data)
                
                resolve(data)
            }
        )
    })   
}

module.exports = {
    candidates,
    offices
}