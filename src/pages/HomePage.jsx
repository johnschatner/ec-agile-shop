import HeroBanner from "../components/HeroBanner/HeroBanner";
import ClickableCategories from "../components/Categories/ClickableCategories/ClickableCategories";
import RenderProducts from "../components/Product/RenderProducts";
import ContactForm from "../components/ContactForm/ContactForm";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <ClickableCategories />
      <h1>Latest products</h1>
      <RenderProducts display="latest" limit={4} />
      <ContactForm />
    </>
  );
}
