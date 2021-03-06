const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
        required: "You need to provide a pizza name!",
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        required: true,
        // enumerable, refers to a set of data that can be iterated over
        enum: ['Personal', 'Small', 'Medium', 'Large', "Extra Large"],
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            // ref tells the Pizza model which documents to search adn find the right comments
            ref: "Comment"
        }
    ]
},
    // added to tell the schema that it can use virtuals
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // because it is a virtual
        id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the Pizza model using the PizzaSchema

const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;