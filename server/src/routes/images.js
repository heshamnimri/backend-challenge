const _ = require('lodash');
const Router = require('koa-router');
const uuid = require('uuid-v4');
const { uploadImage, getImages } = require('../firebase/image-service');

const { FirebaseAdmin, FirebaseBucket } = require('../firebase/firebase')

const router = new Router();


router.post('/images', async (ctx) => {
    const { uid, name, privacy} = ctx.request.body;
    const file = ctx.request.files.image;
    let private;

    if (privacy === 'private'){        
        private = true
    } else {
        private = false
    }

    const params = {
        uid,
        name,
        file,
        private
    }

    const { status, body } = await uploadImage(params)

    ctx.body = body;
    ctx.status = status;
});

router.get('/images', async (ctx) => {

    // add ensureer here
    const { status, body } = await getImages()
    
    ctx.response.set('x-total-count', body.length.toString());
    ctx.body = body;
    ctx.status = status;
});

module.exports = router