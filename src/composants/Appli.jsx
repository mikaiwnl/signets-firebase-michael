import './Appli.scss';

import Accueil from './Accueil.jsx';
import PageUtilisateur from './PageUtilisateur.jsx';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../code/init.js';
import { observeEtatConnexion } from '../code/utilisateur-modele.js';

export default function Appli() {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => observeEtatConnexion(setUtilisateur),[]);

  return (
    utilisateur ? <PageUtilisateur util={utilisateur} /> : <Accueil />
  )
}
