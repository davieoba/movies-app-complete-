const mongoose = require('mongoose')
require('dotenv').config({
  path: './../.env'
})
const Movie = require('./../models/movies')
const fs = require('fs')

// const DB = process.env.LOCAL_DB;

const DB_2 = process.env.CLOUD_DB
console.log(DB_2)
mongoose
  .connect(DB_2)
  .then(() => {
    console.log('connected to the DB successfully')
  })
  .catch((err) => console.log(err))

const moviesFile = JSON.parse(fs.readFileSync('./movies-data.json', 'utf-8'))

async function data() {
  if (process.argv[2] === '--import') {
    await importDevData()
    console.log('data imported successfully')
    process.exit()
  } else if (process.argv[2] === '--delete') {
    await deleteDevData()
    console.log('data deleted successfully')
    process.exit()
  }
}

async function importDevData() {
  try {
    const Movies = await Movie.create(moviesFile)
  } catch (err) {
    console.log(err)
  }
}

async function deleteDevData() {
  try {
    await Movie.deleteMany()
  } catch (err) {
    console.log(err)
  }
}

data()
