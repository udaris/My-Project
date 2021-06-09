import Firebase from './firebaseConfig';

export const submitUserDetails = (Id, firstName, secondName, position, currentAddress,
    permentAddress, dob, age, gender, medicalDetails, winners, strengths,
    experiences, otherqualifications, tpnumber, gplayer, sport, userEmail) => {
    return new Promise(function (resolve, reject) {


        const uuid = Firebase.auth().currentUser.uid;

        let dataToSave = {
            Id: uuid,
            firstName: firstName,
            secondName: secondName,
            position: position,
            currentAddress: currentAddress,
            permentAddress: permentAddress,
            dob: dob,
            age: age,
            gender: gender,
            medicalDetails: medicalDetails,
            winners: winners,
            strengths: strengths,
            experiences:experiences,
            otherqualifications:otherqualifications,
            tpnumber: tpnumber,
            gplayer: gplayer,
            sport: sport,
            userEmail: userEmail

        };

        Firebase
            .database()
            .ref('usersDetails/' + uuid)
            .update(dataToSave)
            .then(snapshot => {
                resolve(snapshot);
            })
            .catch(err => {
                reject(err);
            });
    });
};

