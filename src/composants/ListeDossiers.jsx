import Dossier from './Dossier';

// Importer le composant motion
import { motion } from 'framer-motion';

import './ListeDossiers.scss';
import { supprimer } from '../code/dossier-modele';

export default function ListeDossiers({dossiers, setDossiers, idUtil}) {
  
  function supprimerDossier(idDossier) {
    const resultat = supprimer(idUtil,idDossier);
    // console.log("Résultat de la suppression : ", resultat);
    // setDossiers(dossiers.filter(elt => elt.id != id))
  }

  function modifierDossier(id, titre, couverture, couleur, dateModif) {
    const dossierModif= {titre, couverture, couleur, dateModif};
      modifierDossier(idUtil, id,dossierModif);
      
    setDossiers(dossiers.map(
      doss => {
        if(doss.id == id) {
          return ({id, ...dossierModif});
        }
        return doss;
      }
    ));
  }

  return (
    <ul className="ListeDossiers">
      {
        (dossiers.length > 0) 
        ?
          dossiers.map( 
            // Remarquez l'utilisation du "spread operator" pour "étaler" les 
            // propriétés de l'objet 'dossier' reçu en paramètre de la fonction
            // fléchée dans les props du composant 'Dossier' !!
            dossier =>  <motion.li 
                          key={dossier.id}
                          layout={true}
                        >
                          <Dossier 
                            {...dossier} 
                            supprimer={supprimerDossier} 
                            modifier={modifierDossier}
                          />
                        </motion.li>
          )
        :
        <li className='aucun-dossier'>Aucun dossier</li>
      }
    </ul>
  );
}