module.exports = {
  // globs to your packages
  // e.g. [ 'packages/*' ]
  packages: ['packages/*'],
  // command you want to replace 'arco subCommand'
  // e.g. publish: 'lerna publish'
  alias: {
    publish: 'lerna publish',
  },
  // initial meta for 'arco generate'
  // initialMeta: {
  //   group: 0,
  // },
  // path of arco block insertion, relative to /src ('myPath' will be resolved as '/src/myPath')
  // pathBlockInsert: 'pathRelativeToSrc',
};
