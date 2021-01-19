const _ = require('lodash');
const Router = require('koa-router');
const uuid = require('uuid-v4');
const { uploadImage, getImages, deleteImages} = require('../firebase/image-service');

const { FirebaseAdmin, FirebaseBucket } = require('../firebase/firebase')

const router = new Router();

// Path for uploading images
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

router.post('/images/delete', async (ctx) => {
    const { images } = ctx.request.body;
    let status, body

    if ( images && Array.isArray(images)){
        status, body  = await deleteImages(images)
    } else {
        status = 500
        body = 'Error: invalid input - input not an array or empty'
    }

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