const Joi = require('joi');
const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  }
});

const Phase = mongoose.model('Phase', phaseSchema);

function validatePhase(phase) {
  const schema = {
    name: Joi.string().min(1).max(50).required()
  };

  return Joi.validate(phase, schema);
}

exports.phaseSchema = phaseSchema;
exports.Phase = Phase; 
exports.validate = validatePhase;