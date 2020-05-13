const NoteFactory = {};
NoteFactory.create = (content) => {
    return {
        id: (new Date()).getTime(),
        content,
    };
};
export default NoteFactory;
