import { useState, useRef } from "react";

export default function HeroSection() {
  const [svgCode, setSvgCode] = useState("");
  const svgRef = useRef(null);

  const handleInputChange = (e) => {
    setSvgCode(e.target.value);
  };

  const downloadAsSVG = () => {
    if (!svgCode) return;

    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "image.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAsPNG = async () => {
    if (!svgCode || !svgRef.current) return;

    // Get SVG dimensions
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgCode, "image/svg+xml");
    const svgElement = svgDoc.documentElement;
    const width = parseInt(
      svgElement.getAttribute("width") || svgElement.viewBox.baseVal.width
    );
    const height = parseInt(
      svgElement.getAttribute("height") || svgElement.viewBox.baseVal.height
    );

    // Create canvas with 2x scale for better quality
    const scale = 2;
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    // Convert SVG to image
    const img = new Image();
    const svgBlob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  return (
    <div className="p-3 sm:p-4 flex flex-col lg:flex-row justify-center gap-3 text-blue-800 rounded-xl w-full lg:w-[700px] mx-auto">
      <div className="flex flex-col items-center justify-start gap-3 w-full xl:w-4/5">
        <div className="relative flex items-center w-full">
          <input
            placeholder="Enter the SVG code"
            type="text"
            className="peer relative w-full p-3 text-slate-400 shadow-[0px_2px_3px_-2px_#B4E903] border border-[#F0F2F7] focus:outline-none placeholder:text-gray-500 rounded-md"
            onChange={handleInputChange}
            value={svgCode}
          />
          <button
            onClick={() => setSvgCode("")}
            className="absolute flex justify-center items-center text-slate-400 focus:outline-none placeholder:text-gray-500 right-2 py-2 px-3 rounded-md bg-red-900 text-xs transition-all duration-200 ease-in-out hover:bg-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              color="#fff"
              fill="none"
            >
              <path
                d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M9 11.7349H15"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M10.5 15.6543H13.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="aspect-video w-full h-96">
          {svgCode ? (
            <div
              ref={svgRef}
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: svgCode }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center border-2 border-dashed rounded-md">
              <p className="text-gray-400">SVG preview will appear here</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start items-center gap-3 w-full xl:w-1/5">
        {/* Download as SVG button */}
        <button
          onClick={downloadAsSVG}
          className="button bg-white border font-medium border-gray-30 ring-primary hover:border-primary hover:ring-1 hover:text-primary text-gray-600 h-10 rounded-md px-3 py-2 text-sm flex justify-center items-center gap-2 w-full"
        >
          Download
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            color="#000"
            fill="none"
          >
            <path
              d="M3.5 13V12.1963C3.5 9.22892 3.5 7.74523 3.96894 6.56024C4.72281 4.65521 6.31714 3.15255 8.33836 2.44201C9.59563 2.00003 11.1698 2.00003 14.3182 2.00003C16.1173 2.00003 17.0168 2.00003 17.7352 2.25259C18.8902 2.65861 19.8012 3.51728 20.232 4.60587C20.5 5.283 20.5 6.13082 20.5 7.82646V12.0142V13"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.5 12C3.5 10.1591 4.99238 8.66667 6.83333 8.66667C7.49912 8.66667 8.28404 8.78333 8.93137 8.60988C9.50652 8.45576 9.95576 8.00652 10.1099 7.43136C10.2833 6.78404 10.1667 5.99912 10.1667 5.33333C10.1667 3.49238 11.6591 2 13.5 2"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.009 16L12.3364 20.6947C12.0264 21.5649 11.8714 22 11.6259 22C11.3805 22 11.2254 21.5649 10.9154 20.6947L9.24283 16M20.5 17C20.4097 15.9819 19.5865 16 18.7189 16C17.8686 16 17.4434 16 17.1792 16.2929C16.915 16.5858 16.915 17.0572 16.915 18V20C16.915 20.9428 16.915 21.4142 17.1792 21.7071C17.4434 22 17.8686 22 18.7189 22C19.5693 22 19.9945 22 20.2587 21.7071C20.5229 21.4142 20.5229 20.9428 20.5229 20C20.5229 19.2963 19.1699 19.5 19.1699 19.5M6.0413 16H4.92986C4.48571 16 4.26363 16 4.08846 16.0761C3.49189 16.3353 3.50001 16.9447 3.50001 17.5C3.50001 18.0553 3.49189 18.6646 4.08846 18.9239C4.26363 19 4.48571 19 4.92986 19C5.37402 19 5.5961 19 5.77127 19.0761C6.36784 19.3353 6.35972 19.9447 6.35972 20.5C6.35972 21.0553 6.36784 21.6646 5.77127 21.9239C5.5961 22 5.37402 22 4.92987 22H3.71933"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        {/* Download as PNG button */}
        <button
          onClick={downloadAsPNG}
          className="button bg-white border font-medium border-gray-30 ring-primary hover:border-primary hover:ring-1 hover:text-primary text-gray-600 rounded-md px-3 py-2 text-sm flex justify-center items-center gap-2 w-full"
        >
          Download
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="22"
            height="22"
            color="#000"
            fill="none"
          >
            <path
              d="M20 13V10.6569C20 9.83935 20 9.4306 19.8478 9.06306C19.6955 8.69552 19.4065 8.40649 18.8284 7.82843L14.0919 3.09188C13.593 2.593 13.3436 2.34355 13.0345 2.19575C12.9702 2.165 12.9044 2.13772 12.8372 2.11401C12.5141 2 12.1614 2 11.4558 2C8.21082 2 6.58831 2 5.48933 2.88607C5.26731 3.06508 5.06508 3.26731 4.88607 3.48933C4 4.58831 4 6.21082 4 9.45584V13M13 2.5V3C13 5.82843 13 7.24264 13.8787 8.12132C14.7574 9 16.1716 9 19 9H19.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 22V19M4 19V16H6C6.82843 16 7.5 16.6716 7.5 17.5C7.5 18.3284 6.82843 19 6 19H4ZM20 17C20 16.4477 19.5523 16 19 16H17.5C16.9477 16 16.5 16.4477 16.5 17V21C16.5 21.5523 16.9477 22 17.5 22H19C19.5523 22 20 21.5523 20 21V19.5H19M10 22V16L14 22V16"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
