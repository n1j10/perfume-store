import SectionTitle from "../global/SectionTitle";
import ReviewCard from "./ReviewCard";
import { fetchProductReview } from "@/utils/api";

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReview(productId);

  return (
    <div className="mt-24">
      <SectionTitle eyebrow={`${reviews.length} تقييم`} text="آراء العملاء" />
      {reviews.length === 0 ? (
        <p className="mb-8 text-muted-foreground">لا توجد تقييمات لهذا المنتج بعد، كن أول من يقيّمه.</p>
      ) : (
        <div className="my-8 grid gap-6 md:grid-cols-2">
          {reviews.map((review) => {
            const { comment, rating, authorImageUrl, authorName } = review;

            const reviewInfo = {
              comment: comment,
              rating: rating,
              image: authorImageUrl,
              name: authorName,
            };

            return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
          })}
        </div>
      )}
    </div>
  );
}

export default ProductReviews;
