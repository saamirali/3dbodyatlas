import { AnatomicalStructure } from '../types/anatomy';

export const SYSTEM_COLORS: Record<string, string> = {
  skeletal: '#e2e8f0',   // Ivory bone
  muscular: '#f43f5e',   // Ruby muscle
  visceral: '#f59e0b',   // Amber organ
  nervous: '#38bdf8',    // Cyan nerve
  vascular: '#ef4444',   // Crimson blood
};

export const SYSTEM_NAMES: Record<string, { en: string; la: string; description: string }> = {
  skeletal: {
    en: 'Skeletal System',
    la: 'Systema skeletale',
    description: 'Provides structural framework, organ protection, calcium homeostasis, and hematopoiesis within marrow.'
  },
  muscular: {
    en: 'Muscular System',
    la: 'Systema musculare',
    description: 'Enables voluntary locomotion, posture maintenance, visceral motility, and core thermogenesis.'
  },
  visceral: {
    en: 'Visceral / Organ System',
    la: 'Systema viscerale',
    description: 'Comprises metabolic, respiratory, digestive, and homeostatic viscera ensuring systemic survival.'
  },
  nervous: {
    en: 'Nervous System',
    la: 'Systema nervosum',
    description: 'High-speed electrochemical transmission network mediating sensory reception, cognition, and motor reflexes.'
  },
  vascular: {
    en: 'Vascular / Circulatory System',
    la: 'Systema cardiovasculare',
    description: 'High-pressure closed tubular conduit network transporting oxygenated blood, nutrients, hormones, and waste.'
  }
};

export const ANATOMICAL_STRUCTURES: AnatomicalStructure[] = [
  // ==================== SKELETAL SYSTEM (Column X = -6 in Disassembled Grid) ====================
  {
    id: 'cranium',
    latinName: 'Cranium (Neurocranium & Viscerocranium)',
    englishName: 'Skull / Cranium',
    system: 'skeletal',
    region: 'Head & Neck',
    side: 'midline',
    terminologyCode: 'TA98: A02.1.00.001',
    description: 'The rigid bony vault enclosing and shielding the brain and primary sensory apparatus (vision, olfaction, gustation, audition).',
    anatomicalDetails: {
      origin: 'Derived from neural crest cells and paraxial mesoderm (sutural synarthroses).',
      insertion: 'Articulates with C1 atlas vertebra at occipital condyles.',
      innervation: 'Cranial nerves CN V (Trigeminal), sensory branches to periosteum.',
      bloodSupply: 'Middle meningeal artery, vertebral and internal carotid branches.',
      action: 'Rigid encephalic containment and biomechanical masticatory base.'
    },
    clinicalRelevance: 'Basilar skull fracture signs include Battle sign (retroauricular ecchymosis), raccoon eyes (periorbital hematoma), and CSF rhinorrhea/otorrhea.',
    position: [0, 4.4, 0.05],
    disassembledPosition: [-6, 4.5, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    geometryType: 'skull'
  },
  {
    id: 'mandible',
    latinName: 'Mandibula',
    englishName: 'Mandible (Lower Jaw)',
    system: 'skeletal',
    region: 'Head & Neck',
    side: 'midline',
    terminologyCode: 'TA98: A02.1.15.001',
    description: 'The strongest and largest bone of the facial skeleton, forming the temporomandibular joint (TMJ) with the temporal bone.',
    anatomicalDetails: {
      origin: 'First pharyngeal (mandibular) arch ossification.',
      insertion: 'Condylar process articulates with mandibular fossa.',
      innervation: 'Inferior alveolar nerve (branch of CN V3 mandibular).',
      bloodSupply: 'Inferior alveolar artery from maxillary artery.',
      action: 'Elevation, depression, protraction, retraction, and lateral excursion for mastication.'
    },
    clinicalRelevance: 'Mandibular fractures frequently occur in pairs due to ring-like mechanics (e.g. angle and contralateral condylar neck). Watch for airway compromise.',
    position: [0, 3.8, 0.35],
    disassembledPosition: [-6, 3.2, 0],
    scale: [0.9, 0.8, 0.9],
    geometryType: 'mandible'
  },
  {
    id: 'columna-vertebralis',
    latinName: 'Columna vertebralis',
    englishName: 'Vertebral Column (Spine)',
    system: 'skeletal',
    region: 'Axial Skeleton',
    side: 'midline',
    terminologyCode: 'TA98: A02.2.00.001',
    description: 'Segmented axial pillar of 33 vertebrae (7 cervical, 12 thoracic, 5 lumbar, 5 fused sacral, 4 fused coccygeal) guarding the spinal cord.',
    anatomicalDetails: {
      origin: 'Sclerotome portions of somites along the notochord.',
      insertion: 'Occipital base to coccygeal apex.',
      innervation: 'Dorsal rami of spinal nerves and recurrent meningeal sinuvertebral nerves.',
      bloodSupply: 'Segmental lumbar arteries, posterior and anterior radicular arteries.',
      action: 'Weight transmission to pelvic girdle, multi-axial flexibility, and spinal canal protection.'
    },
    clinicalRelevance: 'Herniated nucleus pulposus most commonly compresses L4-L5 or L5-S1 nerve roots, generating classic radiculopathy (sciatica) and positive straight leg raise.',
    position: [0, 1.8, -0.3],
    disassembledPosition: [-6, 1.8, 0],
    scale: [0.75, 1.3, 0.8],
    geometryType: 'spine'
  },
  {
    id: 'cavea-thoracis',
    latinName: 'Cavea thoracis',
    englishName: 'Ribcage (Thoracic Cage)',
    system: 'skeletal',
    region: 'Thorax',
    side: 'midline',
    terminologyCode: 'TA98: A02.3.01.001',
    description: 'Osteocartilaginous conical cage consisting of 12 pairs of ribs, costal cartilages, and the sternum protecting the heart and lungs.',
    anatomicalDetails: {
      origin: 'Thoracic vertebrae (costovertebral joints).',
      insertion: 'Sternum via costal synchondroses (ribs 1-7 true, 8-10 false, 11-12 floating).',
      innervation: 'Intercostal nerves (ventral rami T1-T11).',
      bloodSupply: 'Intercostal arteries, internal thoracic (mammary) arteries.',
      action: 'Pump-handle (anterior-posterior) and bucket-handle (transverse) expansion during ventilation.'
    },
    clinicalRelevance: 'Flail chest occurs when 3 or more contiguous ribs fracture in two or more places, yielding paradoxical chest wall motion and pulmonary contusion.',
    position: [0, 2.2, 0.05],
    disassembledPosition: [-6, 0.4, 0],
    scale: [1.2, 1.05, 1.1],
    geometryType: 'ribcage'
  },
  {
    id: 'clavicula-r',
    latinName: 'Clavicula dextra',
    englishName: 'Clavicle (Right Collarbone)',
    system: 'skeletal',
    region: 'Shoulder Girdle',
    side: 'right',
    terminologyCode: 'TA98: A02.4.02.001',
    description: 'S-shaped strut bone connecting the axial skeleton (manubrium sterni) to the appendicular skeleton (acromion of scapula).',
    anatomicalDetails: {
      origin: 'First bone in human body to begin intramembranous ossification (5th gestational week).',
      insertion: 'Sternoclavicular and acromioclavicular synovial joints.',
      innervation: 'Supraclavicular nerves (C3-C4), nerve to subclavius.',
      bloodSupply: 'Suprascapular and thoracoacromial arteries.',
      action: 'Acts as mechanical strut keeping upper limb abducted from trunk for maximal mobility.'
    },
    clinicalRelevance: 'Most frequently fractured long bone, classically at junction of middle and lateral thirds. Subclavian vessels and brachial plexus lie immediately subjacent.',
    position: [0.95, 3.1, 0.25],
    disassembledPosition: [-6, -1.0, 0],
    scale: [0.9, 0.8, 0.9],
    geometryType: 'clavicle'
  },
  {
    id: 'pelvis',
    latinName: 'Pelvis / Os coxae',
    englishName: 'Pelvic Girdle',
    system: 'skeletal',
    region: 'Pelvis',
    side: 'midline',
    terminologyCode: 'TA98: A02.5.01.001',
    description: 'Massive basin-like bone complex formed by two hip bones (ilium, ischium, pubis fused at triradiate cartilage) and the sacrum.',
    anatomicalDetails: {
      origin: 'Three primary ossification centers (ilium, ischium, pubis) converging at acetabulum.',
      insertion: 'Articulates with sacrum (SI joint) and femoral heads.',
      innervation: 'Branches of lumbar (L1-L4) and sacral (L4-S4) plexuses.',
      bloodSupply: 'Internal and external iliac artery divisions.',
      action: 'Weight transfer from axial column to lower extremities, pelvic visceral containment.'
    },
    clinicalRelevance: 'Open-book pelvic pelvic fractures rupture the sacroiliac ligaments and venous plexus, with risk of rapid exsanguinating retroperitoneal hemorrhage (up to 3-4 liters).',
    position: [0, 0.05, 0.02],
    disassembledPosition: [-6, -2.4, 0],
    scale: [1.15, 0.95, 1.05],
    geometryType: 'pelvis'
  },
  {
    id: 'femur-r',
    latinName: 'Os femoris dextrum',
    englishName: 'Femur (Right Thigh Bone)',
    system: 'skeletal',
    region: 'Lower Limb',
    side: 'right',
    terminologyCode: 'TA98: A02.5.04.001',
    description: 'The longest, heaviest, and strongest tubular bone in the human body, transmitting full ground-reaction loads to the acetabulum.',
    anatomicalDetails: {
      origin: 'Proximal head, greater and lesser trochanters, linea aspera, distal medial/lateral condyles.',
      insertion: 'Articulates proximally at acetabulum and distally with patella and tibia.',
      innervation: 'Femoral nerve (anterior), obturator nerve (medial), sciatic nerve (posterior).',
      bloodSupply: 'Medial and lateral circumflex femoral arteries (critical for femoral head viability).',
      action: 'Weight bearing, bipedal locomotion, insertion anchor for major postural muscle groups.'
    },
    clinicalRelevance: 'Subcapital femoral neck fractures can disrupt the retinacular vessels from the medial circumflex femoral artery, causing avascular necrosis (AVN) of the femoral head.',
    position: [0.75, -2.0, 0.05],
    disassembledPosition: [-6, -4.0, 0],
    scale: [0.85, 1.25, 0.85],
    geometryType: 'femur'
  },

  // ==================== MUSCULAR SYSTEM (Column X = -3 in Disassembled Grid) ====================
  {
    id: 'musculus-deltoideus-r',
    latinName: 'Musculus deltoideus dexter',
    englishName: 'Deltoid Muscle (Right)',
    system: 'muscular',
    region: 'Shoulder',
    side: 'right',
    terminologyCode: 'TA98: A04.6.02.002',
    description: 'Powerful triangular multipennate muscle capping the shoulder glenohumeral joint.',
    anatomicalDetails: {
      origin: 'Lateral third of clavicle, acromion, and scapular spine.',
      insertion: 'Deltoid tuberosity on middle lateral aspect of humerus.',
      innervation: 'Axillary nerve (C5-C6 posterior cord).',
      bloodSupply: 'Posterior circumflex humeral artery and deltoid branch of thoracoacromial.',
      action: 'Abduction of arm from 15° to 90° (multipennate central fibers); flexion/internal rotation (anterior); extension/external rotation (posterior).'
    },
    clinicalRelevance: 'Susceptible to denervation atrophy following anterior glenohumeral shoulder dislocation or surgical neck fracture of the humerus injuring the axillary nerve.',
    position: [1.75, 2.7, 0.15],
    disassembledPosition: [-3, 4.2, 0],
    scale: [0.95, 0.9, 0.95],
    geometryType: 'deltoid'
  },
  {
    id: 'musculus-pectoralis-major-r',
    latinName: 'Musculus pectoralis major dexter',
    englishName: 'Pectoralis Major (Right Chest Muscle)',
    system: 'muscular',
    region: 'Thorax',
    side: 'right',
    terminologyCode: 'TA98: A04.4.01.002',
    description: 'Thick, fan-shaped muscle situated at the upper and front part of the chest, forming the anterior axillary fold.',
    anatomicalDetails: {
      origin: 'Clavicular head (medial half of clavicle) and sternocostal head (sternum and costal cartilages 1-6).',
      insertion: 'Lateral lip of bicipital intertubercular groove of humerus.',
      innervation: 'Medial and lateral pectoral nerves (C5-T1).',
      bloodSupply: 'Pectoral branch of thoracoacromial trunk and lateral thoracic artery.',
      action: 'Adduction, internal rotation, and forward flexion of the humerus across thoracic wall.'
    },
    clinicalRelevance: 'Avulsion of the pectoralis tendon typically occurs during heavy bench pressing, causing sharp pain, audible pop, and loss of the anterior axillary wall contour.',
    position: [0.75, 2.45, 0.55],
    disassembledPosition: [-3, 2.6, 0],
    scale: [1.1, 0.95, 1.0],
    geometryType: 'pectoralis'
  },
  {
    id: 'musculus-biceps-brachii-r',
    latinName: 'Musculus biceps brachii dexter',
    englishName: 'Biceps Brachii (Right)',
    system: 'muscular',
    region: 'Upper Limb',
    side: 'right',
    terminologyCode: 'TA98: A04.6.02.005',
    description: 'Two-headed anterior compartment arm muscle crossing both the glenohumeral and humeroradial joints.',
    anatomicalDetails: {
      origin: 'Long head (supraglenoid tubercle of scapula); Short head (coracoid process).',
      insertion: 'Radial tuberosity and bicipital aponeurosis into deep forearm fascia.',
      innervation: 'Musculocutaneous nerve (C5-C6 lateral cord).',
      bloodSupply: 'Brachial artery muscular branches.',
      action: 'Chief supinator of the flexed forearm; powerful secondary flexor of the elbow joint.'
    },
    clinicalRelevance: 'Rupture of the long head of the biceps tendon generates the pathognomonic "Popeye muscle" deformity with distal retraction of the muscle belly.',
    position: [1.8, 1.8, 0.15],
    disassembledPosition: [-3, 1.0, 0],
    scale: [0.85, 1.1, 0.85],
    geometryType: 'biceps'
  },
  {
    id: 'musculus-rectus-abdominis',
    latinName: 'Musculus rectus abdominis',
    englishName: 'Rectus Abdominis ("Abs")',
    system: 'muscular',
    region: 'Abdomen',
    side: 'midline',
    terminologyCode: 'TA98: A04.5.01.001',
    description: 'Long paired strap muscle separated by the fibrous linea alba and segmented by three to four transverse tendinous intersections.',
    anatomicalDetails: {
      origin: 'Pubic crest and pubic symphysis.',
      insertion: 'Xiphoid process and 5th-7th costal cartilages.',
      innervation: 'Thoracoabdominal intercostal nerves (T7-T11) and subcostal nerve (T12).',
      bloodSupply: 'Superior and inferior epigastric arteries anastomosing within rectus sheath.',
      action: 'Flexion of lumbar spine, compression of abdominal viscera, and stabilization of pelvic tilt.'
    },
    clinicalRelevance: 'Diastasis recti is a separation of the left and right rectus bellies due to stretching of the linea alba, frequently seen in multiparous women or marked central adiposity.',
    position: [0, 1.15, 0.42],
    disassembledPosition: [-3, -0.6, 0],
    scale: [1.0, 1.15, 0.9],
    geometryType: 'rectusAbdominis'
  },
  {
    id: 'musculus-latissimus-dorsi-r',
    latinName: 'Musculus latissimus dorsi dexter',
    englishName: 'Latissimus Dorsi (Right Back Muscle)',
    system: 'muscular',
    region: 'Posterior Torso',
    side: 'right',
    terminologyCode: 'TA98: A04.3.01.011',
    description: 'Broadest muscle of the back, creating the V-taper of the posterior torso and forming the posterior axillary fold.',
    anatomicalDetails: {
      origin: 'Spinous processes T7-L5, thoracolumbar fascia, iliac crest, and inferior 3-4 ribs.',
      insertion: 'Floor of intertubercular bicipital groove of humerus.',
      innervation: 'Thoracodorsal nerve (C6-C8 posterior cord).',
      bloodSupply: 'Thoracodorsal artery (branch of subscapular).',
      action: 'Adduction, extension, and internal rotation of humerus ("swimmer\'s muscle").'
    },
    clinicalRelevance: 'The latissimus dorsi myocutaneous flap is a workhorse in reconstructive surgery for post-mastectomy breast reconstruction due to reliable single-pedicle perfusion.',
    position: [0.8, 1.6, -0.45],
    disassembledPosition: [-3, -2.2, 0],
    scale: [1.1, 1.2, 0.8],
    geometryType: 'latissimusDorsi'
  },
  {
    id: 'musculus-quadriceps-femoris-r',
    latinName: 'Musculus quadriceps femoris dexter',
    englishName: 'Quadriceps Femoris (Right)',
    system: 'muscular',
    region: 'Lower Limb',
    side: 'right',
    terminologyCode: 'TA98: A04.7.02.017',
    description: 'Massive four-bellied anterior thigh muscle group (rectus femoris, vastus lateralis, vastus medialis, vastus intermedius).',
    anatomicalDetails: {
      origin: 'AIIS (rectus femoris); greater trochanter, linea aspera, intertrochanteric line (vasti).',
      insertion: 'Tibial tuberosity via the common quadriceps tendon and patellar ligament.',
      innervation: 'Femoral nerve (L2, L3, L4).',
      bloodSupply: 'Lateral circumflex femoral artery and perforating branches of profunda femoris.',
      action: 'Primary extensor of the tibiofemoral knee joint; rectus femoris also assists hip flexion.'
    },
    clinicalRelevance: 'Testing the patellar tendon reflex (L3-L4 reflex arc) directly assesses quadriceps innervation and integrity of femoral nerve root signaling.',
    position: [0.75, -1.9, 0.45],
    disassembledPosition: [-3, -3.8, 0],
    scale: [1.0, 1.3, 0.95],
    geometryType: 'quadriceps'
  },

  // ==================== VISCERAL / ORGAN SYSTEM (Column X = 0 in Disassembled Grid) ====================
  {
    id: 'cor',
    latinName: 'Cor (Ventriculi et Atria cordis)',
    englishName: 'Heart',
    system: 'visceral',
    region: 'Thorax / Mediastinum',
    side: 'midline',
    terminologyCode: 'TA98: A12.1.00.001',
    description: 'Muscular four-chambered pump situated in the middle mediastinum, responsible for dual pulmonary and systemic hemodynamic circulation.',
    anatomicalDetails: {
      origin: 'Cardiogenic mesoderm, primitive heart tube looping (days 21-28 post-fertilization).',
      insertion: 'Suspended by fibrous pericardium and root of great vessels at T4-T5 sternal angle.',
      innervation: 'Cardiac plexus (sympathetic T1-T4 cervical ganglia; parasympathetic CN X Vagus).',
      bloodSupply: 'Left anterior descending (LAD), circumflex, and right coronary artery (RCA).',
      action: 'Generates systolic cardiac output (~5 L/min at rest) and diastolic ventricular filling.'
    },
    clinicalRelevance: 'Occlusion of the LAD ("widow maker") produces anterior myocardial infarction with ST-segment elevations in V1-V4, predisposing to cardiogenic shock or sudden ventricular fibrillation.',
    position: [-0.25, 2.2, 0.22],
    disassembledPosition: [0, 4.4, 0],
    scale: [0.95, 0.95, 0.95],
    geometryType: 'heart'
  },
  {
    id: 'pulmo-dexter',
    latinName: 'Pulmo dexter et sinister',
    englishName: 'Lungs (Bilateral)',
    system: 'visceral',
    region: 'Thorax',
    side: 'midline',
    terminologyCode: 'TA98: A06.5.01.001',
    description: 'Paired spongy respiratory viscera flanked by parietal and visceral pleural membranes, executing alveolar gas exchange.',
    anatomicalDetails: {
      origin: 'Laryngotracheal groove of foregut endoderm (branching morphogenesis).',
      insertion: 'Root of lung (hilum) anchored at T5-T7.',
      innervation: 'Pulmonary plexus (Vagus nerve parasympathetics; sympathetic T2-T5).',
      bloodSupply: 'Dual supply: Bronchial arteries (nutritive) and pulmonary arteries (functional alveolar deoxygenated blood).',
      action: 'Passive elastic recoil, surfactant-lowered alveolar oxygen-carbon dioxide diffusion.'
    },
    clinicalRelevance: 'Tension pneumothorax involves one-way valve pleural air trapping, generating mediastinal shift to the contralateral side, compression of the SVC, and severe obstructive shock.',
    position: [0, 2.35, 0.05],
    disassembledPosition: [0, 2.8, 0],
    scale: [1.25, 1.15, 1.1],
    geometryType: 'lungs'
  },
  {
    id: 'hepar',
    latinName: 'Hepar',
    englishName: 'Liver',
    system: 'visceral',
    region: 'Right Upper Quadrant (RUQ)',
    side: 'right',
    terminologyCode: 'TA98: A05.8.01.001',
    description: 'Largest internal solid metabolic organ, occupying the right hypochondrium and epigastrium, performing detoxification, gluconeogenesis, and bile secretion.',
    anatomicalDetails: {
      origin: 'Hepatic diverticulum of foregut endoderm and septum transversum.',
      insertion: 'Falciform ligament, coronary ligaments, and bare area attached to inferior diaphragm.',
      innervation: 'Hepatic plexus (Celiac ganglia and left anterior vagus).',
      bloodSupply: '75-80% from portal vein (nutrient-rich), 20-25% from hepatic artery proper (oxygen-rich).',
      action: 'Bile salt synthesis, ammonia to urea conversion, albumin & clotting factor production.'
    },
    clinicalRelevance: 'Portal hypertension secondary to liver cirrhosis prompts collateral portosystemic shunts, precipitating life-threatening esophageal varices and caput medusae.',
    position: [0.45, 1.35, 0.2],
    disassembledPosition: [0, 1.2, 0],
    scale: [1.2, 0.85, 1.0],
    geometryType: 'liver'
  },
  {
    id: 'gaster',
    latinName: 'Gaster / Ventriculus',
    englishName: 'Stomach',
    system: 'visceral',
    region: 'Left Upper Quadrant (LUQ)',
    side: 'left',
    terminologyCode: 'TA98: A05.5.01.001',
    description: 'J-shaped intraperitoneal muscular reservoir of the alimentary tract mediating mechanical churning and enzymatic gastric acid digestion.',
    anatomicalDetails: {
      origin: 'Foregut dilation during 4th week, clockwise 90-degree embryologic rotation.',
      insertion: 'Suspended between lower esophageal sphincter (LES) and pyloric sphincter.',
      innervation: 'Anterior and posterior vagal trunks (parasympathetic secretomotor); sympathetic from T6-T9 celiac plexus.',
      bloodSupply: 'Left and right gastric arteries (lesser curve); left and right gastro-omental arteries (greater curve).',
      action: 'Secretes hydrochloric acid, intrinsic factor (parietal cells), pepsinogen (chief cells), and gastrin (G cells).'
    },
    clinicalRelevance: 'Autoimmune destruction of gastric parietal cells in chronic atrophic gastritis causes intrinsic factor deficiency, precipitating Pernicious Anemia (macrocytic megaloblastic anemia).',
    position: [-0.45, 1.25, 0.28],
    disassembledPosition: [0, -0.4, 0],
    scale: [0.95, 0.9, 0.95],
    geometryType: 'stomach'
  },
  {
    id: 'renes',
    latinName: 'Renes (Ren dexter et sinister)',
    englishName: 'Kidneys (Bilateral)',
    system: 'visceral',
    region: 'Retroperitoneum (T12-L3)',
    side: 'midline',
    terminologyCode: 'TA98: A08.1.01.001',
    description: 'Bean-shaped retroperitoneal organs regulating blood plasma filtration, electrolyte balance, blood pressure (RAAS), and erythropoietin secretion.',
    anatomicalDetails: {
      origin: 'Ureteric bud and metanephric blastema (metanephros).',
      insertion: 'Encased within renal capsule, perinephric fat, and Gerota\'s fascia.',
      innervation: 'Renal plexus (sympathetic T10-L1 vasoconstriction; sensory afferents for renal capsule distension).',
      bloodSupply: 'Renal arteries arising directly from abdominal aorta at L1-L2; receives ~20-25% of resting cardiac output.',
      action: 'Glomerular filtration rate (GFR ~125 mL/min), renin-angiotensin-aldosterone axis activation.'
    },
    clinicalRelevance: 'Renal artery stenosis triggers excessive renin release by juxtaglomerular apparatus, generating refractory secondary renovascular hypertension.',
    position: [0, 1.05, -0.22],
    disassembledPosition: [0, -2.0, 0],
    scale: [1.15, 0.85, 0.8],
    geometryType: 'kidneys'
  },
  {
    id: 'encephalon',
    latinName: 'Encephalon (Cerebrum, Cerebellum, Truncus)',
    englishName: 'Brain (Cerebrum & Cerebellum)',
    system: 'visceral',
    region: 'Cranial Cavity',
    side: 'midline',
    terminologyCode: 'TA98: A14.1.00.001',
    description: 'Master central processing center containing over 86 billion neurons, housed within meninges and bathed in cerebrospinal fluid.',
    anatomicalDetails: {
      origin: 'Prosencephalon, Mesencephalon, and Rhombencephalon neural tube vesicles.',
      insertion: 'Resting upon internal cranial fossa, continuous with spinal cord at foramen magnum.',
      innervation: 'Pia, arachnoid, and dura mater innervated by ophthalmic branch of trigeminal and upper cervical nerves.',
      bloodSupply: 'Circle of Willis (anastomosis of bilateral internal carotids and basilar artery).',
      action: 'Higher cognition, motor planning, emotional integration, autonomic regulation.'
    },
    clinicalRelevance: 'Middle cerebral artery (MCA) occlusion results in contralateral hemiplegia and sensory loss predominantly affecting face and arm, alongside aphasia (dominant hemisphere) or hemineglect.',
    position: [0, 4.45, 0.05],
    disassembledPosition: [0, -3.6, 0],
    scale: [0.95, 0.95, 0.95],
    geometryType: 'brain'
  },

  // ==================== NERVOUS SYSTEM (Column X = +3 in Disassembled Grid) ====================
  {
    id: 'medulla-spinalis',
    latinName: 'Medulla spinalis',
    englishName: 'Spinal Cord',
    system: 'nervous',
    region: 'Vertebral Canal',
    side: 'midline',
    terminologyCode: 'TA98: A14.1.02.001',
    description: 'Cylindrical nerve tissue cable extending from the medulla oblongata to the conus medullaris (terminating at L1-L2 in adults).',
    anatomicalDetails: {
      origin: 'Caudal portion of neural tube.',
      insertion: 'Ends at conus medullaris, anchored distally to coccyx by filum terminale.',
      innervation: '31 pairs of spinal nerves (8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal).',
      bloodSupply: 'One anterior spinal artery (anterior 2/3) and two posterior spinal arteries (posterior 1/3), supplemented by artery of Adamkiewicz.',
      action: 'Bilateral bidirectional tract conduit for motor pyramidal tracts and sensory anterolateral/dorsal columns.'
    },
    clinicalRelevance: 'Anterior spinal artery syndrome produces bilateral motor paralysis and loss of pain/temperature below the lesion, while preserving fine touch, vibration, and proprioception (dorsal columns).',
    position: [0, 2.05, -0.28],
    disassembledPosition: [3, 3.8, 0],
    scale: [0.35, 1.5, 0.35],
    geometryType: 'spinalCord'
  },
  {
    id: 'nervus-ischiadicus-r',
    latinName: 'Nervus ischiadicus dexter',
    englishName: 'Sciatic Nerve (Right)',
    system: 'nervous',
    region: 'Gluteal & Posterior Thigh',
    side: 'right',
    terminologyCode: 'TA98: A14.2.07.046',
    description: 'The thickest and longest nerve in the human body (up to 2 cm in diameter), formed by the anterior rami of L4-S3 spinal nerves.',
    anatomicalDetails: {
      origin: 'Sacral plexus (ventral rami L4 through S3).',
      insertion: 'Exits pelvis via greater sciatic foramen below piriformis muscle, divides into tibial and common fibular nerves at popliteal fossa.',
      innervation: 'Motor to posterior thigh hamstrings; sensory to entire leg below knee except medial border.',
      bloodSupply: 'Arteria comitans nervi ischiadici (branch of inferior gluteal artery).',
      action: 'Powers knee flexion and all movements of the ankle and toes.'
    },
    clinicalRelevance: 'Intramuscular gluteal injections must strictly be administered in the upper outer quadrant (dorsogluteal/ventrogluteal) to avoid catastrophic iatrogenic injury to the sciatic nerve.',
    position: [0.75, -1.8, -0.15],
    disassembledPosition: [3, 0.5, 0],
    scale: [0.3, 1.4, 0.3],
    geometryType: 'sciaticNerve'
  },

  // ==================== VASCULAR SYSTEM (Column X = +6 in Disassembled Grid) ====================
  {
    id: 'aorta',
    latinName: 'Aorta (Ascendens, Arcus, Thoracica, Abdominalis)',
    englishName: 'Aorta (Main Trunk)',
    system: 'vascular',
    region: 'Thorax & Abdomen',
    side: 'midline',
    terminologyCode: 'TA98: A12.2.01.001',
    description: 'Primary elastic conduit distributing oxygenated stroke volume from the left ventricle under high systolic systemic pressure.',
    anatomicalDetails: {
      origin: 'Aortic vestibule of left ventricle at aortic valve.',
      insertion: 'Bifurcates at L4 into left and right common iliac arteries.',
      innervation: 'Aortic baroreceptor afferents via aortic nerve branch of Vagus (CN X).',
      bloodSupply: 'Vasa vasorum supplying tunica adventitia and outer media.',
      action: 'Windkessel compliance effect smoothing pulsatile left ventricular stroke volume into steady forward flow.'
    },
    clinicalRelevance: 'Abdominal aortic aneurysm (AAA) is defined as dilation > 3.0 cm, predominantly infrarenal. Rupture presents with triad of hypotension, sudden tearing flank pain, and a pulsatile abdominal mass.',
    position: [-0.08, 1.95, 0.08],
    disassembledPosition: [6, 3.0, 0],
    scale: [0.55, 1.45, 0.55],
    geometryType: 'aorta'
  },
  {
    id: 'vena-cava-inferior',
    latinName: 'Vena cava inferior',
    englishName: 'Inferior Vena Cava (IVC)',
    system: 'vascular',
    region: 'Abdomen & Retroperitoneum',
    side: 'right',
    terminologyCode: 'TA98: A12.3.09.001',
    description: 'Large retroperitoneal vein formed by convergence of common iliac veins at L5, draining venous blood from below diaphragm to right atrium.',
    anatomicalDetails: {
      origin: 'Union of left and right common iliac veins at L5 vertebra.',
      insertion: 'Pierces central tendon of diaphragm at T8 caval hiatus into inferior right atrium.',
      innervation: 'Splanchnic sympathetic vasoconstrictor tone.',
      bloodSupply: 'Vasa vasorum.',
      action: 'Low-pressure capacitance conduit returning ~75% of total venous return to the heart.'
    },
    clinicalRelevance: 'In late pregnancy, supine position allows gravid uterus to compress IVC, causing "Supine Hypotensive Syndrome" reversible by left lateral tilt.',
    position: [0.18, 1.75, 0.05],
    disassembledPosition: [6, -1.0, 0],
    scale: [0.5, 1.4, 0.5],
    geometryType: 'venaCava'
  }
];
