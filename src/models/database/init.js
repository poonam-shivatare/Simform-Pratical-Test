const user = require('./user');         // database user


////////////////////////
//   initialization   //
////////////////////////

const initTablesViewsAndFunctions = async () => {

    ///////////////////
    //     table     //
    ///////////////////

    return user.initTableUser();
}



module.exports = { initTablesViewsAndFunctions };