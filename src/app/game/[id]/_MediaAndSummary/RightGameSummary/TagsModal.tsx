'use client';

// NextJS
import Link from 'next/link';

// Types
import type { TagsModalProps } from '../MediaAndSummary.types';

export default function TagsModal({ onClose, tags }: TagsModalProps): JSX.Element {
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
