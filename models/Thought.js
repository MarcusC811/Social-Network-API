const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

function formatDate (v) {
    const timeStamp = new Date(v * 1000);;
    return timeStamp.toLocaleString();
}

const Thought = model('thought', thoughtsSchema);

module.exports = Thought;
