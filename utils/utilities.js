export default class utilities {
  static findLanguageIndex(data, language) {
    let index = data.findIndex((item) => item.language.id === language);
    if (index < 0) {
      index = 0;
    }
    return index;
  }

  static findPage(data, id) {
    if (!data) return;

    for (const item of data) {
      // Current item is the right one
      if (item.id === id) return item;

      // Check children
      const child = this.findPage(item.children, id);
      if (child) return child;
    }
  }
}
