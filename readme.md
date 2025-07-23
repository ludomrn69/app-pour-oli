# 🚀 Guide d'installation - App pour Oli avec Firebase & Netlify

## 📋 Prérequis

- Un compte [Firebase](https://firebase.google.com/)
- Un compte [Netlify](https://netlify.com/)
- Un compte GitHub (déjà fait ✅)

## 🔥 Configuration Firebase

### 1. Créer un projet Firebase

1. Va sur [Firebase Console](https://console.firebase.google.com/)
2. Clique sur "Créer un projet"
3. Nomme-le "app-pour-oli" 
4. Accepte les conditions et créé le projet

### 2. Configurer Authentication

1. Dans la console Firebase, va dans **Authentication > Sign-in method**
2. Active **Email/Password**
3. Dans **Users**, ajoute manuellement 2 comptes :
   - Ton email + mot de passe
   - L'email d'Oli + mot de passe

### 3. Configurer Firestore Database

1. Va dans **Firestore Database**
2. Clique "Créer une base de données"
3. Choisis **Mode test** pour commencer
4. Sélectionne une région proche (europe-west1 par exemple)
5. Une fois créé, va dans **Règles** et colle le contenu du fichier `firestore.rules`

### 4. Configurer Storage

1. Va dans **Storage**
2. Clique "Commencer"
3. Choisis la même région que Firestore
4. Va dans **Règles** et colle le contenu du fichier `storage.rules`

### 5. Récupérer les clés de configuration

1. Va dans **Paramètres du projet** (icône engrenage)
2. Dans l'onglet **Général**, descends jusqu'à "Vos applications"
3. Clique sur **Web** (icône `</>`)
4. Enregistre l'app avec le nom "app-pour-oli"
5. Copie la configuration qui s'affiche

## 📝 Mise à jour du code

### 1. Remplacer la configuration Firebase

Dans **tous** les fichiers HTML (admin.html, souvenirs.html, messages.html), remplace :

```javascript
const firebaseConfig = {
    apiKey: "ton-api-key",
    authDomain: "app-pour-oli.firebaseapp.com",
    projectId: "app-pour-oli",
    storageBucket: "app-pour-oli.appspot.com",
    messagingSenderId: "123456789",
    appId: "ton-app-id"
};
```

Par tes vraies clés récupérées dans Firebase.

### 2. Ajouter les nouveaux fichiers

Ajoute ces fichiers à ton repo GitHub :

- `admin.html` (page d'administration)
- `netlify.toml` (configuration Netlify)
- Remplace `souvenirs.html` et `messages.html` par les versions mises à jour

### 3. Mettre à jour la navigation

Dans `index.html`, ajoute le lien Admin dans la navigation :

```html
<li class="nav-item">
    <a href="admin.html" class="nav-link">Admin</a>
</li>
```

## 🌐 Déploiement sur Netlify

### 1. Connecter le repo GitHub

1. Va sur [Netlify](https://netlify.com) et connecte-toi
2. Clique "New site from Git"
3. Choisis GitHub et sélectionne ton repo "app-pour-oli"
4. Les paramètres par défaut sont corrects grâce au `netlify.toml`
5. Clique "Deploy site"

### 2. Configuration du domaine (optionnel)

1. Dans les paramètres Netlify, tu peux changer l'URL
2. Ou configurer un domaine personnalisé si tu en as un

## 🔐 Configuration de la sécurité

### 1. URLs autorisées dans Firebase

1. Dans Firebase Console > Authentication > Settings
2. Dans "Authorized domains", ajoute ton domaine Netlify
3. Format : `ton-site-name.netlify.app`

### 2. Test de la sécurité

1. Va sur ton site déployé
2. Essaie d'accéder à `/admin.html`
3. Tu dois être redirigé vers la page de connexion
4. Teste la connexion avec tes identifiants

## 📱 Utilisation

### 1. Ajouter des souvenirs

1. Va sur `ton-site.netlify.app/admin.html`
2. Connecte-toi avec tes identifiants
3. Utilise le formulaire "Ajouter un Souvenir"
4. Les souvenirs apparaîtront automatiquement sur la page souvenirs

### 2. Ajouter des conversations

1. Même processus que les souvenirs
2. Upload un screenshot de conversation
3. Ajoute une description du contexte

## 🔧 Fonctionnalités

### ✅ Ce qui fonctionne maintenant :

- ✅ Authentification sécurisée (seuls toi et Oli pouvez ajouter du contenu)
- ✅ Upload d'images automatique
- ✅ Affichage en temps réel des nouveaux contenus
- ✅ Design responsive et animations
- ✅ Sauvegarde automatique dans le cloud
- ✅ Sécurisé et privé

### 🚀 Améliorations possibles :

- 📧 Notifications email lors d'un nouvel ajout
- 💬 Système de commentaires privés
- 📅 Calendrier des souvenirs
- 🎵 Player de musiques de votre relation
- 📍 Carte des lieux visités ensemble

## 🆘 Troubleshooting

### Erreur "Permission denied"
- Vérifie que l'utilisateur est bien ajouté dans Firebase Auth
- Vérifie que les règles Firestore sont bien configurées

### Images ne s'affichent pas
- Vérifie les règles Storage
- Vérifie que le domaine est autorisé dans Firebase

### Site ne se déploie pas
- Vérifie que tous les fichiers sont bien dans le repo
- Regarde les logs de déploiement dans Netlify

## 💡 Tips

1. **Backup des données** : Firebase sauvegarde automatiquement, mais tu peux exporter les données depuis la console

2. **Partage sécurisé** : L'URL admin ne devrait être connue que de vous deux

3. **Photos** : Optimise les photos avant upload (pas plus de 2MB recommandé)

4. **Mobile** : L'interface est responsive, parfait pour ajouter du contenu depuis vos téléphones

## 💕 Enjoy !

Maintenant vous pouvez tous les deux ajouter des souvenirs et des conversations directement depuis n'importe où ! C'est votre petit coin privé sur internet pour conserver tous vos beaux moments ensemble ✨

---

*N'hésite pas si tu as des questions ou si tu veux ajouter d'autres fonctionnalités !*