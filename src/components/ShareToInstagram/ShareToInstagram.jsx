import React from "react";

export default function ShareToInstagram(props) {
  const product = props.product;
  console.log(product);

  const appURL = "instagram://";
  const webURL = "https://www.instagram.com/";
  const imageFilePath = "path/to/your/generated/image.jpg"; // Replace with the actual image file path
  const description = `Check out this product: ${product.name}\nPrice: ${product.price}\nCategory: ${product.category}\nDescription: ${product.description}`;
  const hashtags = "your,product,hashtags"; // Replace with relevant hashtags

  const encodedDescription = encodeURIComponent(description);
  const encodedHashtags = encodeURIComponent(hashtags);

  const url = `${webURL}upload/?caption=${encodedDescription}%20%23${encodedHashtags}`;

  const shareHandler = () => {
    window.open(url, "_blank");
  };

  return <button onClick={shareHandler}>Share to Instagram</button>;
}
