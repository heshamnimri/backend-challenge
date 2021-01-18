const _ = require('lodash');
const uuid = require('uuid-v4');
const { FirebaseBucket, Firestore } = require('../firebase/firebase')

async function uploadImage(params) {
    const { uid, name, file, private } = params
    let status, body

    const metadata = {
        uuid: uuid(),
        uid,
        contentType: 'image/png', //make jpg or png
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
                title: name,
                downloadURL: await res[0].getSignedUrl({
                    action: 'read', 
                    expires: '03-09-2491'
                }),
                keywords: ['car'],
                private: private,
                uid: uid ? uid : 1,
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
    console.log('UPLOAD_IMAGE')
    return { status, body }
}

async function getImages (){
    let status
    let body = []

    const files = (await FirebaseBucket.getFiles())[0]
    files.shift()

    if (files.length){
        for (const file of files) {
            const signedURL =  await file.getSignedUrl({
                action: 'read', 
                expires: '03-09-2491'
            })
            if (signedURL.length){
                body.push({
                    src: signedURL[0],
                    title: file.name, 
                    subtitle: 'user'
                })
            } else {
                body = `Error pulling image ${file.name}`
                status = 500
            }
        }
        status = 200
        
    } else {
        body = 'No images found'
    }
    console.log('GET_IMAGE')
    return { body, status }
}

module.exports = { uploadImage, getImages }
