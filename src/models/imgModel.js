const mongoose = require('mongoose')

const imgSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
	url: {
		type: String,
		required: true
	  },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Img', imgSchema)