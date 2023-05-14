const ShareButton = ({ product }) => {
  const handleShare = () => {
    // Construct the product URL or any other relevant information
    const url = `https://example.com/products/${product.id}`;

    // Open the Facebook Share Dialog
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "Share on Facebook",
      "width=600,height=400"
    );
  };

  return <button onClick={handleShare}>Share on Facebook</button>;
};

export default ShareButton;
