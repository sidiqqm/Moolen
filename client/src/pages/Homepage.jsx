import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Review from "../components/Review";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="w-full">
      {/* Landing Page 1 */}
      <div className="flex flex-col lg:flex-row w-full px-6 lg:px-28 bg-gradient-to-b from-primary to-[#fff] pt-12 lg:pt-24 gap-8">
        <div className="w-full lg:w-2/3 flex flex-col justify-center gap-6 mt-10 items-center lg:items-start">
          <h1 className="text-3xl text-center lg:text-start md:text-4xl lg:text-5xl font-bold font-nunito md:max-w-2xl lg:max-w-4xl">
            Understand Your Emotions, Embrace Your{" "}
            <span className="relative inline-block">
              Journey
              <img
                src="/circle.png"
                alt="Circle decoration"
                className="absolute -top-5 -left-6 w-40 md:w-56 rounded-full"
              />
            </span>
          </h1>
          <p className="text-sm text-center lg:text-start lg:text-base md:text-base font-nunito max-w-xl italic">
            “Discover your mood, express your feelings, and grow every day with
            MooLen, a gentle space where your emotions are seen, heard, and
            nurtured.”
          </p>
          <button className="bg-secondary text-white text-sm font-bold font-nunito px-12 py-3 md:px-16 md:py-4 lg:px-8 lg:py-3 rounded-3xl w-fit">
            Track Your Mood
          </button>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img src="/battery.png" alt="..." className="w-full max-w-[500px] xl:max-w-[840px]" />
        </div>
      </div>

      {/* Landing page 2 & 3 */}
      <div className="px-6 sm:px-8 bg-gradient-to-b from-[#fff] to-primary pt-12 pb-24">
        {/* Landing page 2 */}
        <h2 className="mb-8 font-bold font-nunito text-xl lg:text-3xl text-center">
          How Can Moolen Help You Feel Better Today
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:px-24 justify-items-center">
          {[
            { path: "/track-mood/mood-photo", title: "Mood Check-In", icon: "letter.png" },
            { path: "/journal", title: "Daily Journal", icon: "book.png" },
            { path: "#", title: "Self Assessment", icon: "task.png" },
            { path: "/article", title: "Daily Tips & Inspiration", icon: "lamp.png" },
          ].map((item, idx) => (
            <Link key={idx} to={item.path} className="w-full max-w-[400px]">
              <div className="border-2 border-slate-400 px-6 py-4 flex items-center justify-between rounded-lg hover:bg-slate-100 transition">
                <p className="font-nunito text-lg">{item.title}</p>
                <div className="flex gap-4 items-center">
                  <img src={`/${item.icon}`} alt={item.title} className="size-9" />
                  <ChevronRightIcon className="size-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Landing Page 3 */}
        <div className="mt-24 flex flex-col lg:flex-row items-center gap-12">
          {/* Left Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/purba.png"
              alt="Emotional support"
              className="w-full max-w-[500px] md:max-w-[640px]"
            />
          </div>

          {/* Right Text */}
          <div id="about" className="w-full h-full lg:w-1/2 px-4 flex flex-col items-center font-nunito">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 max-w-xl">
              A Gentle Companion for Your Emotional Journey
            </h1>
            <p className="text-base md:text-lg text-center max-w-2xl mb-4">
              MooLen is a web based platform designed to help you understand and
              care for your emotional well-being.
            </p>
            <p className="text-base md:text-lg text-center max-w-2xl mb-4">
              Through real time mood detection, daily journaling, and thoughtful
              self assessment, MooLen creates a safe, supportive space where you
              can express yourself freely and track your emotional growth over
              time.
            </p>
            <p className="text-base md:text-lg text-center max-w-2xl">
              With MooLen, every feeling matters, and every small step counts.
            </p>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-gradient-to-b font-nunito from-primary to-[#fff] flex flex-col mb-32 px-6">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 text-center">
          <img src="/star.png" alt="star" className="size-10 sm:size-12" />
          <div>
            <p className="text-md">Insights on Mental Wellness</p>
            <h1 className="text-2xl sm:text-3xl font-bold">What People Are Saying</h1>
          </div>
          <img src="/wave.png" alt="wave" className="w-24 sm:w-28" />
        </div>

        <div className="flex gap-6 overflow-x-auto pb-12 mb-10">
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </div>

        <div className="flex justify-center">
          <button className="px-12 sm:px-36 py-3 bg-[#1C2444] text-white font-bold text-lg shadow-lg rounded-full">
            Tell Your Opinion Here
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;