// LEVEL 1 → Static API (No scraping, no API keys)
exports.getStaticOpportunities = async (req, res) => {
  try {
    const opportunities = [
      {
        title: "Devfolio Hackathons",
        description: "Latest hackathons happening across India.",
        link: "https://devfolio.co/hackathons"
      },
      {
        title: "Devpost Hackathons",
        description: "International hackathons with prizes.",
        link: "https://devpost.com/hackathons"
      },
      {
        title: "GitHub Trending",
        description: "Top open-source repositories to contribute today.",
        link: "https://github.com/trending"
      },
      {
        title: "Google Summer of Code",
        description: "Largest global open-source mentorship program.",
        link: "https://summerofcode.withgoogle.com"
      },
      {
        title: "Internshala Internships",
        description: "Latest tech internships for college students.",
        link: "https://internshala.com/internships"
      }
    ];

    res.json(opportunities);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Static data fetch error" });
  }
};
