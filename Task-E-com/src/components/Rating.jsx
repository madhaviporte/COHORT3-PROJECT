import { Star } from "lucide-react";

export default function Rating({ rating, reviews, size = "sm" }) {
  const starSize = size === "sm" ? 13 : size === "md" ? 15 : 17;
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-px">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={starSize}
            strokeWidth={0}
            className={
              i < fullStars
                ? "fill-yellow-400"
                : i === fullStars && hasHalf
                ? "fill-yellow-400/50"
                : "fill-gray-700"
            }
          />
        ))}
      </div>
      <span className="text-xs font-medium text-gray-300">{rating}</span>
      {reviews !== undefined && (
        <span className="text-xs text-gray-500">({reviews.toLocaleString()})</span>
      )}
    </div>
  );
}
