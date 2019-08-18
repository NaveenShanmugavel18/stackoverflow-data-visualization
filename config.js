require('dotenv').config()

const url = `mongodb://${encodeURIComponent(process.env.DB_USER_NAME)}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

module.exports = {
	url: url
}