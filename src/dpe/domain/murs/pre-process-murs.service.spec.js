import { describe, expect, it } from 'vitest';
import { PreProcessMursService } from './pre-process-murs.service.js';

describe('PreProcessMursService service tests', () => {
  const service = new PreProcessMursService();

  const dpe = {
    logement: {
      enveloppe: {
        mur_collection: {
          mur: [
            {
              donnee_entree: {
                description: 'Mur en blocs de béton creux Ep <=20cm avec isolant (ITI) Ep=10 cm',
                enum_orientation_id: '4',
                tv_umur0_id: '46',
                enum_type_vitrage_id: '2',
                enum_type_baie_id: '4',
                enum_type_materiaux_menuiserie_id: '5'
              }
            }
          ]
        }
      }
    }
  };

  it('Aucun action si aucun mur spécifié', async () => {
    let dpe = { logement: { enveloppe: { mur_collection: { mur: [] } } } };

    service.preprocess(dpe);
    expect(dpe.logement.enveloppe.mur_collection.mur.length).toBe(0);

    dpe = { logement: { enveloppe: { mur_collection: {} } } };
    service.preprocess(dpe);
    expect(dpe.logement.enveloppe.mur_collection.mur).toBeUndefined();
  });

  it('epaisseur_structure mis à jour à partir de la description', async () => {
    delete dpe.logement.enveloppe.mur_collection.mur[0].donnee_entree.epaisseur_structure;

    service.preprocess(dpe);
    expect(dpe.logement.enveloppe.mur_collection.mur[0].donnee_entree.epaisseur_structure).toBe(10);
  });

  it('epaisseur_structure mis à jour à partir des données tv_umur0_id', async () => {
    delete dpe.logement.enveloppe.mur_collection.mur[0].donnee_entree.epaisseur_structure;
    dpe.logement.enveloppe.mur_collection.mur[0].donnee_entree.description = '';
    service.preprocess(dpe);

    expect(dpe.logement.enveloppe.mur_collection.mur[0].donnee_entree.epaisseur_structure).toBe(23);

    delete dpe.logement.enveloppe.mur_collection.mur[0].donnee_entree.epaisseur_structure;
    dpe.logement.enveloppe.mur_collection.mur[0].donnee_entree.tv_umur0_id = '38';
    service.preprocess(dpe);
    expect(dpe.logement.enveloppe.mur_collection.mur[0].donnee_entree.epaisseur_structure).toBe(10);

    delete dpe.logement.enveloppe.mur_collection.mur[0].donnee_entree.epaisseur_structure;
    dpe.logement.enveloppe.mur_collection.mur[0].donnee_entree.tv_umur0_id = '41';
    service.preprocess(dpe);
    expect(dpe.logement.enveloppe.mur_collection.mur[0].donnee_entree.epaisseur_structure).toBe(25);
  });
});
