import Firebase from './firebaseConfig';

export const submitFixtures = (Id,uuid, TourlementName, ongoing, remaining,
    completed, color, fixtures) => {
    return new Promise(function (resolve, reject) {

        let key;
        if (Id != null) {
            key = Id;
        } else {
            key = Firebase.database().ref().push().key;
        }
        
        let  keys = Firebase.database().ref().push().key;
     

        const uuid = Firebase.auth().currentUser.uid;

        let dataToSave = {
            uid: uuid,
            Id:Id,
            TourlementName: TourlementName,
            ongoing: ongoing,
            remaining: remaining,
            completed: completed,
            color: color,
            fixtures: fixtures
        };

        Firebase
            .database()
            .ref('fixtures/' + Id)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const updateFixtures = (Id,uuid, TourlementName, ongoing, remaining,
    completed, color) => {
    return new Promise(function (resolve, reject) {

     

        const uuid = Firebase.auth().currentUser.uid;

        let dataToSave = {
            uid: uuid,
            Id:Id,
            TourlementName: TourlementName,
            ongoing: ongoing,
            remaining: remaining,
            completed: completed,
            color: color,
            
        };

        Firebase
            .database()
            .ref('fixtures/' + Id)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const updateWinners = (Id,uuid, winner) => {

    return new Promise(function (resolve, reject) {

        const uuid = Firebase.auth().currentUser.uid;

        let dataToSave = {
            uid: uuid,
            Id:Id,
            winner: winner,
            
        };

        Firebase
            .database()
            .ref('fixtures/' + Id)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};




export const AddFixtures = async (Id,key, fixture, date, time, location,won) => {
    const uuid = Firebase.auth().currentUser.uid;

    
    try {

        return await Firebase
            .database()
            .ref('fixtures/' + Id)
            .child('fixtures')
            .child(key).
            update({
                key: key ,
                fixture: fixture,
                date:date,
                time:time,
                location:location,
                won:won
            });

    } catch (error) {
        return error;
    }
}