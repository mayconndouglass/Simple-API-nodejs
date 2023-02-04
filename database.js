const sqlite = require('sqlite3')

const dataBase = new sqlite.Database('./eleicoes2022-pi.db', (error) => {
    if(error) {
        console.log(error.message)
    }
})

module.exports = {
    dataBase
}
