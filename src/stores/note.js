import { defineStore, storeToRefs } from "pinia";
import { db } from "../firebase/fire";
import { useAuthStore } from "./auth";
import { collection, addDoc,where, query, getDocs, serverTimestamp,doc, getDoc, updateDoc } from "firebase/firestore";
import { ref } from "vue";
export const useNoteStore = defineStore('note', ()=>{

    const {user} = storeToRefs(useAuthStore());
    const docRef = collection(db, 'LoveNotes')
    const note = ref(null);
    const getNotes = async()=>{
        const queryRef = query(collection(db, 'LoveNotes'), where('recipientEmail','==',user.value?.email ))
        let notes = [];
        try {
            const snapshot = await getDocs(queryRef);
            snapshot.forEach((doc)=>{
                console.log(doc.id, "->", doc.data());
                notes.push({id:doc.id, data:doc.data()});
            })
            note.value = notes;
             return notes
        } catch (error) {
            console.error(error)
            return [];
        }
       
    }

    const getNotesMemo = ()=>{
        let noteCache = null;

        return async()=>{
            if(noteCache){
                console.log('fetching from cache');
                return noteCache;
            }
            try {
                noteCache = await getNotes()

                return noteCache
            } catch (error) {
                console.error(error)
            }

        }
    }

    const memoNotes = getNotesMemo(); 

    const getSentNote = async(id)=>{
        const queryRef = query(collection(db, 'LoveNotes'), where('authorId','==',user.value?.id ))
        let sentNotes = [];
        try {
            const snapshot = await getDocs(queryRef);
            snapshot.forEach((doc)=>{
                console.log(doc.id, "->", doc.data());
                sentNotes.push({id:doc.id, data:doc.data()});
            })
            note.value = sentNotes;
             return sentNotes
        } catch (error) {
            console.error(error)
            return [];
        }
       
    }

    const getOneDoc = async(id)=>{
        const getOneDocRef = doc(db, 'LoveNotes', id);
        let docSnap = null;
        try {
            const res = await getDoc(getOneDocRef);
            if(res.exists()){
                docSnap = {id:res.id, data:res.data()};
            }else{
                console.log('no data')
            }
        } catch (error) {
            console.error(error)
        }
       return docSnap;
    }

    const isReadUpdater = async(id)=>{
        const isReadRef = doc(db, 'LoveNotes', id);
        
        try {
            await updateDoc(isReadRef, {
                isRead: true
            })
        } catch (error) {
            console.error(error)
        }
    }


    const createNote = async(formData)=>{
        await addDoc(docRef, {
            authorId: formData.authorId ,
            content: formData.content ,
            isRead: formData.isRead ,
            recipientEmail: formData.recipientEmail ,
            title: formData.title ,
            createdAt: serverTimestamp()
            
        }).then(()=>{
            
        }).catch((error)=>console.error(error))
    }
    return {createNote, getNotes, memoNotes, note, getOneDoc, isReadUpdater, getSentNote}
});