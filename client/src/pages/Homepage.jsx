import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Review from "../components/Review";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="">
      {/* Landing Page 1 */}
      <div className="flex w-full px-35 bg-gradient-to-b from-primary to-[#fff] pt-18">
        <div className="w-2/3 flex flex-col justify-center gap-10 -mr-24">
          <h1 className="xl:text-6xl text-4xl font-bold font-nunito max-w-4xl leading-tight relative z-10">
            Understand Your Emotions, Embrace Your{" "}
            <span className="relative inline-block min-w-[16rem] min-h-[4rem]">
              Journey
              <img
                src="/circle.png"
                alt="Circle decoration"
                className="absolute -top-3 -left-2 w-56 rounded-full z-0"
              />
            </span>
          </h1>
          <p className="text-lg font-nunito max-w-xl italic leading-relaxed">
            “Discover your mood, express your feelings, and grow every day with MooLen,
            a gentle space where your emotions are seen, heard, and nurtured.”
          </p>

          <div className="">
          <Link to="/track-mood/mood-photo">
            <button className="bg-[#1C2444] text-white text-sm font-bold font-nunito px-10 py-4 rounded-3xl transition-colors duration-300 ease-in-out hover:opacity-90 transition">
              Track Your Mood
            </button>
          </Link>
          </div>
        </div>
        <div className="relative flex justify-end overflow-visible flex-grow">
          <img src="/battery.png" alt="..." className="xl:w-[1500px]" />
        </div>
      </div>

      {/* Landing page 2 & 3 */}

      <div className="grid px-8 bg-gradient-to-b from-[#fff] to-primary pt-55 pb-24">
        {/* Landing page 2 */}
        <h2 className="mb-8 font-bold font-nunito text-xl lg:text-3xl text-center">
          How Can Moolen Help You Feel Better Today
        </h2>
        <div className="lg:px-48 grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center pt-10">
        <Link to="/track-mood/mood-photo" className="w-full max-w-[400px]">
          <div className="bg-transparent border-2 border-slate-400 w-full px-8 h-[80px] flex items-center justify-between rounded-lg hover:bg-slate-100 cursor-pointer transition">
            <p className="font-nunito text-lg">Mood Check-In</p>
            <div className="flex gap-4 items-center">
              <img src="/letter.png" alt="" className="size-9" />
              <ChevronRightIcon className="size-7" />
            </div>
          </div>
        </Link>

        <Link to="/journal" className="w-full max-w-[400px]">
          <div className="bg-transparent border-2 border-slate-400 w-full px-8 h-[80px] flex items-center justify-between rounded-lg hover:bg-slate-100 cursor-pointer transition">
            <p className="font-nunito text-lg">Daily Journal</p>
            <div className="flex gap-4 items-center">
              <img src="/book.png" alt="" className="size-9" />
              <ChevronRightIcon className="size-7" />
            </div>
          </div>
        </Link>

        <Link to="#" className="w-full max-w-[400px]">
          <div className="bg-transparent border-2 border-slate-400 w-full px-8 h-[80px] flex items-center justify-between rounded-lg hover:bg-slate-100 cursor-pointer transition">
            <p className="font-nunito text-lg">Self Assessment</p>
            <div className="flex gap-4 items-center">
              <img src="/task.png" alt="" className="size-9" />
              <ChevronRightIcon className="size-7" />
            </div>
          </div>
        </Link>

        <Link to="/article" className="w-full max-w-[400px]">
          <div className="bg-transparent border-2 border-slate-400 w-full px-8 h-[80px] flex items-center justify-between rounded-lg hover:bg-slate-100 cursor-pointer transition">
            <p className="font-nunito text-lg">Daily Tips & Inspiration</p>
            <div className="flex gap-4 items-center">
              <img src="/lamp.png" alt="" className="size-9" />
              <ChevronRightIcon className="size-7" />
            </div>
          </div>
        </Link>
      </div>

        {/* Landing Page 3 */}

        <div className="mt-100 mb-64 flex items-center">
          {/* Container Kiri */}
          <div className="w-1/2 flex justify-end pr-10">
            <img
              src="/purba.png"
              alt="Emotional support"
              className="w-[640px]"
            />
          </div>

          {/* Container Kanan yang sedikit menabrak kiri */}
          <div  id="about"
            className="w-1/2 -ml-20 z-10 p-6 flex flex-col items-center justify-center mt-20 font-nunito">
            <h1 className="text-4xl max-w-xl font-bold mb-6 text-center">
              A Gentle Companion for Your Emotional Journey
            </h1>
            <p className="text-lg max-w-2xl text-center">
              MooLen is a web based platform designed to help you understand and
              care for your emotional well-being.
            </p>
            <p className="text-lg max-w-2xl text-center">
              Through real time mood detection, daily journaling, and thoughtful
              self assessment, MooLen creates a safe, supportive space where you
              can express yourself freely and track your emotional growth over
              time.
            </p>
            <p className="text-lg max-w-2xl text-center">
              With MooLen, every feeling matters, and every small step counts.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b font-nunito from-primary to-[#fff] flex flex-col mb-64">
        <div className="flex justify-center gap-5 mb-12">
          <img src="/star.png" alt="" className="size-12" />
          <div className="flex flex-col justify-center items-center">
            <p className="text-md">Insights on Mental Wellness</p>
            <h1 className="text-3xl font-bold">What People Are Saying</h1>
          </div>
          <img src="/wave.png" alt="" className="w-28" />
        </div>

        <div className="flex gap-15 overflow-auto pb-12 mb-10">
          <Review />
          <Review />
          <Review />
          <Review />
          <Review />
        </div>
        <div className="flex justify-center items-center">
          <button className="px-36 py-4 bg-[#1C2444] text-white font-bold text-lg shadow-lg rounded-full">
            Tell Your Opinion Here
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;