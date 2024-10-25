// NextJS
import Link from 'next/link';

// Types
import type { Category } from '../Store.types';

interface CategoryProps {
  category: Category;
}
export default function Category({ category }: CategoryProps) {
  return (
    <Link className="category-item" href={category.link}>
      <img src={category.img} alt={category.title} />

      <div
        className="category-gradient"
        style={{
          background: `linear-gradient(rgba(0,0,0,0), rgb(${category.gradRGP}) 100%)`,
        }}
      />

      <div className="category-label">
        <span>{category.title}</span>
      </div>
    </Link>
  );
}
