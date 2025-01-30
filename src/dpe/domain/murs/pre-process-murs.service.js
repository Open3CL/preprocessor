import { getThicknessFromDescription } from '../../../core/utils.js';
import { tv } from '@open3cl/engine/utils.js';

export class PreProcessMursService {
  constructor() {}

  /**
   * Retourne si elle existe la fiche technique contenant le texte description et
   * présente dans la catégorie de fiches techniques ayant pour catégorie categoryFicheTechiqueId
   *
   * @param dpe {Dpe}
   */
  preprocess(dpe) {
    const murs = dpe.logement.enveloppe?.mur_collection?.mur || [];

    murs.forEach((mur) => {
      /** @type {MurDE} */
      const murDE = mur.donnee_entree;

      if (!murDE.epaisseur_structure) {
        /**
         * Certains logiciels omettent le champ 'epaisseur_structure'
         * Récupération de cette information si elle existe dans la description via regex "(\d+) cm".
         * @type {number}
         */
        let epaisseurStructure = getThicknessFromDescription(murDE.description);

        /**
         * Si on n'a toujours pas de valeur pour 'epaisseur_structure', récupération de la valeur utilisée dans le DPE
         */
        if (murDE.tv_umur0_id && epaisseurStructure === 0) {
          const rowUmur0 = tv('umur0', {
            tv_umur0_id: murDE.tv_umur0_id
          });

          if (rowUmur0 && rowUmur0.epaisseur_structure) {
            epaisseurStructure = parseFloat(
              rowUmur0.epaisseur_structure.replace('≥ ', '').replace('≤ ', '')
            );
          }
        }

        if (epaisseurStructure) {
          murDE.epaisseur_structure = epaisseurStructure;
        }
      }

      /**
       * Certaines descriptions contiennent des informations sur le type de doublage.
       * Il arrive régulièrement que les id dans les données d'entrées ne soient pas à jour
       * Récupération de cette information si elle existe dans la description.
       * @type {number}
       */
      let typeDoublage = parseInt(murDE.enum_type_doublage_id);

      if (typeDoublage === 1 || typeDoublage === 2) {
        if (murDE.description.toLowerCase().indexOf('doublage connu (plâtre, brique') !== -1) {
          murDE.enum_type_doublage_id = '5';
        } else if (
          murDE.description.toLowerCase().indexOf('doublage indéterminé avec lame') !== -1
        ) {
          murDE.enum_type_doublage_id = '4';
        } else if (murDE.description.toLowerCase().indexOf('doublage indéterminé ou lame') !== -1) {
          murDE.enum_type_doublage_id = '3';
        }
      }
    });
  }
}
