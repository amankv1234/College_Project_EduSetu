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
  title: "HackerEarth Challenges",
  description: "Coding challenges, hackathons, and hiring contests.",
  link: "https://www.hackerearth.com/challenges/"
},
{
  title: "LeetCode Problems",
  description: "DSA practice problems for interviews.",
  link: "https://leetcode.com/problemset/all/"
},
{
  title: "CodeChef Contests",
  description: "Competitive programming contests for all levels.",
  link: "https://www.codechef.com/contests"
},
{
  title: "Kaggle Competitions",
  description: "Data science and machine learning competitions.",
  link: "https://www.kaggle.com/competitions"
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
  title: "First Timers Only",
  description: "Beginner-friendly open source issues.",
  link: "https://www.firsttimersonly.com/"
},
{
  title: "Up For Grabs",
  description: "Open source projects with beginner-friendly issues.",
  link: "https://up-for-grabs.net/"
},
      {
        title: "Internshala Internships",
        description: "Latest tech internships for college students.",
        link: "https://internshala.com/internships"
      },
      {
  title: "LinkedIn Jobs",
  description: "Internships and fresher roles from top companies.",
  link: "https://www.linkedin.com/jobs/"
},
{
  title: "Indeed Fresher Jobs",
  description: "Entry-level tech jobs and internships.",
  link: "https://www.indeed.com"
},
{
  title: "Wellfound (AngelList Talent)",
  description: "Startup internships and jobs.",
  link: "https://wellfound.com/jobs"
},
    ];

    res.json(opportunities);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Static data fetch error" });
  }
};
