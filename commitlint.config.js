const types = ['feat', , 'fix', 'docs', 'chore', 'refactor', 'revert'];
module.exports = {
  extends: ['@commitlint/config-conventional'],
  'type-enum': [2, 'always', types],
  'header-min-length': [2, 'always', 5],
};
