import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pkgPath = path.join(root, 'package.json');
const lockPath = path.join(root, 'package-lock.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const sections = ['dependencies', 'devDependencies', 'optionalDependencies'];
const blocked = /@tailwindcss\/oxide-(win32|darwin|android|freebsd)/;
const blockedMessage =
  'Tailwind installs the correct oxide binary via @tailwindcss/oxide optional deps.';

for (const section of sections) {
  const deps = pkg[section];
  if (!deps) continue;
  for (const name of Object.keys(deps)) {
    if (blocked.test(name)) {
      console.error(
        `verify-no-platform-deps: remove ${name} from package.json ${section}. ${blockedMessage}`,
      );
      process.exit(1);
    }
  }
}

if (fs.existsSync(lockPath)) {
  const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
  const rootDeps = lock.packages?.['']?.dependencies;
  if (rootDeps) {
    for (const name of Object.keys(rootDeps)) {
      if (blocked.test(name)) {
        console.error(
          `verify-no-platform-deps: remove ${name} from package-lock.json root dependencies ` +
            `(run npm install after fixing package.json). ${blockedMessage}`,
        );
        process.exit(1);
      }
    }
  }
}
