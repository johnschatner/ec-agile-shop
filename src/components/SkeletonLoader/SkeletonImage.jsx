import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./SkeletonImage.css";

const SkeletonImage = ({ children, delay = 0 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const imgElement = React.Children.only(children);
    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
      if (delay > 0) {
        setTimeout(() => {
          setIsLoading(false);
        }, delay);
      } else {
        setIsLoading(false);
      }
    };
    img.src = imgElement.props.src;
  }, [children, delay]);

  return (
    <div
      style={{ width: dimensions.width, height: dimensions.height }}
      className={`skeleton-image-wrapper ${isLoading ? "loading" : "rendered"}`}
    >
      {isLoading && <div className="skeleton-image" />}
      {React.cloneElement(children, {
        style: { opacity: isLoading ? 0 : 1 },
      })}
    </div>
  );
};

SkeletonImage.propTypes = {
  children: PropTypes.element.isRequired,
  delay: PropTypes.number,
};

export default SkeletonImage;
