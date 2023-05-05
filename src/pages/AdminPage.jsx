import "./AdminPage.css";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

export default function AdminPage() {
  const { addProductToFirestore, addCategoryToFireStore, fetchCategories } =
    useContext(ShopContext);

  const [addingProduct, setAddingProduct] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);

  console.log(fetchCategories());

  const addDataHandler = (type) => {
    if (type === "product") {
      setAddingCategory(false); // Hide adding category form
      if (addingProduct) {
        setAddingProduct(false);
      } else {
        setAddingProduct(true); // Display adding product form
      }
    } else if (type === "category") {
      setAddingProduct(false); // Hide adding product form
      if (addingCategory) {
        setAddingCategory(false);
      } else {
        setAddingCategory(true); // Display adding category form
      }
    }
  };

  const addProductHandler = (e) => {
    e.preventDefault();
    console.log(e);

    setAddingProduct(false); // Hide adding product form
    addProductToFirestore({}); // Add product to firestore
  };

  const addCategoryHandler = (e) => {
    e.preventDefault();
    const categoryName = e.target[0].value.toLowerCase();

    setAddingCategory(false); // Hide adding product form
    addCategoryToFireStore(categoryName); // Add category to Firestore
  };

  const categoryForm = (
    <form onSubmit={addCategoryHandler} className="add-product-form">
      <h1>Adding a category</h1>
      <div className="input-group">
        <label htmlFor="name">Category name</label>
        <input type="text" name="name" id="name" required />
      </div>
      <button onClick={() => addDataHandler("category")} type="button">
        Exit
      </button>
      <button type="submit">Add</button>
    </form>
  );

  const productForm = (
    <form onSubmit={addProductHandler} className="add-product-form">
      <h1>Adding a product</h1>
      <div className="input-group">
        <label htmlFor="name">Title</label>
        <input type="text" name="name" id="name" required />
      </div>
      <div className="input-group">
        <label htmlFor="price">Price (kr)</label>
        <input type="number" name="price" id="price" required />
      </div>
      <div className="input-group">
        <label htmlFor="category">Category</label>
        <select name="category" id="category" required>
          <option value="">HARDCODED TODO</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="description">Description</label>
        <textarea type="text" name="description" id="description" required />
      </div>
      <div className="input-group">
        <label htmlFor="imageUpload">Image</label>
        <input
          type="file"
          name="imageUpload"
          id="imageUpload"
          accept="image/*"
          required
        />
      </div>
      <button onClick={() => addDataHandler("product")} type="button">
        Exit
      </button>
      <button type="submit">Add</button>
    </form>
  );

  return (
    <>
      <div>
        Hej HC, här kan enbart DU lägga in produkter, kategorier samt bilder
        till produkten du lägger till
      </div>
      <div className="add-data">
        {addingProduct ? (
          productForm
        ) : (
          <button onClick={() => addDataHandler("product")}>Add product</button>
        )}
      </div>
      <div className="add-data">
        {addingCategory ? (
          categoryForm
        ) : (
          <button onClick={() => addDataHandler("category")}>
            Add category
          </button>
        )}
      </div>
    </>
  );
}
