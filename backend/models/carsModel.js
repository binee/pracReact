const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    car: {
        type: String,
        trim:true,
        required: true,
    },
    model: {
        type: String,
        trim:true,
        required: true,
    },
    year: {
        type: String,
        trim:true,
        required: true
    },
    image:{
        type: String,
        trim:true,  
        required: true
    },
    description: {
        type: String,
        trim:true,
        lowercase:true,
        required: true
    },
    owners: [
        {
          _id: false,
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
          name: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            default: 'admin',
          },
        },
      ],
      memebers: [
        {
          _id: false,
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
          },
          name: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            default: 'admin',
          },
        },
      ],
      //Once carBuyer flag is true
      sellFlag: {
        type: Boolean,
        required: true,
        default: true,
      },
      BuyerFlag: {
        type: Boolean,
        required: true,
        default: false,
      },
},
    {
        timestamps: true,
      });
const Car = mongoose.model('car', carSchema);
module.exports = Car;