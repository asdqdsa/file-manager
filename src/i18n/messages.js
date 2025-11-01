export const messages = {
  en: {
    welcome: (name) => `Welcome to the File Manager, ${name}!`,
    goodbye: (name) => `Thank you for using File Manager, ${name}, goodbye!`,
    cwd: (path) => `You are currently in ${path}`,
    invalidInput: "Invalid input",
    operationFailed: "Operation failed",
    operationSuccess: "Operation successful",
  },
  fr: {
    welcome: (name) => `Bienvenue dans le gestionnaire de fichiers, ${name}!`,
    goodbye: (name) =>
      `Merci d'avoir utilisé le gestionnaire de fichiers, ${name}, au revoir!`,
    cwd: (path) => `Vous êtes actuellement dans ${path}`,
    invalidInput: "Entrée invalide",
    operationFailed: "Opération échouée",
    operationSuccess: "Opération réussie",
  },
};
