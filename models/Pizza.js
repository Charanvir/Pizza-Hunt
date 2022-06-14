const { Schema, model } = require("mongoose");

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
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
            virtuals: true
        },
        // because it is a virtual
        id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

// create the Pizza model using the PizzaSchema

const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;