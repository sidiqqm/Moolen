import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/Tabs";
import Footer from "../components/Footer";

function ArticlePage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredArticles =
    activeTab === "all"
      ? articles
      : articles.filter((article) => article.category === activeTab);

  return (
    <main className="min-h-screen bg-sky-100">
      {/* Hero Section */}
      <div className="pt-8 bg-[#1a86a1]">
        <section
          className="min-h-screen bg-cover bg-center flex items-center justify-end px-10 md:px-20"
          style={{ backgroundImage: "url('/hs_article.png')" }}
        >
          <div className="max-w-4xl text-white text-right">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Mental health is messy.
              <br />
              Your support shouldn’t be.
            </h1>
            <p className="text-lg md:text-xl">
              MooLens turns psychological research into practical tools for real
              life.
              <br />
              Because feeling better is possible, even on hard days.
            </p>
          </div>
        </section>
      </div>

      {/* Library Section */}
      <section className="container mx-auto px-4 py-25">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-4xl font-bold mb-1">Daily Tips & Inspirations</h2>
          <div className="relative">
            <img
              src={"/redline.png" || "/placeholder.svg"}
              alt="Decorative underline"
              className="object-contain w-48 h-5"
            />
          </div>
        </div>

        {/* Category Filters */}
        <Tabs
          defaultValue="all"
          className="mb-8 flex justify-center"
          onValueChange={setActiveTab}
        >
          <TabsList className="flex gap-8 bg-transparent shadow-none">
            <TabsTrigger
              value="meditation"
              className={`group inline-flex items-center gap-2 rounded-full px-5 py-2 transition-colors duration-300 ${
                activeTab === "meditation"
                  ? "bg-black text-white"
                  : "bg-[#fef6f6] text-black hover:bg-black hover:text-white"
              }`}
            >
              <img
                src={
                  activeTab === "meditation"
                    ? "/mindfullness-wt.png"
                    : "/mindfullness.png"
                }
                alt="Mindfulness"
                className="w-5 h-5 transition-all duration-300"
              />
              Meditation
            </TabsTrigger>

            <TabsTrigger
              value="motivation"
              className={`group inline-flex items-center gap-2 rounded-full px-5 py-2 transition-colors duration-300 ${
                activeTab === "motivation"
                  ? "bg-black text-white"
                  : "bg-[#fef6f6] text-black hover:bg-black hover:text-white"
              }`}
            >
              <img
                src={
                  activeTab === "motivation"
                    ? "/motivation-wt.png"
                    : "/motivation.png"
                }
                alt="Motivation"
                className="w-5 h-5 transition-all duration-300"
              />
              Motivation
            </TabsTrigger>

            <TabsTrigger
              value="self-care"
              className={`group inline-flex items-center gap-2 rounded-full px-5 py-2 transition-colors duration-300 ${
                activeTab === "self-care"
                  ? "bg-black text-white"
                  : "bg-[#fef6f6] text-black hover:bg-black hover:text-white"
              }`}
            >
              <img
                src={
                  activeTab === "self-care"
                    ? "/selfcare-wt.png"
                    : "/selfcare.png"
                }
                alt="Self Care"
                className="w-5 h-5 transition-all duration-300"
              />
              Self Care
            </TabsTrigger>

            <TabsTrigger
              value="emotional"
              className={`group inline-flex items-center gap-2 rounded-full px-5 py-2 transition-colors duration-300 ${
                activeTab === "emotional"
                  ? "bg-black text-white"
                  : "bg-[#fef6f6] text-black hover:bg-black hover:text-white"
              }`}
            >
              <img
                src={
                  activeTab === "emotional"
                    ? "/emotional-wt.png"
                    : "/emotional.png"
                }
                alt="Emotional"
                className="w-5 h-5 transition-all duration-300"
              />
              Emotional Support
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {filteredArticles.map((article, index) => (
            <Card
              key={index}
              className="overflow-hidden group relative h-72 transform transition duration-500 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <div className="absolute inset-0">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-bold">{article.title}</h3>
                <p className="text-sm opacity-90">{article.excerpt}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-6">
          <span className="text-sm text-gray-600">Show all</span>
          <div className="flex gap-1">
            <Button className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="sr-only">Previous page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <Button className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="sr-only">Next page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

const articles = [
  {
    title: "Morning Meditation Guide",
    excerpt: "Start your day with peace and clarity",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    category: "meditation",
  },
  {
    title: "Finding Happiness in the Little Things",
    excerpt: "Simple ways to appreciate everyday moments",
    image:
      "https://images.unsplash.com/photo-1513279922550-250c2129b13a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aGFwcGluZXNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    category: "self-care",
  },
  {
    title: "Finding Peace in Times of Stress",
    excerpt: "Techniques to manage anxiety and stress",
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    category: "emotional",
  },
  {
    title: "Mindfulness Practices for Better Sleep",
    excerpt: "Improve your sleep quality with these techniques",
    image:
      "https://images.unsplash.com/photo-1541480601022-2308c0f02487?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2xlZXB8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    category: "meditation",
  },
  {
    title: "Building Emotional Resilience",
    excerpt: "Strengthen your ability to handle life's challenges",
    image:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3RyZW5ndGh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    category: "emotional",
  },
  {
    title: "Self-Care Rituals for Mental Clarity",
    excerpt: "Simple practices to clear your mind",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYXIlMjBtaW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    category: "self-care",
  },
  {
    title: "Building Emotional Resilience",
    excerpt: "Strengthen your ability to handle life's challenges",
    image:
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c3RyZW5ndGh8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
    category: "motivation",
  },
  {
    title: "Self-Care Rituals for Mental Clarity",
    excerpt: "Simple practices to clear your mind",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xlYXIlMjBtaW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
    category: "motivation",
  },
];

export default ArticlePage;
