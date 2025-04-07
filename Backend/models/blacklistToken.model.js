//hmm ek document create krr rhe hai jisme hmm logout hone waale users ke token daaldenge with TTL(time to live)
//mtlb document apne aap delete ho jaate hai ek particular time ke baad jo hmne diya hoga

const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);

module.exports = BlacklistToken;