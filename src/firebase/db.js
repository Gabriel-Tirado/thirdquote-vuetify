
import firebase from './firebase'


const db = firebase.firestore()
const usersCollection = db.collection('users')
const budgetariesCollection = db.collection('budgetaries')

export const createUser = user => {
    return usersCollection.add(user)
}

export const getUser = async email => {
    let first = true
    let profile = {}
    await usersCollection
        .where('email', '==', email)
        .get()
        .then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if (first) {
                    profile = doc.data()
                    first = false
                }
            })
        })
    return profile
}

export const createBudgetary = budgetary => {
    return budgetariesCollection.add(budgetary)
}

export const getBudgetary = async (email, url) => {
    let first = true
    let profile = {}
    await budgetariesCollection
        .where('email', '==', email)
        .where('url', '==', url)
        .get()
        .then((snapshot)=>{
            snapshot.docs.forEach(doc => {
                if (first) {
                    profile = doc.data()
                    first = false
                }
            })
        })
    return profile
}

export const getBudgetaryList = async (email) => {
    let list = []
    await budgetariesCollection
        .where('email', '==', email)
        .get()
        .then((snapshot)=>{
            snapshot.docs.forEach(doc => {
                list.push(doc.data())
            })
        })
    return list
}

// export const updateUser = (id, user) => {
//     return usersCollection.doc(id).update(user)
// }