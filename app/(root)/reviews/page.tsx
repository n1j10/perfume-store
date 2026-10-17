import Link from "next/link";
import ReviewCard from "@/components/reviews/ReviewCard";
import SectionTitle from "@/components/global/SectionTitle";
import EmptyList from "@/components/global/EmptyList";
import { fetchAllReviews } from "@/utils/api";

const ReviewsPage = async () => {
  const reviews = await fetchAllReviews();

  return (
    <section>
      <SectionTitle eyebrow={`${reviews.length} تقييم`} text="آراء عملائنا" />

      {reviews.length === 0 ? (
        <EmptyList title="لا توجد تقييمات بعد" />
      ) : (
        <div className="columns-1 gap-6 md:columns-2 xl:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              reviewInfo={{
                name: review.authorName,
                image: review.authorImageUrl,
                rating: review.rating,
                comment: review.comment,
              }}
            >
              <p className="mt-3 text-xs text-muted-foreground">
                عن منتج{" "}
                <Link
                  href={`/products/${review.product.id}`}
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  {review.product.name}
                </Link>
              </p>
            </ReviewCard>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewsPage;
