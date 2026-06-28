export default function StarRating({ rating, size = 14 }) {
  return (
    <span className="star-rating" style={{ fontSize: size }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "filled" : ""}>
          ★
        </span>
      ))}
    </span>
  );
}
