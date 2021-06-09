import Firebase from './firebaseConfig';

export const submitStructure = (Id,uid, name, color, todos) => {
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
            name: name,
            color: color,
            todos: todos
        };

        Firebase
            .database()
            .ref('tourlementStructures/' + key)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });

        // Firebase
        //     .firestore()
        //     .collection("coaches")
        //     .doc(this.userId)
        //     .collection("lists")
        //     ({
        //         name: list.name,
        //         color: list.color,
        //         todos: []
        //     });
    });
};



