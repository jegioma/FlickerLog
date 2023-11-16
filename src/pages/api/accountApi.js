import { db, addDoc, collection, getDocs, auth, query, where,deleteDoc,doc } from '@/configure/firebase';
import { signOut } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { useState } from 'react';

//gets the list of the users watchlists to display in menu
export async function getLists() {
    const listRef = collection(db, 'WatchList');
    const q = query(listRef, where('email', '==', auth?.currentUser?.email));
    const querySnapshot = await getDocs(q);
    const dataArray = [];

    for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const dataId = doc.id;
        dataArray.push({ ...data, id: dataId });
    }

    return dataArray;
}
//add item to the selected watchlist and check for duplicates
export async function addItemToList(resultDetails, item) {
    try {
        const watchlistRef = doc(db, 'WatchList', item.id);
        const movieDetailCollectionRef = collection(watchlistRef, 'MovieDetail');

        const duplicateQuery = query(movieDetailCollectionRef, where('imdbID', '==', resultDetails?.imdbID));
        const duplicateSnapshot = await getDocs(duplicateQuery);
        
        if (duplicateSnapshot.docs.length === 0) {
            await addDoc(movieDetailCollectionRef, {
                Title: resultDetails?.Title,
                image: resultDetails?.Poster,
                imdbID: resultDetails?.imdbID,
                Type: resultDetails?.Type,
            });
            return {
                success: true,
                message: `Added "${resultDetails?.Title}" to your ${item.listName}-WatchList`,
            };
        } else {
            return {
                success: false,
                message: `"${resultDetails?.Title}" is already in your ${item.listName}-WatchList`,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: `Failed to add "${resultDetails?.Title}" to your ${item.listName}-WatchList`,
        };    
    }
}

//sign current user out
export async function signOutUser() {
    signOut(auth);
}