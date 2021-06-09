import Firebase from './firebaseConfig';

export const submiInstitute = (uid,InstituteName, InstituteId) => {
    return new Promise(function (resolve, reject) {   

        const uuid = Firebase.auth().currentUser.uid;

        let dataToSave = {
            Aid: uuid,
            InstituteId:InstituteId,
            InstituteName:InstituteName
            
        };

            Firebase
            .database()
            .ref('institutes/' + InstituteId)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};



export const submitTeam = (Id, uid, Name, Coach, Structure, Sport,InstituteName, InstituteId) => {
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
            uid: uuid,
            Name: Name,
            Coach: Coach,
            Structure: Structure,
            Sport: Sport,
            InstituteId:InstituteId,
            InstituteName:InstituteName
            
        };

        Firebase
            .database()
            .ref('teams/' + key)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });

            Firebase
            .database()
            .ref('institutes/' + InstituteId +'/'+key)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};



export const AddPlayers = async ( tid,playerName,pid) => {
    try {
       
        return await Firebase
            .database()
            .ref('teams/' + tid).
           child('players/'+pid).
            update({
               
               playerName:playerName,
                playerId:pid

            });
    } catch (error) {
        return error;
    }
}


export const submitCoach = (Id, uid, FullName, CAddress, DOB, TPNumber, Gender, Sport) => {
    return new Promise(function (resolve, reject) {
        let key;
        if (Id != null) {
            key = Id;
        } else {
            key = Firebase.database().ref().push().key;
        }

        const uuid = Firebase.auth().currentUser.uid;

        let dataToSave = {
            uuid: Id,
            uid: uuid,
            FullName: FullName,
            CAddress: CAddress,
            DOB: DOB,
            TPNumber: TPNumber,
            Gender: Gender,
            Sport: Sport

        };

        Firebase
            .database()
            .ref('coaches/' + Id)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};


export const submitTourlement = (Id, uid, TourlementName, Sport, Status) => {
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
            uid: uuid,
            TourlementName: TourlementName,
            Sport: Sport,
            Status: Status
        };

        Firebase
            .database()
            .ref('tourelements/' + key)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const UpdateTourlementFixtures = async (remainingFixture, uid) => {
    try {
        return await Firebase
            .database()
            .ref('tourelements/' + uid).
            child('fixtures/').
            update({
               
                remainingFixture: remainingFixture,

            });
    } catch (error) {
        return error;
    }
}

