import fs from 'node:fs';
import path from 'node:path';

const pkgPath = path.join(process.cwd(), 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const sections = ['dependencies', 'devDependencies', 'optionalDependencies'];
const blocked = /@tailwindcss\/oxide-(win32|darwin|android|freebsd)/;

for (const section of sections) {
  const deps = pkg[section];
  if (!deps) continue;
  for (const name of Object.keys(deps)) {
    if (blocked.test(name)) {
      console.error(
        `verify-no-platform-deps: remove ${name} from package.json ${section}. ` +
          'Tailwind installs the correct oxide binary via @tailwindcss/oxide optional deps.',
      );
      process.exit(1);
    }
  }
}
