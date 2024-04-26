import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { bd, collDossiers, collUtilisateurs } from "./init";

/**
 *
 * @param {string} idUtil Identifiant de l'utilisateur
 * @param {objet} infoDossier Objet Contenant l'info du dossiers à
 *
 * @returns {Promise<string>} infoDossier Identifiant du dossier ajouter
 */

export async function creer(idUtil, infoDossier) {
  const refDossier = doc(
    collection(bd, collUtilisateurs, idUtil, collDossiers)
  );
  await setDoc(refDossier, infoDossier);
  return refDossier.id;
}

/**
 * LIRE TOUT les dossiers de l'utilisateurs connecté
 * @param {string} idIto; omtofoamt de l'utilisateur
 * @param {Array} tableau contenanat tous les dossiers de  cet utilisatuers
 */

export async function lireTout(idUtil) {
  const leDossier = await getDocs(
    query(collection(bd, collUtilisateurs, idUtil, collDossiers))
  );
  // console.log("Snapshot contenant les documents dans Firestore :",leDossier);
  return leDossier.docs;
}
/**
 *
 * @param {*} idUtil
 * @param {*} idDossier
 * @returns
 */

export async function supprimer(idUtil, idDossier) {
  const refDossier = doc(
    collection(bd, collUtilisateurs, idUtil, collDossiers, idDossier)
  );
  return await deleteDoc(refDossier);
}

/**
 * @param {*} idUtil
 * @param {*} idDossier
 * @param {*} infoDossier
 *
 */

export async function modifier(idUtil, idDossier, infoDossier) {
  const refDossier = doc(
    collection(bd, collUtilisateurs, idUtil, collDossiers, idDossier)
  );
  await updateDoc(refDossier, infoDossier);
}
