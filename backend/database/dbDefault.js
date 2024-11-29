const createTableQueries = {
    cadastros : `
    CREATE TABLE usuarios (
       id int PRIMARY KEY AUTO_INCREMENT NOT NULL,
       nome VARCHAR(100) NOT NULL,
       idade INT NOT NULL,
       email VARCHAR(150) NOT NULL,
   );
   `
};

module.exports = createTableQueries;
