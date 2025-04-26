var child_process = require('child_process');
child_process.execSync('npx prisma@6.6.0 migrate deploy', { stdio: [0, 1, 2] });
