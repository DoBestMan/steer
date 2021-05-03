module.exports = function (migration) {
  migration.transformEntries({
    contentType: 'sitePageByLearnCategoryResponse',
    from: ['content'],
    to: ['modules'],
    transformEntryForLocale: (fromFields, currentLocale) => {
      if (!fromFields.content) {
        return {
          modules: [],
        };
      }
      return {
        modules: [fromFields.content[currentLocale]],
      };
    },
  });
};
