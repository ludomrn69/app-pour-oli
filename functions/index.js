const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {initializeApp} = require("firebase-admin/app");
const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

initializeApp();

// Configuration SendGrid - utilise .env en local et
// functions.config() en production
const sendGridKey = process.env.SENDGRID_KEY ||
  (functions.config().sendgrid && functions.config().sendgrid.key);
sgMail.setApiKey(sendGridKey);

// Mapping des emails
const USERS = {
  "ludovicmarion70@gmail.com": "obegoud@gmail.com",
  "obegoud@gmail.com": "ludovicmarion70@gmail.com",
};

/**
 * Envoie un e-mail via SendGrid à l'autre utilisateur quand un souvenir ou une
 * conversation est ajouté(e).
 * @param {string} type - Le type de contenu : "memories" ou "conversations".
 * @param {Object} data - Les données du document Firestore (title,
 * description, createdBy...).
 * @return {Promise} Une promesse de l'envoi d'e-mail via SendGrid.
 */
function sendEmailNotification(type, data) {
  const fromUser = data.createdBy;
  const toUsers = Object.keys(USERS);

  let subject;
  if (type === "memories") {
    subject = "Nouveau souvenir ajouté ✨";
  } else {
    subject = "Nouvelle conversation 💬";
  }

  let link;
  if (type === "memories") {
    link = "https://olietludo.netlify.app/souvenirs";
  } else {
    link = "https://olietludo.netlify.app/messages";
  }

  const typeLabel = type === "memories" ? "souvenir" : "message";
  const linkStyle = [
    "padding:10px 15px;",
    "background:#ff6b6b; color:#fff;",
    "border-radius:8px; text-decoration:none;",
  ].join(" ");

  const html = `
<p>Hey 👋</p>
<p><strong>${fromUser}</strong> a ajouté un nouveau ${typeLabel} !</p>
<p><strong>Titre :</strong> ${data.title}</p>
<p><strong>Description :</strong><br/>${data.description}</p>
<p>
  <a href="${link}" style="${linkStyle}">
    Voir sur le site ❤️
  </a>
</p>
`;

  const msg = {
    to: toUsers,
    from: "ludovicmarion70@gmail.com",
    subject,
    html,
  };

  return sgMail.sendMultiple(msg);
}

/**
 * Envoie un e-mail lorsqu'un nouveau souvenir est ajouté.
 */
exports.notifyOnMemoryAdd = onDocumentCreated(
    {
      document: "memories/{id}",
      region: "us-central1",
    },
    async (event) => {
      try {
        const data = event.data.data();
        console.log("New memory added:", data);

        if (!data.createdBy) {
          console.log("No createdBy field found");
          return null;
        }

        const result = await sendEmailNotification("memories", data);
        console.log("Email sent successfully");
        return result;
      } catch (error) {
        console.error("Error sending email:", error);
        throw error;
      }
    },
);

/**
 * Envoie un e-mail lorsqu'une nouvelle conversation est ajoutée.
 */
exports.notifyOnMessageAdd = onDocumentCreated(
    {
      document: "conversations/{id}",
      region: "us-central1",
    },
    async (event) => {
      try {
        const data = event.data.data();
        console.log("New conversation added:", data);

        if (!data.createdBy) {
          console.log("No createdBy field found");
          return null;
        }

        const result = await sendEmailNotification("conversations", data);
        console.log("Email sent successfully");
        return result;
      } catch (error) {
        console.error("Error sending email:", error);
        throw error;
      }
    },
);
