import "./AdminPage.css";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

// Components
import ImageUploader from "../components/ImageUploader/ImageUploader";

export default function AdminPage() {
  const {
    PRODUCTS,
    CATEGORIES,
    addProductToFirestore,
    addCategoryToFireStore,
  } = useContext(ShopContext);

  const [addingProduct, setAddingProduct] = useState(false);
  const [addingCategory, setAddingCategory] = useState(false);
  const [productTitleError, setProductTitleError] = useState({
    error: false,
    helperText: "",
  });
  const [categoryError, setCategoryError] = useState({
    error: false,
    helperText: "",
  });

  const resetCache = () => {
    localStorage.clear();
  };

  const isProductTitleUnique = (name) => {
    return !PRODUCTS.some(
      (product) => product.name.toLowerCase() === name.toLowerCase()
    );
  };

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
      setSelectedFiles([]); // Clear the selected files
      if (addingCategory) {
        setAddingCategory(false);
        setCategoryError({ error: false, helperText: "" });
      } else {
        setAddingCategory(true); // Display adding category form
      }
    }
  };

  const onProductTitleInputChange = () => {
    if (productTitleError.error) {
      setProductTitleError({ error: false, helperText: "" });
    }
  };

  const addProductHandler = async (e) => {
    e.preventDefault();
    const title = e.target.name.value;

    if (!isProductTitleUnique(title)) {
      setProductTitleError({
        error: true,
        helperText: "Product title already exists. Please use a unique title.",
      });
      return;
    }

    const productName = e.target.name.value;
    const productPrice = parseFloat(e.target.price.value);
    const productCategory = e.target.category.value;
    const productDescription = e.target.description.value;
    const productImage = selectedFiles;

    // Create the product data object
    const newProduct = {
      name: productName,
      price: productPrice,
      category: productCategory,
      description: productDescription,
      productImageArray: productImage,
    };

    setAddingProduct(false); // Hide adding product form
    addProductToFirestore(newProduct); // Add product to firestore
  };

  const addCategoryHandler = async (e) => {
    e.preventDefault();
    const categoryName = e.target[0].value.toLowerCase();

    // Reset error state before checking the category
    setCategoryError({ error: false, helperText: "" });

    const categoryExists = await addCategoryToFireStore(categoryName);
    if (categoryExists) {
      setCategoryError({
        error: true,
        helperText: "Category already exists. Please try another name.",
      });
    } else {
      setAddingCategory(false); // Hide adding product form
    }
  };

  const onCategoryInputChange = () => {
    if (categoryError.error) {
      setCategoryError({ error: false, helperText: "" });
    }
  };

  const categoryForm = (
    <form onSubmit={addCategoryHandler} className="add-product-form">
      <h1>Adding a category</h1>
      <div className="input-group">
        <label htmlFor="name">Category name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className={categoryError.error ? "error" : ""}
          onChange={onCategoryInputChange}
        />
        {categoryError.error && (
          <div className="error-message">{categoryError.helperText}</div>
        )}
      </div>
      <button onClick={() => addDataHandler("category")} type="button">
        Exit
      </button>
      <button type="submit">Add</button>
    </form>
  );

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleSelectedFiles = (files) => {
    setSelectedFiles(files);
    console.log(selectedFiles);
  };

  const productForm = (
    <form onSubmit={addProductHandler} className="add-product-form">
      <h1>Adding a product</h1>
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className={productTitleError.error ? "error" : ""}
          onChange={onProductTitleInputChange}
        />
        {productTitleError.error && (
          <div className="error-message">{productTitleError.helperText}</div>
        )}
      </div>
      <div className="input-group">
        <label htmlFor="price">Price (kr)</label>
        <input type="number" name="price" id="price" required />
      </div>
      <div className="input-group">
        <label htmlFor="category">Category</label>
        <select name="category" id="category" required>
          <option value="">Select a category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="description">Description</label>
        <textarea type="text" name="description" id="description" required />
      </div>
      <div className="input-group">
        <ImageUploader onFilesSelected={handleSelectedFiles} />
        {/* <label htmlFor="imageUpload">Image</label>
        <input
          type="file"
          name="imageUpload"
          id="imageUpload"
          accept="image/*"
          required
        /> */}
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
      <div>
        <div>Reset fetched products and categories</div>
        <button onClick={resetCache}>Clear cache</button>
      </div>
    </>
  );
}
