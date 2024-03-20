import useSoftNavigate from 'hooks/useSoftNavigate';

const TagsModal = ({
  onClose,
  tags,
} : {
  onClose: () => void;
  tags: string[];
}) => {
  const navigate = useSoftNavigate();
  
  return (
    <div className="tagsmodal">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <div className="modal-body">
        {tags.map((tag, index) => (
          <a
            key={index}
            className="game-tag"
            onClick={e => {
              navigate(`/search?tags=${tag}`, e);
            }}
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default TagsModal;
