const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');


describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        // Create a new ObjectId and convert it to a string
        const objectId = new mongoose.Types.ObjectId();
        const payload = {_id: objectId.toHexString(), isAdmin: true};
        const user = new User(payload);
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    })
})


