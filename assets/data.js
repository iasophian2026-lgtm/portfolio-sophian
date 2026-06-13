/* Portfolio Sophian Abdessadok — données structurées */
window.PORTFOLIO = {
  identite: {
    nom: "Sophian Abdessadok",
    titre: "Designer Produit industriel / UX",
    exp: "+15 ans",
    ville: "Lyon",
    mail: "sophian.designer@gmail.com",
    site: "www.abdessadok.com"
  },
  metiers: [
    {
      id: "produit",
      num: "01",
      titre: "Design Produit",
      tagline: "Donner une forme juste à l'usage.",
      body: "+15 ans à concevoir des objets industriels — du high-tech au mobilier urbain. J'aborde chaque projet par l'usage, la matière et la justesse formelle, du croquis au fichier SolidWorks.",
      meta: ["Industriel", "Mobilier", "Transport", "High-tech"],
      projets: [
        { slug:"01_spark", nom:"Spark", sub:"Cordon flexible et intelligent pour écouteurs", client:"Wizyfab (Kickstarter)", desc:"Cordon malléable, puce NFC intégrée, fermeture magnétique. 320 % de l'objectif Kickstarter, 29 354 €, 1 026 contributeurs, 1 brevet déposé.", gallery:["hero","usage","nfc","stand"] },
        { slug:"02_bus_bhns", nom:"Bus BHNS Mercedes", sub:"Redesign face avant + livrées — Ligne RTM", client:"Ville de Marseille", desc:"Design amical et intemporel, cohérent avec les lignes de tramway existantes. Nouvelle face avant et déclinaisons de livrées latérales.", gallery:["3q","v1","v2","v3"] },
        { slug:"03_ecrin", nom:"Cave à vin Écrin", sub:"Armoire à vin haut de gamme", client:"Wincave (Darty)", desc:"Une approche sensorielle du vin, de la terre et du raffinement, pour distinguer le produit du « blanc » électroménager. Coloris : brun normand, terre cendrée, noir.", gallery:["produit","moodboard","coloris"] },
        { slug:"04_curve", nom:"Fauteuil Curve", sub:"Le confort à l'extérieur", client:"Variation", desc:"Fauteuil de relaxation outdoor haut de gamme, en éco-conception. Tout en courbes, une lecture qui évoque le confort et le bien-être. Structure motorisée.", gallery:["hero","coussins","structure"] },
        { slug:"05_luminaire_r", nom:"Luminaire R", sub:"Lampadaire à rupture géométrique", client:"Agence Poisson Rouge", desc:"Sur une typologie classique de lampadaire, une rupture géométrique crée une lecture ambiguë et mystérieuse du luminaire.", gallery:["rendu","context"] },
        { slug:"06_ilo", nom:"Brumisateur Ilo", sub:"Brumisateur haut de gamme — CHR", client:"Atech / Arius", desc:"Une nouvelle typologie de brumisateur, immédiatement identifiable et positionnée haut de gamme, qui s'intègre aux univers des brasseries et cafés.", gallery:["hero","terrasse","variantes"] },
        { slug:"07_rl2008", nom:"Débroussailleuse RL 2008", sub:"Nouvelle gamme faucheuses-broyeuses", client:"Rocques et Lecoeur", desc:"Fer de lance de la marque, le RL 2008 fixe les orientations techniques et esthétiques de la future gamme de faucheuses-broyeuses.", gallery:["hero","existant"] },
        { slug:"08_tramway_3d", nom:"Tramway Nantes 3D", sub:"Maquette échelle 1:50 — SolidWorks", client:"Agence Avant Première", desc:"Modélisation 3D d'un tramway existant pour la réalisation d'une maquette à l'échelle 1:50, sous SolidWorks.", gallery:["side","3q"] },
        { slug:"09_cosy", nom:"Siège TGV Cosy Line", sub:"2e classe — usages connectés", client:"Avant Première", desc:"Siège TGV 2e classe aux normes du transport public, adapté aux voyageurs connectés. Encombrement d'assise réduit et lecture lounge.", gallery:["hero","ergonomie","detail"] },
        { slug:"10_station", nom:"Station Bus BHNS", sub:"Espace d'attente + mobilier urbain", client:"Avant Première", desc:"Station d'accueil pour Bus à Haut Niveau de Service : un espace d'attente confortable et une ligne complète de mobilier urbain.", gallery:["hero","top","lateral"] },
        { slug:"11_litli", nom:"Lit Li", sub:"Lit interactif parent-bébé", client:"Agence Poisson Rouge", desc:"Une dimension relationnelle et affective entre parents et bébé, en trois phases d'usage : accueil, observation, échange physique.", gallery:["hero","usage_1","usage_2"] },
        { slug:"12_gem", nom:"Échantillon GEM", sub:"Matériautech d'Oyonnax", client:"Matériautech d'Oyonnax", desc:"Le nouveau design des échantillons plastiques : un objet séduisant et ludique, à la fois technique et émotionnel, parlant aux industriels comme aux citoyens.", gallery:["hero","moodboard","coloris"] }
      ]
    },
    {
      id: "ux",
      num: "02",
      titre: "UX / UI",
      tagline: "L'interface disparaît, l'usage reste.",
      body: "Emouvoir, séduire, convaincre, donner au produit ce supplément d'âme qui fait la différence. Parce que le renouvellement fréquent de l'offre engendre un souci permanent de créativité… mon objectif sur chaque étude est d'apporter des solutions novatrices sachant dégager un équilibre optimal entre les attentes fonctionnelles, esthétiques et techniques de l'usager et les contraintes inhérentes à la production industrielle.",
      meta: ["Mobile", "Web", "Parcours", "Inclusif"],
      projets: [
        { slug:"app_01_effigy", nom:"Effigy", sub:"App mobile — traitement du visage", client:"Studio", desc:"Application iOS spécialisée dans la mise en scène du visage : filtres photo, styles, collages et portraits.", gallery:["hero","panorama","detail_1","detail_2"] },
        { slug:"com_04_ux", nom:"UX Immobilier", sub:"Configurateur de maison", client:"BDP Construction", desc:"Interface web pour configurer une maison : wireframes, parcours et grille responsive multi-écrans.", gallery:["wireframes","interface","ecrans"] }
      ]
    },
    {
      id: "com",
      num: "03",
      titre: "Communication",
      tagline: "Une idée, déclinée avec rigueur.",
      body: "Direction artistique et communication globale : print, web, presse, événementiel. Une même intention portée sur tous les supports.",
      meta: ["Direction artistique", "Print", "Branding", "Événementiel"],
      projets: [
        { slug:"com_01_lido", nom:"Lido de Paris", sub:"« Paris Merveilles » by Franco Dragone", client:"Lido de Paris", desc:"Direction artistique et communication événementielle autour du spectacle « Paris Merveilles ».", gallery:["affiche"] },
        { slug:"com_02_bastides", nom:"Bastides & Demeures", sub:"« Bâtisseur d'Émotions »", client:"Bastides & Demeures Provençales", desc:"Branding et illustration : un univers d'aquarelle autour de la maison provençale.", gallery:["key"] },
        { slug:"com_03_hi", nom:"Handicap International", sub:"Communication multisupport", client:"Handicap International", desc:"Print, web et presse : affiche « Sac à Sapin », site e-commerce et page presse « Urgence Corne de l'Afrique ».", gallery:["print","web","press"] }
      ]
    },
    {
      id: "photo",
      num: "04",
      titre: "Photographie",
      tagline: "Regarder la ville autrement.",
      body: "Photographie urbaine et architecture nocturne. Lignes, lumière et silhouettes — un regard de designer sur l'espace public.",
      meta: ["Urbain", "Nocturne", "Architecture", "Street"],
      projets: [
        { slug:"photo_01", nom:"Escalier — perspective", sub:"Couloir de métro, contre-plongée", client:"Série urbaine", desc:"Contre-plongée d'un couloir béton, silhouette en contre-jour, lumière blanche.", gallery:["escalier"] },
        { slug:"photo_02", nom:"Surplomb — runner", sub:"Plongée, mouvement", client:"Série urbaine", desc:"Plongée sur une piétonne en mouvement ; béton, reflet de vitrine, lumière rasante.", gallery:["runner"] },
        { slug:"photo_03", nom:"Fête des Lumières", sub:"Lyon, nuit", client:"Série urbaine", desc:"Sphères lumineuses bleues suspendues, foule, grande roue en arrière-plan.", gallery:["fete"] },
        { slug:"photo_04", nom:"Mairie — nuit", sub:"Façade néoclassique illuminée", client:"Série urbaine", desc:"Longue exposition d'une façade illuminée en bleu, colonnes, nuit noire.", gallery:["mairie"] }
      ]
    }
  ]
};
