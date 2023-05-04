import Product from "./Product";

export default function RenderProducts(props) {
  const products = props.products;

  const productCards = products.map((product) => {
    return <Product key={product.id} id={product.id} />;
  });

  return <div className="category-grid">{productCards}</div>;
}
