// NextJS
import Link from 'next/link';

// Types
import type { Category } from '@custom-types/categories';

interface CategoryProps {
  category: Category;
}

export default function Category({ category }: CategoryProps) {
  return (
    <Link className="category-item" href={category.link}>
      <img src={category.img} alt={category.title} />

      <div className="category-gradient" />

      <div className="category-label">
        <span>{category.title}</span>
      </div>
    </Link>
  );
}
