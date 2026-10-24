import { OrganData } from '../types/anatomy';

export const ORGAN_DATA_MAP: Record<string, OrganData> = {
  heart: {
    id: 'heart',
    englishName: 'Heart',
    latinName: 'Cor',
    iconName: 'Activity',
    system: 'visceral',
    systemName: 'Cardiovascular / Visceral',
    overview: 'A hollow muscular four-chambered organ situated obliquely in the middle mediastinum, functioning as a high-efficiency dual circulatory pump.',
    physiology: 'Systolic contraction is initiated at the sinoatrial (SA) node in the right atrium, traversing the AV node and bundle of His to generate coordinated ventricular ejection (~70 mL stroke volume).',
    clinicalSignificance: 'Ischemia of the coronary vasculature precipitates myocardial necrosis. Chronic hypertension induces left ventricular concentric hypertrophy and diastolic dysfunction.',
    metrics: {
      weight: '280 - 340 grams',
      perfusion: '250 mL/min (5% of resting CO)',
      vitalFunction: 'Systemic & pulmonary hemodynamic perfusion'
    },
    cameraPosition: [0, 0, 5],
    cameraTarget: [0, 0, 0],
    hotspots: [
      {
        id: 'aorta',
        name: 'Ascending Aorta',
        latinName: 'Aorta ascendens',
        position: [0.15, 1.35, 0.2],
        description: 'The primary systemic elastic artery carrying oxygenated blood under high pressure (120 mmHg) out of the left ventricle.',
        clinicalPearl: 'Type A aortic dissection involves the ascending aorta and is an acute surgical emergency requiring emergent grafting to avert pericardial tamponade.',
        color: '#ef4444'
      },
      {
        id: 'left-ventricle',
        name: 'Left Ventricle',
        latinName: 'Ventriculus sinister cordis',
        position: [-0.65, -0.45, 0.5],
        description: 'Thick muscular chamber (8-12 mm wall thickness) responsible for pumping blood against high systemic vascular resistance.',
        clinicalPearl: 'The ejection fraction (EF, normal 55-70%) is measured primarily from left ventricular end-diastolic and end-systolic volumes.',
        color: '#f43f5e'
      },
      {
        id: 'right-atrium',
        name: 'Right Atrium',
        latinName: 'Atrium dextrum cordis',
        position: [0.85, 0.45, 0.25],
        description: 'Thin-walled receiving chamber collecting deoxygenated blood from the superior vena cava, inferior vena cava, and coronary sinus.',
        clinicalPearl: 'Houses the Sinoatrial (SA) Node near the crista terminalis, the heart\'s primary physiologic pacemaker firing at 60-100 bpm.',
        color: '#38bdf8'
      },
      {
        id: 'pulmonary-trunk',
        name: 'Pulmonary Trunk',
        latinName: 'Truncus pulmonalis',
        position: [-0.35, 1.1, 0.45],
        description: 'Vessel emerging from the right ventricular outflow tract (conus arteriosus), dividing into left and right pulmonary arteries.',
        clinicalPearl: 'A saddle pulmonary embolism lodges directly at this bifurcation, causing catastrophic acute right heart failure (cor pulmonale) and sudden death.',
        color: '#60a5fa'
      },
      {
        id: 'lad-artery',
        name: 'Left Anterior Descending (LAD)',
        latinName: 'Ramus interventricularis anterior',
        position: [-0.15, 0.15, 0.85],
        description: 'Major coronary artery coursing down the anterior interventricular sulcus supplying the anterior 2/3 of the interventricular septum and cardiac apex.',
        clinicalPearl: 'Colloquially known as the "widow-maker" because complete sudden thrombotic occlusion results in massive anterior STEMI.',
        color: '#f97316'
      }
    ]
  },
  brain: {
    id: 'brain',
    englishName: 'Brain',
    latinName: 'Encephalon',
    iconName: 'Brain',
    system: 'nervous',
    systemName: 'Central Nervous System',
    overview: 'The primary central nervous system organ housed in the neurocranium, containing approximately 86 billion neurons and supported by neuroglia.',
    physiology: 'Integrates afferent sensory streams, plans voluntary and reflex motor outputs, and maintains conscious executive reasoning, emotional valence, and language.',
    clinicalSignificance: 'Vulnerable to ischemic stroke (thromboembolic or lacunar) and hemorrhage. The Monro-Kellie doctrine dictates that cranial volume is constant, so space-occupying lesions rapidly increase intracranial pressure (ICP).',
    metrics: {
      weight: '1,300 - 1,400 grams',
      perfusion: '750 mL/min (15% of CO)',
      vitalFunction: 'Cognition, homeostasis, motor regulation'
    },
    cameraPosition: [0, 0, 5],
    cameraTarget: [0, 0, 0],
    hotspots: [
      {
        id: 'frontal-lobe',
        name: 'Frontal Lobe & Motor Cortex',
        latinName: 'Lobus frontalis',
        position: [0, 0.7, 1.1],
        description: 'Controls high-level executive decision making, working memory, personality, and contains the precentral gyrus (primary motor strip).',
        clinicalPearl: 'Lesions in the dominant inferior frontal gyrus (Broca\'s area, Brodmann 44/45) yield expressive, non-fluent motor aphasia with intact comprehension.',
        color: '#38bdf8'
      },
      {
        id: 'cerebellum',
        name: 'Cerebellum',
        latinName: 'Cerebellum',
        position: [0, -0.9, -0.9],
        description: 'Two-hemispheric posterior structure coordinating voluntary motor agility, muscle tone, and rapid kinetic error correction.',
        clinicalPearl: 'Damage causes the classic triad: intention tremor, past-pointing (dysmetria), and cerebellar ataxia, usually ipsilateral to the lesion.',
        color: '#a855f7'
      },
      {
        id: 'brainstem-pons',
        name: 'Brainstem & Pons',
        latinName: 'Truncus encephali & Pons',
        position: [0, -0.95, 0.15],
        description: 'Crucial bridge connecting cerebrum and cerebellum with spinal cord; houses vital cardiac and respiratory rhythmicity centers.',
        clinicalPearl: 'Basilar artery pontine infarction can lead to "Locked-in Syndrome": quadriplegia and aphonia with preserved consciousness and vertical eye movements.',
        color: '#f59e0b'
      },
      {
        id: 'temporal-lobe',
        name: 'Temporal Lobe & Hippocampus',
        latinName: 'Lobus temporalis',
        position: [-1.2, -0.2, 0.3],
        description: 'Processes auditory information and language comprehension; houses the medial hippocampal memory circuits.',
        clinicalPearl: 'Wernicke\'s receptive aphasia manifests as fluent, grammatical, yet meaningless "word salad" speech with profound comprehension deficit.',
        color: '#10b981'
      },
      {
        id: 'occipital-lobe',
        name: 'Occipital Lobe',
        latinName: 'Lobus occipitalis',
        position: [0, 0.25, -1.25],
        description: 'Posterior cortical region housing the primary visual cortex (V1, Brodmann area 17) organized retinotopically.',
        clinicalPearl: 'Posterior cerebral artery (PCA) stroke leads to contralateral homonymous hemianopia, often with macular sparing due to collateral MCA supply.',
        color: '#ec4899'
      }
    ]
  },
  lungs: {
    id: 'lungs',
    englishName: 'Lungs',
    latinName: 'Pulmones',
    iconName: 'Wind',
    system: 'visceral',
    systemName: 'Respiratory System',
    overview: 'Paired thoracic organs flanking the mediastinum, responsible for passive gas exchange across an alveolar surface area of ~70 square meters.',
    physiology: 'Ventilation is powered by diaphragmatic and intercostal contractions establishing negative intrapleural pressure, allowing bulk flow of atmospheric air across alveolar-capillary membranes.',
    clinicalSignificance: 'Susceptible to acute respiratory distress syndrome (ARDS), chronic obstructive pulmonary disease (COPD), pulmonary embolism, and pneumothorax.',
    metrics: {
      weight: '1,000 - 1,200 grams (combined)',
      perfusion: '100% of right ventricular output (~5 L/min)',
      vitalFunction: 'Oxygenation and carbon dioxide exhalation'
    },
    cameraPosition: [0, 0, 5],
    cameraTarget: [0, 0, 0],
    hotspots: [
      {
        id: 'trachea',
        name: 'Trachea & Carina',
        latinName: 'Trachea et Carina',
        position: [0, 1.4, 0.1],
        description: 'Cartilaginous airway tube reinforced with 16-20 C-shaped rings, bifurcating at the carina into the right and left mainstem bronchi.',
        clinicalPearl: 'The right main bronchus is wider, shorter, and more vertical than the left, making it the most frequent landing site for aspirated foreign objects.',
        color: '#38bdf8'
      },
      {
        id: 'right-superior-lobe',
        name: 'Right Superior Lobe',
        latinName: 'Lobus superior pulmonis dextri',
        position: [0.95, 0.65, 0.3],
        description: 'Upper pulmonary lobe containing apical, anterior, and posterior bronchopulmonary segments.',
        clinicalPearl: 'Reactivation tuberculosis typically manifests in the lung apices because high ventilation-perfusion ratio provides high oxygen tension favorable to Mycobacterium tuberculosis.',
        color: '#10b981'
      },
      {
        id: 'cardiac-notch',
        name: 'Cardiac Notch of Left Lung',
        latinName: 'Incisura cardiaca pulmonis sinistri',
        position: [-0.65, -0.2, 0.45],
        description: 'Prominent concavity in the anterior margin of the left superior lobe carved out by the cardiac apex.',
        clinicalPearl: 'Below the cardiac notch lies the lingula, the embryological homologue of the right middle lobe.',
        color: '#f43f5e'
      },
      {
        id: 'pulmonary-hilum',
        name: 'Pulmonary Hilum',
        latinName: 'Hilum pulmonis',
        position: [0.25, 0.05, -0.1],
        description: 'Medial pleural reflection through which bronchi, pulmonary vessels, bronchial vessels, lymphatics, and nerves enter and exit the lung.',
        clinicalPearl: 'Bilateral hilar lymphadenopathy on chest radiograph is a hallmark diagnostic finding in pulmonary sarcoidosis.',
        color: '#f59e0b'
      }
    ]
  },
  liver: {
    id: 'liver',
    englishName: 'Liver',
    latinName: 'Hepar',
    iconName: 'Shield',
    system: 'visceral',
    systemName: 'Digestive & Metabolic',
    overview: 'The largest visceral organ and gland in the body, positioned in the right hypochondrium and epigastrium, performing over 500 vital metabolic functions.',
    physiology: 'Processes nutrient-laden venous blood from mesenteric circulation, synthesizes albumin and clotting factors, metabolizes drugs/xenobiotics, and secretes bile for lipid emulsification.',
    clinicalSignificance: 'Chronic hepatic injury leads to progressive fibrosis, cirrhosis, end-stage liver disease, and hepatocellular carcinoma. Monitored clinically via AST, ALT, alkaline phosphatase, and INR.',
    metrics: {
      weight: '1,400 - 1,600 grams',
      perfusion: '1,450 mL/min (25% of CO)',
      vitalFunction: 'Bile secretion, gluconeogenesis, detoxification'
    },
    cameraPosition: [0, 0, 5],
    cameraTarget: [0, 0, 0],
    hotspots: [
      {
        id: 'right-lobe',
        name: 'Right Hepatic Lobe',
        latinName: 'Lobus hepatis dexter',
        position: [0.75, 0.1, 0.25],
        description: 'The larger anatomical lobe, accounting for ~5/6 of liver volume, subdivided into Couinaud segments V, VI, VII, and VIII.',
        clinicalPearl: 'Amoebic and pyogenic liver abscesses predominantly localize to the right lobe due to laminar streamline flow patterns in the portal vein.',
        color: '#f59e0b'
      },
      {
        id: 'gallbladder',
        name: 'Gallbladder',
        latinName: 'Vesica biliaris',
        position: [0.35, -0.75, 0.65],
        description: 'Muscular pear-shaped sac resting in a fossa on the visceral surface of the right lobe, storing and concentrating bile up to 10-fold.',
        clinicalPearl: 'Murphy\'s sign (inspiratory arrest upon deep palpation of the right upper quadrant) is highly specific for acute calculous cholecystitis.',
        color: '#10b981'
      },
      {
        id: 'porta-hepatis',
        name: 'Porta Hepatis',
        latinName: 'Porta hepatis (Trias hepatica)',
        position: [0.05, -0.3, -0.1],
        description: 'Transverse fissure transmitting the portal triad: hepatic portal vein (posterior), hepatic artery proper (anteromedial), and common bile duct (anterolateral).',
        clinicalPearl: 'The Pringle maneuver compresses the hepatoduodenal ligament at the porta hepatis to temporarily control massive hepatic hemorrhage in trauma.',
        color: '#ef4444'
      },
      {
        id: 'falciform-ligament',
        name: 'Falciform Ligament',
        latinName: 'Ligamentum falciforme hepatis',
        position: [-0.05, 0.45, 0.75],
        description: 'Double-layered peritoneal sheet attaching the liver to the anterior abdominal wall and diaphragm; contains the ligamentum teres in its free edge.',
        clinicalPearl: 'The ligamentum teres is the fibrous remnant of the obliterated left umbilical vein, which can recanalize in severe portal hypertension ("Cruveilhier-Baumgarten sign").',
        color: '#38bdf8'
      }
    ]
  },
  kidneys: {
    id: 'kidneys',
    englishName: 'Kidneys',
    latinName: 'Renes',
    iconName: 'Droplet',
    system: 'visceral',
    systemName: 'Urinary & Homeostatic',
    overview: 'Paired retroperitoneal organs lying on either side of the vertebral column between T12 and L3, filtering metabolic waste from circulating plasma.',
    physiology: 'Each kidney contains ~1 million nephrons executing ultrafiltration, tubular reabsorption, and secretion to maintain electrolyte balance, acid-base homeostasis, and blood pressure via the RAAS cascade.',
    clinicalSignificance: 'Susceptible to acute kidney injury (prerenal, intrinsic, postrenal) and chronic kidney disease (CKD) secondary to diabetes mellitus and hypertension.',
    metrics: {
      weight: '130 - 150 grams each',
      perfusion: '1,200 mL/min (20-25% of CO)',
      vitalFunction: 'Plasma filtration, EPO production, RAAS regulation'
    },
    cameraPosition: [0, 0, 5],
    cameraTarget: [0, 0, 0],
    hotspots: [
      {
        id: 'renal-cortex',
        name: 'Renal Cortex',
        latinName: 'Cortex renalis',
        position: [0.95, 0.45, 0.2],
        description: 'Outer reddish-brown region containing glomeruli, convoluted tubules, and cortical collecting ducts executing initial blood filtration.',
        clinicalPearl: 'Post-streptococcal glomerulonephritis (PSGN) causes immune complex deposition in glomeruli, presenting with hematuria ("cola-colored urine"), edema, and hypertension.',
        color: '#f59e0b'
      },
      {
        id: 'renal-medulla',
        name: 'Renal Medulla & Pyramids',
        latinName: 'Medulla renalis et pyramides',
        position: [0.65, 0.0, 0.1],
        description: 'Inner zone organized into 8-18 triangular renal pyramids, containing loops of Henle that establish a countercurrent osmotic gradient.',
        clinicalPearl: 'Renal papillary necrosis can occur with sickle cell disease/trait, analgesic nephropathy, or acute pyelonephritis, causing sloughed papillae and ureteral colic.',
        color: '#ef4444'
      },
      {
        id: 'renal-pelvis-ureter',
        name: 'Renal Pelvis & Ureter',
        latinName: 'Pelvis renalis et Ureter',
        position: [0.15, -0.5, 0.15],
        description: 'Funnel-shaped upper expanded end of the ureter collecting urine from major calyces and transmitting it down to the bladder.',
        clinicalPearl: 'Nephrolithiasis (kidney stones) commonly lodges at three anatomic narrowing points: ureteropelvic junction (UPJ), pelvic brim, and ureterovesical junction (UVJ).',
        color: '#38bdf8'
      },
      {
        id: 'renal-artery',
        name: 'Renal Artery & Hilum',
        latinName: 'Arteria renalis',
        position: [0.15, 0.15, -0.15],
        description: 'High-flow lateral branch of abdominal aorta supplying unfiltered arterial blood under high perfusion pressure.',
        clinicalPearl: 'Fibromuscular dysplasia (FMD) is a non-atherosclerotic disease common in young women that narrows the renal artery, giving a "string-of-beads" sign on angiogram.',
        color: '#ec4899'
      }
    ]
  }
};
