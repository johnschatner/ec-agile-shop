import SkeletonImage from "../SkeletonLoader/SkeletonImage";

export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-banner-container">
        <SkeletonImage delay={400}>
          <img src="https://placehold.co/600x400" alt="HERO-BANNER" />
        </SkeletonImage>
      </div>
    </section>
  );
}
