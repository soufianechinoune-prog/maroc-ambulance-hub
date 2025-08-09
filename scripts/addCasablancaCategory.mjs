import fs from "fs";
import path from "path";

const BLOG_DIR = path.resolve("src/content/blog");
const isMd = (f: string) => f.endsWith(".md");

const readFM = (txt: string) => {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/m.exec(txt);
  if (!m) return { fm: {} as Record<string, any>, body: txt };
  const raw = m[1];
  const body = m[2] ?? "";
  const fm: Record<string, any> = {};
  for (const line of raw.split("\n")) {
    const l = line.trim();
    if (!l || l.startsWith("#")) continue;
    const kv = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(l);
    if (!kv) continue;
    const key = kv[1].trim();
    let val: any = kv[2].trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s: string) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      val = val.replace(/^["']|["']$/g, "");
    }
    fm[key] = val;
  }
  return { fm, body };
};

const writeFM = (fm: Record<string, any>, body: string) => {
  const lines: string[] = [];
  for (const [k, v] of Object.entries(fm)) {
    if (Array.isArray(v)) {
      lines.push(`${k}: [${v.map((x) => (typeof x === "string" ? `"${x}"` : x)).join(", ")}]`);
    } else {
      lines.push(`${k}: ${typeof v === "string" ? `"${v}"` : v}`);
    }
  }
  return `---\n${lines.join("\n")}\n---\n${body.startsWith("\n") ? body : "\n" + body}`;
};

const files = fs.readdirSync(BLOG_DIR).filter(isMd);
let changed = 0;
for (const file of files) {
  const full = path.join(BLOG_DIR, file);
  const src = fs.readFileSync(full, "utf8");
  const { fm, body } = readFM(src);

  const city = String(fm.city || "").toLowerCase().trim();
  if (city !== "casablanca") {
    console.log(`ℹ️  ${file} : city="${city || "(none)"}" → ignoré`);
    continue;
  }

  let cats = fm.categories;
  if (!Array.isArray(cats)) cats = [];
  const next = Array.from(
    new Set([...cats.map((c: any) => String(c).toLowerCase().trim()), "casablanca"]) 
  ).filter(Boolean);

  const changedCats = JSON.stringify(cats) !== JSON.stringify(next);
  if (changedCats) {
    fm.categories = next;
    const out = writeFM(fm, body);
    fs.writeFileSync(full, out, "utf8");
    changed++;
    console.log(`✅ ${file} : categories mis à jour → [${next.join(", ")}]`);
  } else {
    console.log(`✔︎  ${file} : categories déjà OK → [${cats.join(", ")}]`);
  }
}
console.log(`\nDone. Fichiers modifiés: ${changed}`);
