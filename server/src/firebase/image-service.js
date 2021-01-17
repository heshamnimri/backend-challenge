const _ = require('lodash');
const uuid = require('uuid-v4');
const { FirebaseBucket, Firestore } = require('../firebase/firebase')

async function uploadImage(file, uid) {
    let status, body

    const metadata = {
        uuid: uuid(),
        uid,
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000',
    };
    
    try {
        await FirebaseBucket.upload(file.path, {
            destination: `${'images/'+file.name}`,
            gzip: true,
            metadata: metadata
        }).then( async (res) => {
            await Firestore.doc().set({
                name: file.name,
                downloadURL: "test",
                keywords: ['car'],
                private: false,
                userId: 1
            }).then( (res) => {
                status = 200;
                body = `sucessfully uploaded ${file.name}`;
            })
        })
    } catch (err){
        console.log(err)
        status = 500;
        body = "failed uploading image";
    }

    return { status, body }
}

async function getImages (){
    let body = []

    const files = await FirebaseBucket.getFiles()

    if (files.length){
        for (const file of files) {
            const signedURL =  await file[1].getSignedUrl({
                action: 'read', 
                expires: '03-09-2491'
            })
            if (signedURL.length){
                body.push(signedURL[0])
            } else {
                body = `Error pulling image ${file[1].name}`
                status = 500
            }
        }
        status = 200
        
    } else {
        body = 'No images found'
    }

    return { body, status }
}

module.exports = { uploadImage, getImages }


