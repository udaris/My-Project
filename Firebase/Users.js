import Firebase from './firebaseConfig';


export const AddUser = async (name, userRole, email, image, uid) => {
    try {
        const userRole = 'player'
        return await Firebase.database().ref('users/' + uid).
            set({
                name: name,
                userRole: userRole,
                email: email,
                image: image,
                uuid: uid,
            });
    } catch (error) {
        return error;
    }
}
export const AddPlayers = async (name, userRole, email, image, uid) => {
    try {
        const userRole = 'player'
        return await Firebase.database().ref('players/' + uid).
            set({
                name: name,
                userRole: userRole,
                email: email,
                image: image,
                uuid: uid,
            });
    } catch (error) {
        return error;
    }
}


export const AddUser2 = async (name, userRole, email, image, uid) => {
    try {
        const userRole = 'Admin'
        return await Firebase.database().ref('users/' + uid).
            set({
                name: name,
                userRole: userRole,
                email: email,
                image: image,
                uuid: uid,
            });
    } catch (error) {
        return error;
    }
}
export const AddAdmins = async (name, userRole, email, image, uid) => {
    try {
        const userRole = 'Admin'
        return await Firebase.database().ref('admins/' + uid).
            set({
                name: name,
                userRole: userRole,
                email: email,
                image: image,
                uuid: uid,
            });
    } catch (error) {
        return error;
    }
}

export const AddUser4 = async (name, userRole, email, image, uid) => {
    try {
        const userRole = 'coach'
        return await Firebase.database().ref('users/' + uid).
            set({
                name: name,
                userRole: userRole,
                email: email,
                image: image,
                uuid: uid,
            });
    } catch (error) {
        return error;
    }
}
export const AddCoach = async (name, userRole, email, image, uid) => {
    try {
        const userRole = 'coach'
        return await Firebase.database().ref('coaches/' + uid).
            set({
                name: name,
                userRole: userRole,
                email: email,
                image: image,
                uuid: uid,
            });
    } catch (error) {
        return error;
    }
}

export const AddUser3 = async (name, userRole, email, image, uid) => {
    try {
        const userRole = 'parent'
        return await Firebase.database().ref('users/' + uid).
            set({
                name: name,
                userRole: userRole,
                email: email,
                image: image,
                uuid: uid,
            });
    } catch (error) {
        return error;
    }
}

export const AddParent = async (name, userRole, email, image, uid) => {
    try {
        const userRole = 'parent'
        return await Firebase.database().ref('parents/' + uid).
            set({
                name: name,
                userRole: userRole,
                email: email,
                image: image,
                uuid: uid,
            });
    } catch (error) {
        return error;
    }
}
export const UpdateProfileImage = async (image, uid) => {
    try {
        return await Firebase
            .database()
            .ref('users/' + uid).
            update({

                image: image,

            });
    } catch (error) {
        return error;
    }
}


export const AddAdmin = async ( userRole, uid) => {
    try {
        const userRole = 'Admin'
        return await Firebase.database().ref('users/' + uid).
        update({

            userRole: userRole,

        });
    } catch (error) {
        return error;
    }
}
export const RemoveAdmin = async ( userRole, uid) => {
    try {
        const userRole = 'coach'
        return await Firebase.database().ref('users/' + uid).
        update({

            userRole: userRole,

        });
    } catch (error) {
        return error;
    }
}