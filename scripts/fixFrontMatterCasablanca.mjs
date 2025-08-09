/**
 * Script pour ajouter `city: casablanca` et `categories` aux fichiers .md
 * qui contiennent "casablanca" dans le nom mais n'ont pas encore la clé.
 * Usage: node scripts/fixFrontMatterCasablanca.mjs
 */

import fs from "fs";
import path from "path";

const blogDir = path.join(process.cwd(), "src", "content", "blog");

if (!fs.existsSync(blogDir)) {
  console.error("Dossier introuvable:", blogDir);
  process.exit(1);
}

const files = fs.readdirSync(blogDir);
let updated = 0;

files.forEach((file) => {
  if (!file.endsWith(".md")) return;
  if (!file.toLowerCase().includes("casablanca")) return;

  const fullPath = path.join(blogDir, file);
  let content = fs.readFileSync(fullPath, "utf-8");

  // Détecter si front-matter contient déjà city:
  if (/^city:/m.test(content)) {
    console.log(`✅ ${file} : city déjà présent`);
    return;
  }

  if (content.startsWith("---\n")) {
    // Ajouter juste après le '---' d'ouverture
    content = content.replace(
      /^---\n/,
      `---\ncity: casablanca\ncategories: [toutes-les-villes, casablanca]\n`
    );
  } else {
    // Pas de front-matter → on en crée un
    content = `---\ncity: casablanca\ncategories: [toutes-les-villes, casablanca]\n---\n\n` + content;
  }

  fs.writeFileSync(fullPath, content, "utf-8");
  updated++;
  console.log(`✏️ Ajouté city: casablanca à ${file}`);
});

console.log(`✅ Mise à jour terminée ! Fichiers modifiés: ${updated}`);
