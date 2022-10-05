const db = require('../models/pawrentsModel.js');

const petController = {};

//CREATE A PET
petController.createPet = async (req, res, next) => {
  console.log('inside petController.createPet');
  try {
    const { name, age, weight, species, breed, image_url, price, bio } = req.body;

    const values = [ name, age, weight, species, breed, image_url, price, bio ];
    const queryString = 'INSERT INTO pet (name, age, weight, species, breed, image_url, price, bio) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
    const data = await db.query(queryString, values);

    res.locals.pet = await data.rows[0];
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in petController.createPet',
      message: { err: 'petController.createPet: check server log for details' }
    });
  }
}

//READ
//get all pets to retrieve all Pets in DB
petController.getAllPets = async (req, res, next) => {
  console.log('inside petController.getAllPets');
  try {
    const queryString = 'SELECT * FROM pet';
    const data = await db.query(queryString);

    res.locals.pets = data.rows;
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in petController.getAllPets',
      message: { err: 'petController.getAllPets: check server log for details' }
    });
  }
}

// get a pet
petController.getAPet = async (req, res, next) => {
  console.log('inside petController.getAPet');
  try {
    const queryString = `SELECT * FROM pet WHERE _id = '${req.params.id}'`;
    const data = await db.query(queryString);
    
    res.locals.pet = data.rows[0];
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in petController.getAPet',
      message: { err: 'petController.getAPet: check server log for details' }
    });
  }
};

//UPDATE PET (Currently only bio can be updated)
petController.updatePet = async (req, res, next) => {
  console.log('inside petController.updatePet');
  try {
    const { id } = req.params;
    const { bio } = req.body;
    const queryString = `
      UPDATE pet 
      SET bio = '${bio}'
      WHERE _id = '${id}'
      RETURNING *;
    `;
    const data = await db.query(queryString);

    res.locals.pet = data.rows[0];
    return next();   
  } catch (error) {
    return next({
      log: 'Express error handler caught error in petController.updatePet',
      message: { err: 'petController.updatePet: check server log for details' }
    });
  }
};

//DELETE PET
petController.deletePet = async (req, res, next) => {
  console.log('inside petController.deletePet');
  try {
    const { id } = req.params;
    const queryString = `
      DELETE
        FROM pet
        WHERE _id = '${id}'
        RETURNING *;
    `;
    const data = await db.query(queryString);
    
    res.locals.pet = data.rows[0];
    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught error in petController.deletePet',
      message: { err: 'petController.deletePet: check server log for details' }
    });
  }
};



module.exports = petController;