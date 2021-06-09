import Firebase from './firebaseConfig';

export const submitPost = async (Id,uid, title, details, image) => {
    return new Promise(function (resolve, reject) {
        let key;
        if (Id != null) {
            key = Id;
        } else {
            key = Firebase.database().ref().push().key;
        }

        const uuid = Firebase.auth().currentUser.uid;

        let dataToSave = {
            Id: key,
            uid:uuid,
           title:title,
           details:details,
           image:image
        };

        Firebase
            .database()
            .ref('usersGallery/ newest /' + uuid)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};


export const PhotoGallary = async( image, uid) => {

    try {
        return await Firebase
        .database()
        .ref('usersGallery/ newest /' + uid).
            update({
              
                image: image,
               
            });
    } catch (error) {
        return error;
    }
}

export const submitOldPost = async (Id,uid, title, details, image) => {
    return new Promise(function (resolve, reject) {
        let key;
        if (Id != null) {
            key = Id;
        } else {
            key = Firebase.database().ref().push().key;
        }

        const uuid = Firebase.auth().currentUser.uid;

        let dataToSave = {
            Id: key,
            uid:uuid,
           title:title,
           details:details,
           image:image
        };

        Firebase
            .database()
            .ref('usersGallery/ closed /' + uuid)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};


export const oldGallary = async( image, uid) => {

    try {
        return await Firebase
        .database()
        .ref('usersGallery/ closed /' + uid).
            update({
              
                image: image,
               
            });
    } catch (error) {
        return error;
    }
}