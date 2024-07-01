import Image from "next/image";
import loaderIcon from "@public/assets/icons/loader.svg"
const Loading = () => {
  return (
    <div className="w-full flex-col flex items-center justify-center h-full  p-[10rem]">
      <Image
        src={loaderIcon}
        alt="loader"
        className="object-contain w-[10%]"
      />
    </div>
  );
};

export default Loading;
