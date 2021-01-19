const _ = require('lodash');
const uuid = require('uuid-v4');
const { FirebaseBucket, Firestore } = require('../firebase/firebase')

async function deleteImages(images) {
    let status, body

    try {
        const res = await Promise.all(
            images.map(
                async image => {
                    const file = FirebaseBucket.file('images/'+image)
                    // const file = FirebaseBucket.file(`${uid}/${image}`)
                    if (file) {
                        const res = await file.delete()
                    } else { 
                        throw 'image does not exist'
                    }
                }
            )
        )    
        status = 200
        body = `deleted: ${images.join(',')}`
    } catch (err){
        console.log(err)
        status = 500;
        body = `failed uploading image. Error" ${err}`;
    }
    return { status, body }
}

async function uploadImage(params) {
    const { uid, name, file, private } = params
    let status, body

    const uuid = {
        uuid: uuid(),
        uid,
        contentType: 'image/png', //make jpg or png
        cacheControl: 'public, max-age=31536000',
    };
    
    try {
        await FirebaseBucket.upload(file.path, {
            //update structure to make folders for users based on uid
            // destination: `${uid}'/'${+metadata.uuid}`,
            destination: `${'images/'+metadata.uuid}`,
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

module.exports = { uploadImage, getImages, deleteImages }
