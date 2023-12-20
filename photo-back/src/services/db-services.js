const { getConnection } = require("../database/mysql-connection");
const db = getConnection();

module.exports = {
    async getUserByEmail(email) {
        const statement = `
        SELECT email FROM users WHERE users.email = ?`;
        const [rows] = await db.execute(statement, [email]);
        return rows[0];
    },

    async getUserById(idUser) {
        const statement = `
        SELECT id, userName
        FROM users
        WHERE id = ?`;
        const [rows] = await db.execute(statement, [idUser]);
        return rows[0];
    },

    async saveUser(user) {
        const statement = `
        INSERT INTO users(
            id, email, nickName, password, role, acceptedTOS
        )`;
        const [rows] = await db.execute(statement, [
            user.id,
            user.nickName,
            user.password,
            user.role,
            user.acceptedTOS,
        ]);
        return rows;
    },
};
