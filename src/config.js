"use strict";

require("dotenv").config();

global.SALT_KEY = process.env.SALT_KEY;
global.EMAIL_TMPL = "<strong>{0}</strong>";

module.exports = {
    connectionString: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zqvrb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    sendgridKey: 'TBD',
    containerConnectionString: 'TBD'
}