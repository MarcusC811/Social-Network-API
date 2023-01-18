const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thought');
const emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return emailRegex.test(v);
                },
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User =model('user', userSchema);

module.exports = User;