
/**
 * Yes, this is totally copied from
 * https://github.com/zeit/now-cli/blob/b1663954fe935beb0244002625e05402f59bd20e/bin/now.js
 */

// Make sure we have new Set() and new Map() for Node 0.10.x
import 'babel-polyfill';

// Native
import { resolve } from 'path';

// This command will be run if no other sub command is specified
const defaultCommand = 'setup';

const commands = new Set([
  'setup',
]);

let cmd = defaultCommand;
const args = process.argv.slice(2);
const index = args.findIndex(a => commands.has(a.replace(/:.+/,'')));

if (index > -1) {
  cmd = args[index].replace(/:/,'-');
  args.splice(index, 1);
  if (cmd === 'help') {
    if (index < args.length && commands.has(args[index])) {
      cmd = args[index];
      args.splice(index, 1);
    } else {
      cmd = defaultCommand;
    }

    args.unshift('--help');
  }
}

const bin = resolve(__dirname, '../commands/', `${cmd  }.js`);

// Prepare process.argv for subcommand
process.argv = process.argv.slice(0, 2).concat(args);

// Load sub command
// With custom parameter to make "pkg" happy
require(bin, 'may-exclude');
