'use client';

// NextJS
import Link from 'next/link';

interface TagsModalProps {
  onClose: () => void;
  tags: string[];
}

export default function TagsModal({ onClose, tags }: TagsModalProps) {
  return (
    <div className="tagsmodal">
      <span className="close" onClick={onClose}>
        &times;
      </span>

      <div className="modal-body">
        {tags.map((tag, idx) => (
          <Link key={idx} className="game-tag" href={`/search?tags=${tag}`}>
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
