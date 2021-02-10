const Joi = require('joi');
const mongoose = require('mongoose');


const Movie = mongoose.model('Movies', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 2,
    maxlength: 255
  },
  phase:{
    type:String,
    required: true,
    trim:true,
    minlength:7,
    maxlength:8
  },
  order: {
    type:Number,
    required: true
  },
  characters: {
    type:Array,
    required: true,
    trim:true,
    minlength:1,
    maxlength:50
  },
  runtime: {
    type:Number,
    required: true,
    trim:true
  },
  releaseYear: {
    type:String,
    required: true,
    trim:true,
    minlength:4,
    maxlength:4
  },
  description: {
    type:String,
    required: true,
    trim:true,
    minlength:5,
    maxlength:5000
  },
  liked: {
    type:Boolean,
    required: true
  },
  picture: {
    type:String,
    required: true,
    trim:true
  }
}));

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(2).max(50).required(),
    phase: Joi.string().min(7).max(8).required(),
    order: Joi.number().required(),
    characters: Joi.array().min(1).max(255).required(),
    runtime: Joi.number().required(),
    releaseYear: Joi.string().min(4).max(4).required(),
    description: Joi.string().min(5).max(5000).required(),
    liked: Joi.bool().required(),
    picture: Joi.string().required()
  };

  return Joi.validate(movie, schema);
}


exports.Movie = Movie; 
exports.validate = validateMovie;