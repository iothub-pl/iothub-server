'use strict';
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    validator = require('validator'),
    uniqueValidator = require('mongoose-unique-validator');
var AccountSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        require: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid e-mail!'
        }
    },
    salt: {
        type: String,
        select: false,
        require: true
    },
    /**
     * TODO validate password
     */
    password: {
        type: String,
        select: false,
        require: true
    },
    /**
     * @todo need to think about it, how to design authorization
     */
    role: {
        type: Number,
        default: 0
    }
});
AccountSchema.virtual('token')
    .get(function () {
        return {
            _id: this._id
        };
    });
AccountSchema.virtual('profil')
    .get(function () {
        return {
            _id: this._id,
            email: this.email,
            role: this.role
        };
    });

AccountSchema.methods = {
    /**
     * @returns {*}
     */
    getEmail: function () {
        return this.get('email');
    },
    /**
     * @param {String} email
     * @returns {*}
     */
    setEmail: function (str) {
        return this.set('email', str);
    },
    /**
     * @returns {*}
     */
    getRole: function () {
        return this.get('role');
    },
    /**
     * @param {Number} role
     * @returns {*}
     */
    setRole: function (role) {
        return this.set('role', role);
    },
    /**
     * @returns {*}
     */
    generateSalt: function () {
        return this.set('salt', crypto.randomBytes(16)
            .toString('base64'));
    },
    /**
     * @returns {*}
     */
    getSalt: function () {
        if (!this.salt) return this.generateSalt().getSalt();
        else return this.get('salt');
    },
    /**
     * @param {String} password
     * @returns {*}
     * @todo przetestować
     */
    encryptPassword: function (password) {
        if (typeof(password) !== "string") {
            password = '';
        }
        return crypto
            .pbkdf2Sync(password, new Buffer(this.getSalt(), 'base64'), 10000, 64)
            .toString('base64');
    },
    /**
     * @returns {*}
     */
    getPassword: function () {
        return this.get('password');
    },
    /**
     * @param {String} password
     * @returns {*}
     */
    setPassword: function (password) {
        return this.set('password', this.encryptPassword(password));
    },
    /**
     * @param {String} password
     * @returns {boolean}
     */
    authenticate: function (password) {
        return this.encryptPassword(password) === this.getPassword();
    }
};
AccountSchema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});
AccountSchema.post('save', function () {
    if (this.wasNew) {
    }
});
AccountSchema.plugin(uniqueValidator);
/**
 * @type {*|Model|Aggregate}
 */
module.exports = mongoose.model('Account', AccountSchema);