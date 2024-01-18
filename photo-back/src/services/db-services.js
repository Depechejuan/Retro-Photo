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
                id, email, nickName, password, acceptedTOS
            )
            VALUES (?, ?, ?, ?, ?)`;
        const [rows] = await db.execute(statement, [
            user.id,
            user.email,
            user.nickname,
            user.password,
            user.acceptedTOS,
        ]);
        return rows;
    },

    // revisar logica
    async editUser(idUser, data) {
        const statement = `
            UPDATE users
                SET name = ?, lastName = ?, birthday = ?, country = ?, city = ?, avatarURL = ?, role = ?, modifiedAt = ?
            WHERE id = ?`;
        const [rows] = await db.execute(statement, [
            data.name ?? null,
            data.lastname ?? null,
            data.birthday ?? null,
            data.country ?? null,
            data.city ?? null,
            data.avatarURL ?? null,
            data.role ?? null,
            data.modifiedAt,
            idUser,
        ]);
        return rows;
    },
};
