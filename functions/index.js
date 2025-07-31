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
async function sendEmailNotification(type, data) {
  const fromUser = data.createdBy;
  const toUsers = ["ludovicmarion70@gmail.com", "obegoud@gmail.com"];

  let subject;
  if (type === "memories") {
    subject = "Un nouveau souvenir a été partagé sur votre espace Oli & Ludo";
  } else {
    subject = "Une nouvelle conversation a été ajoutée sur votre espace Oli & Ludo";
  }

  let link;
  if (type === "memories") {
    link = "https://Olitludo.netlify.app/souvenirs";
  } else {
    link = "https://Olitludo.netlify.app/messages";
  }

  const typeLabel = type === "memories" ? "souvenir" : "message";
  const linkStyle = [
    "padding:10px 15px;",
    "background:#ff6b6b; color:#fff;",
    "border-radius:8px; text-decoration:none;",
  ].join(" ");

  const msg = {
    to: toUsers,
    from: "ludovicmarion70@gmail.com",
    subject,
    text: `Bonjour,

${fromUser} vient de partager un nouveau ${typeLabel} sur votre espace personnel Oli & Ludo.

Détails :
Titre : ${data.title}

Description :
${data.description}

Vous pouvez consulter ce contenu en vous rendant sur votre espace via le lien suivant :
${link}

Ceci est un message automatique généré par la plateforme Oli & Ludo.`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
        <h2 style="color: #444;">Un nouveau ${typeLabel} a été partagé</h2>
        <p>Bonjour,</p>
        <p><strong>${fromUser}</strong> a récemment partagé un nouveau ${typeLabel} sur votre espace personnel <strong>Oli & Ludo</strong>.</p>
        <p><strong>Titre :</strong> ${data.title}</p>
        <p><strong>Description :</strong></p>
        <p style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">${data.description}</p>
        <p style="margin-top: 20px;">
          <a href="${link}" style="${linkStyle}">
            Accéder au contenu sur la plateforme
          </a>
        </p>
        <hr style="margin: 30px 0;"/>
        <p style="font-size: 0.9em; color: #888;">Ce message a été généré automatiquement par la plateforme Oli & Ludo. Merci de ne pas y répondre directement.</p>
      </div>
    `,
  };

  return sgMail.send(msg);
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
