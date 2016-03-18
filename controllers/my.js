'use strict';
var Account = require('./../models/account'),
    Thing = require('./../models/thing'),
    Token = require('./../models/authentication'),
    winston = require('winston');

/**
 * @api {get} /my/account Returns authenticated account
 * @apiDescription Returns authenticated account
 * @apiName GetAccount
 * @apiGroup My
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer User unique access-key.
 *
 *
 * @apiSuccess (200) {String} _id   Id of the User.
 * @apiSuccess (200) {String} email  E-mail of the User.
 * @apiSuccess (200) {String} role  Role of the User.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "_id": "5682773c21ba9d9736e8237b",
 *  "email": "test@test.test",
 *  "role": "USER",
 *  "createdAt": "2016-03-04 20:09:24.000Z",
 *  "updatedAt": "2016-03-04 20:09:24.000Z"
 * }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.getAccount = (req, res)=> {
    Account.findOne()
        .where('_id').equals(req.user._id)
        .then((data)=> {
            res.send(data.profil);
        })
        .catch((err)=> {
            winston.debug('GET /my/account when finding account', err);
            res.statusStatus(500);
        });
};
/**
 * @api {get} /my/things Returns all things related to authenticated account
 * @apiDescription Returns all things related to authenticated account
 * @apiName GetThings
 * @apiGroup My
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer User unique access-key.
 *
 *
 * @apiSuccess (200) {String} _id   Id of the Thing.
 * @apiSuccess (200) {String} name  Name of the Thing.
 * @apiSuccess (200) {String} owner  Owner of the Thing.
 * @apiSuccess (200) {String} type  Type of the Thing.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "_id": "5682773c21ba9d9736e8237b",
 *  "name": "Temperature sensor",
 *  "owner": "5682773c21ba9d9736e8237b"
 *  "type": "RECEPTOR",
 *  "createdAt": "2016-03-04 20:09:24.000Z",
 *  "updatedAt": "2016-03-04 20:09:24.000Z"
 * }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.getThings = (req, res)=> {
    Thing.find()
        .where('owner').equals(req.user._id)
        .then((data)=> {
            res.send(data);
        })
        .catch((err)=> {
            winston.debug('GET /my/things when finding things', err);
            res.sendStatus(500);
        })
};

/**
 * @api {get} /my/things/count Returns number of things related to authenticated account
 * @apiDescription Returns number of things related to authenticated account
 * @apiName countMyThings
 * @apiGroup My
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer User unique access-key.
 *
 *
 * @apiSuccess (200) {Number} things  Number of things related to authenticated account.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "things": 8
 * }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.countMyThings = (req, res)=> {
    Thing.count()
        .where('owner').equals(req.user._id)
        .then((data)=> {
            res.send({things: data});
        })
        .catch((err)=> {
            winston.debug('GET /my/things when finding things', err);
            res.sendStatus(500);
        })
}
;

/**
 * @api {get} /my/tokens Returns all tokens related to authenticated account
 * @apiDescription Returns all tokens related to authenticated account
 * @apiName GetTokens
 * @apiGroup My
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer User unique access-key.
 *
 * @apiSuccess (200) {String} _id   Id of the Token.
 * @apiSuccess (200) {String} content  Content of the Token.
 * @apiSuccess (200) {String} owner  Owner id of the Token.
 * @apiSuccess (200) {Boolean} valid  Validation of the Token.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "_id": "5682773c21ba9d9736e8237b",
 *  "content": "c21ba9d9736e8237b.c21ba9d9736e8237b.c21ba9d9736e8237b",
 *  "owner": "5682773c21ba9d9736e8237b"
 *  "valid": true,
 *  "createdAt": "2016-03-04 20:09:24.000Z",
 *  "updatedAt": "2016-03-04 20:09:24.000Z"
 * }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.getTokens = (req, res)=> {
    Token.find()
        .where('ownerId').equals(req.user._id)
        .then((data)=> {
            res.send(data);
        })
        .catch((err)=> {
            winston.debug('GET /my/tokens when finding tokens', err);
            res.sendStatus(500);
        })
};

/**
 * @api {get} /my/tokens/count Returns number of tokens related to authenticated account
 * @apiDescription Returns  number of tokens related to authenticated account
 * @apiName countMYTokens
 * @apiGroup My
 *
 * @apiPermission user
 * @apiHeader {String} Authorization bearer User unique access-key.
 *
 * @apiSuccess (200) {Number} tokens  Number of tokens related to authenticated account.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *  "tokens": 8,

 * }
 *
 * @apiError (401) Unauthorized Unauthorized.
 * @apiError (404) NotFound Not Found.
 * @apiError (500) InternalServerError Internal Server Error.
 */
exports.countMyTokens = (req, res)=> {
    Token.count()
        .where('ownerId').equals(req.user._id)
        .then((data)=> {
            res.send({tokens: data});
        })
        .catch((err)=> {
            winston.debug('GET /my/tokens when finding tokens', err);
            res.sendStatus(500);
        })
};
