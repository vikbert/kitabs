const store = require('store');
const noteStore = {
  key: 'kitabs_notes',
};

noteStore.loadAll = () => {
  return store.get(noteStore.key, {});
};

noteStore.saveAll = (notes) => {
  store.set(noteStore.key, notes);
};

noteStore.add = (note) => {
  const notes = noteStore.loadAll();
  noteStore.saveAll({ [note.id]: note, ...notes });
};

noteStore.delete = (noteId) => {
  const notes = noteStore.loadAll();
  delete notes[noteId];
  noteStore.saveAll(notes);
};

export default noteStore;
