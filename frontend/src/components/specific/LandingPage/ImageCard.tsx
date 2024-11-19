interface ImageCardProps {
  src: string;
  alt: string;
}

const ImageCard = ({ src, alt }: ImageCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg group relative transition-transform duration-300 hover:scale-105">
      <div className="relative h-64">
        <img src={src} alt={alt} className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-50" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-2xl font-semibold">{alt}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
