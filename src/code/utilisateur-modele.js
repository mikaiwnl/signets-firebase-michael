import { onAuthStateChanged,signInWithPopup, signOut } from "firebase/auth";
import { firebaseAuth, googleProvider ,bd } from "./init";
import {doc, setDoc } from "firebase/firestore";

/**
 * Permet à un utilisateur de se connecter en utilisant l'authentification
 * fédérée Google.
 */
export function connexion() {
  signInWithPopup(firebaseAuth, googleProvider).then(
    (u) => console.log("Utilisateur", u)
  )
}

export function deconnexion() {
  signOut(firebaseAuth);
}

/**
 * Enregistre l'observateur de connexion Firebase.
 * @param {function} mutateurUtil
 * @return
 */

export function observeEtatConnexion(mutateurUtil){
  onAuthStateChanged(firebaseAuth, u=>{
    if(u){
        // enregistrer les donné de cette utilisateur dans FireStore
        setDoc(
          doc(bd,'signets-utilisateurs',u.uid),
        {
          nomComplet:u.displayName,
          avatar: u.photoURL,
          dcc: new Date().getTime(),
          courriel:u.email
        },

        {merge:true}
        )
    }
    mutateurUtil(u)
  }
    
);
}
