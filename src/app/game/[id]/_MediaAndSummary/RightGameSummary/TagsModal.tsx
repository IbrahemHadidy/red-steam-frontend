'use client';

// NextJS
import Link from 'next/link';

// Types
import type { FC } from 'react';
import type { TagsModalProps } from '../MediaAndSummary.types';

const TagsModal: FC<TagsModalProps> = ({ onClose, tags }): JSX.Element => (
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
export default TagsModal;
