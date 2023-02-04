const sqlite = require('../database.js')

function searchCandidates(name) {
    // const name = request.body.name.toUpperCase()
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

/*     const sql = `
        SELECT candidato.nome, SUM(votacao.votos) as total_votos
        FROM candidato
        INNER JOIN votacao ON candidato.id = votacao.candidato
        WHERE candidato.nome like '${nameCand}%'
        GROUP BY candidato.nome;
    ` */

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
                        cargo: cand.cargo,
                        votos: cand.votos,
                        status: cand.status === 1 ? 'Eleito' : "Não eleito" 
                    }
                })

                console.log('log do endpoint');
                console.log(data)
                
                resolve(data)
            }
        )
    })


    console.log(sql)

        
}

module.exports = {
    searchCandidates
}