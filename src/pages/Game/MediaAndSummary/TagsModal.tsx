const TagsModal = ({
  onClose,
  tags,
} : {
  onClose: () => void;
  tags: string[];
}) => {
  return (
    <div className="tagsmodal">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-body">
          {tags.map((tag, index) => (
            <a key={index} className="game-tag" href={`/search?tags=${tag}`}>
              {tag}
            </a>
          ))}
        </div>
    </div>
  );
};

export default TagsModal;
