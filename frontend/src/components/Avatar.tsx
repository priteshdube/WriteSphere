import React from "react";

interface AvatarProps {
  name?: string; // Name for initials
  src?: string; // Image source
  size?: "small" | "medium" | "large"; // Size options
  alt?: string; // Alternative text for images
  bgColor?: string; // Background color for initials
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  size = "medium",
  alt = "Avatar",
  bgColor = "bg-indigo-500",
}) => {
  // Determine avatar size
  const sizeClasses = {
    small: "w-8 h-8 text-sm",
    medium: "w-12 h-12 text-lg",
    large: "w-20 h-20 text-2xl",
  };

  const selectedSize = sizeClasses[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden ${selectedSize} ${
        src ? "" : bgColor
      }`}
    >
      {/* Show image if `src` is provided, else show initials */}
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className="font-semibold text-white uppercase">
          {name ? name[0] : "?"}
        </span>
      )}
    </div>
  );
};

export default Avatar;
