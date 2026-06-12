// Build the app and publish app/dist to the gh-pages branch.
// Usage: npm run deploy   (from app/)
import { execSync } from "node:child_process";
import { rmSync, writeFileSync } from "node:fs";

const REPO = "https://github.com/rounakjain2604/fr-study-os.git";
const run = (cmd, cwd) => execSync(cmd, { stdio: "inherit", cwd });

run("npm run build");
writeFileSync("dist/.nojekyll", "");
rmSync("dist/.git", { recursive: true, force: true });

run("git init", "dist");
run("git checkout -b gh-pages", "dist");
run("git add -A", "dist");
run('git commit -m "Deploy build"', "dist");
run(`git push --force ${REPO} gh-pages`, "dist");
rmSync("dist/.git", { recursive: true, force: true });

console.log("\nDeployed. Live in ~1 minute at https://rounakjain2604.github.io/fr-study-os/");
