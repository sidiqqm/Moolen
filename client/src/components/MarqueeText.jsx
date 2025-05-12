import { useEffect, useRef } from "react";

function MarqueeText() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement) return;

    const animateMarquee = () => {
      if (!marqueeElement) return;

      if (marqueeElement.scrollLeft >= marqueeElement.scrollWidth / 2) {
        marqueeElement.scrollLeft = 0;
      } else {
        marqueeElement.scrollLeft += 1;
      }
    };

    const animationId = setInterval(animateMarquee, 20);
    return () => clearInterval(animationId);
  }, []);

  return (
    <div className="bg-indigo-600 text-white py-2 overflow-hidden">
      <div
        ref={marqueeRef}
        className="whitespace-nowrap overflow-hidden"
        style={{ width: "100%" }}
      >
        <div className="inline-block">
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="mx-2 inline-flex items-center">
                <span className="text-yellow-300 mx-1">✧</span> Peeking into the
                Heart <span className="text-yellow-300 mx-1">✧</span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MarqueeText;
