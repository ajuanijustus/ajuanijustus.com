// Brand logos from the Brands library
import { 
  faLinkedinIn, 
  faYoutube, 
  faGoogle, 
  faXTwitter, 
  faInstagram, 
  faGithub, 
  faGoodreads, 
  faTwitch, 
  faBluesky,
  faGoogleScholar,
  faResearchgate,
  faOrcid        // Added ORCID Brand Icon
} from '@fortawesome/free-brands-svg-icons';

// General utility vectors from the Solid library
import { 
  faChartLine, 
  faBookOpen,    // Added semantic icon for Fable
  faUniversity   // Added semantic icon for UOB Pure Portal
} from '@fortawesome/free-solid-svg-icons';

// Website related settings
const settings = {
  isSplash: true, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "Aju Ani Justus",
  description:
    "A passionate individual who always thrives to work on end to end products which develop sustainable and scalable social and technical systems to create impact.",
  og: {
    title: "Aju Ani Justus",
    type: "website",
    url: "http://ajuanijustus.com/",
  },
};

//Home Page
const greetingLegacy = {
  title: "Aju Ani Justus",
  logo_name: "AjuAniJustus",
  subTitle: "Let all that you do be done in love.",
};

const greeting = {
  title: "Aju Ani Justus",
  logo_name: "AjuAniJustus",
  subTitle: "Doctoral Researcher, University of Birmingham",
  
  // Status Banner for visibility
  statusBanner: "🚀 Open to research internships from July 2026 onwards in Multi-Agent Systems, Reinforcement Learning, Cooperative AI, and Human-AI Teaming.",
  
  email: "mailme@ajuanijustus.com",
  googleScholar: "https://scholar.google.com/citations?user=ktCUwwsAAAAJ&hl=en",
  
  // Professional tracking descriptors for the inline typing animation
  sequenceStrings: [
    "Doctoral Researcher",
    "Reinforcement Learning Scientist",
    "Science Communicator",
    "Machine Learning Engineer"
  ],
  
  // Academic Profile Copy
  phdInfo: "I am a third-year PhD candidate at the University of Birmingham studying Heterogeneous-Agent Reinforcement Learning (HARL), Agent Communication, and Human-Agent Teaming.",
  coreQuestion: "How can communication in HARL be modeled as a distinct, learnable process aimed at grounding shared beliefs and establishing common ground, rather than as an auxiliary component of an action policy?",
  
  advisors: [
    { name: "Chris Baber", link: "https://scholar.google.co.uk/citations?user=MQ184fQAAAAJ&hl=en" },
    { name: "Leonardo Stella", link: "https://www.leonardostella.com" }
  ],
  
  bioPast: "Before starting my PhD, I spent 3 years as a Machine Learning Engineer at Accenture Applied Intelligence, where I developed and deployed cloud-native enterprise AI and demand forecasting solutions.",
  bioCombined: "My background uniquely combines foundational research on multi-agent coordination frameworks with industry-tested experience engineering scalable, real-world intelligent systems.",
  
  outreachAndTeaching: "I am deeply passionate about science communication and education. Beyond my research, I serve as an Event Manager for the Pint of Science Team at Birmingham (2026–Present) to make complex concepts publicly accessible, and I hold an Associate Fellow of the Higher Education Academy (AFHEA, certified June 2026) designation recognition for my instructional contributions.",

  researchInterests: [
    "Heterogeneous-Agent Reinforcement Learning (HARL)",
    "Grounded Communication Policies & Common Ground Construction",
    "Human-Agent Teaming, Human Proxy Design & Cooperative AI",
    "Human-in-the-Loop Reinforcement Learning"
  ],
  
  portfolio_repository: "",
};

const socialMediaLinks = [
  { name: "LinkedIn", link: "https://www.linkedin.com/in/ajuanijustus/", icon: faLinkedinIn },
  { name: "YouTube (Reward Signal)", link: "https://www.youtube.com/@TheRewardSignal", icon: faYoutube },
  { name: "YouTube (Personal)", link: "https://www.youtube.com/@ajewdor", icon: faYoutube },
  { name: "Email", link: "mailto:ajuani1997@gmail.com", icon: faGoogle },
  { name: "Twitter (X)", link: "https://twitter.com/ajuanijustus", icon: faXTwitter },
  { name: "Instagram", link: "https://www.instagram.com/ajuanijustus/", icon: faInstagram },
  { name: "GitHub", link: "https://github.com/ajuanijustus", icon: faGithub },
  { name: "Goodreads", link: "https://www.goodreads.com/user/show/50358068-aju-justus", icon: faGoodreads },
  { name: "Twitch", link: "https://www.twitch.tv/ajewdor", icon: faTwitch },
  { name: "Bluesky", link: "https://bsky.app/profile/ajuanijustus.bsky.social", icon: faBluesky },
  { name: "Google Scholar", link: "https://scholar.google.com/citations?user=ktCUwwsAAAAJ&hl=en", icon: faGoogleScholar },
  { name: "ResearchGate", link: "https://www.researchgate.net/profile/Aju-Ani-Justus", icon: faResearchgate },
  { name: "StoryGraph", link: "https://app.thestorygraph.com/profile/ajuanijustus", icon: faChartLine },
  { name: "Fable", link: "https://fable.co/fabler/aju-174512380413?referralID=r5kkUPaqRR", icon: faBookOpen },
  { name: "ORCID", link: "https://orcid.org/0009-0002-7125-9397", icon: faOrcid },
  { name: "UOB Research Pure", link: "https://research.birmingham.ac.uk/en/persons/aju-ani-justus/publications/", icon: faUniversity }
];

const skills = {
  data: [
    {
      title: "Career",
      fileName: "DataScienceImg",
      skills: [
        "🧑🏽‍💻 Full-stack Data Scientist",
        "With 3+ years of experience leveraging Artificial Intelligence, Machine Learning, and Cloud Technology to deliver solutions to supply chain business problems.",
        "👨🏽‍🏫 Mentor - Python, Excel and Time-Series Analysis.",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "logos:python",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Tensorflow",
          fontAwesomeClassname: "logos:tensorflow",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Keras",
          fontAwesomeClassname: "logos:keras",
          style: {
            backgroundColor: "white",
            color: "#D00000",
          },
        },
        {
          skillName: "MySQL",
          fontAwesomeClassname: "logos:mysql",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "PySpark",
          fontAwesomeClassname: "logos:apache-spark",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "GCP",
          fontAwesomeClassname: "logos:google-cloud",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Azure",
          fontAwesomeClassname: "logos:microsoft-azure",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "logos:docker",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "react.js",
          fontAwesomeClassname: "logos:react",
          style: {
            backgroundColor: "transparent",
          },
        },
      ],
    },
    {
      title: "Education",
      fileName: "StudentImg",
      skills: [
        "⚡ MSc. Computer Science student at University of Birmingham (ongoing, 2022-2023).",
        "⚡ B.Tech (Honors) graduate from College of Engineering, Trivandrum with a 8.37 CGPA (2015-2019).",
        "⚡ Studied at The School of The Good Shepherd, Trivandrum from 10th grade (CGPA: 9.6) to 12th grade (93.2%).",
        "⚡ Studied at GEMS Our Own English High School, Sharjah - Boys from 5th grade to 9th grade.",
      ],
      softwareSkills: [
        {
          skillName: "Java",
          fontAwesomeClassname: "logos:java",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Python",
          fontAwesomeClassname: "logos:python",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "C++",
          fontAwesomeClassname: "logos:c-plusplus",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Git",
          fontAwesomeClassname: "logos:git-icon",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Linux",
          fontAwesomeClassname: "logos:linux-tux",
          style: {
            backgroundColor: "transparent",
          },
        },
      ],
    },
    {
      title: "Hobbies",
      fileName: "HobbiesImg",
      skills: [
        "📸 Photography",
        "🎹 Music",
        "🚵🏽‍♂️ Travelling",
        "🎮 Gaming",
        "📚 Reading",
        "🎨 Art",
        "✍🏽 Blogging",
      ],
      softwareSkills: [
        {
          skillName: "Photoshop",
          fontAwesomeClassname: "logos:adobe-photoshop",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Lightroom",
          fontAwesomeClassname: "logos:adobe-lightroom",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Spotify",
          fontAwesomeClassname: "logos:spotify-icon",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Twitch",
          fontAwesomeClassname: "logos:twitch",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Goodreads",
          fontAwesomeClassname: "simple-icons:goodreads",
          style: {
            backgroundColor: "transparent",
          },
        }
      ],
    },
  ],
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "linkedin_dp_overlay_round_repos.png",
    description:
      "Feel free to reach out to me on any of my social media. Always up for a chat.",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "I blog about tech, faith and thoughts. Check it out. More content coming soon - subscribe.",
    link: "https://ajuanijustus.substack.com",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Address",
    subtitle: "",
    avatar_image_path: "address_image.svg",
    location_map_link: "",
  },
  phoneSection: {
    title: "Phone Number",
    subtitle: "",
  },
};

// --- Academic Research News ---
const news = [
  {
    date: "Jun 2026",
    text: "Awarded AFHEA (Associate Fellowship of Advance HE) recognition through the BEACON scheme at the University of Birmingham.",
    link: ""
  },
  {
    date: "May 2026",
    text: "Traveled to Paphos, Cyprus to present 'Grounded Communication Policies in Heterogeneous Agent Reinforcement Learning' at AAMAS 2026.",
    link: "https://doi.org/10.65109/OAYF2008"
  },
  {
    date: "May 2026",
    text: "Delivered an oral presentation on 'voice2mode: Phonation Mode Classification in Singing' at the Speech, Music, and Mind (SMM) workshop at ICASSP 2026 in Barcelona, Spain.",
    link: "https://doi.org/10.1109/ICASSP55912.2026.11460695"
  },
  {
    date: "May 2026",
    text: "Successfully managed and hosted 3 community science outreach events across Birmingham city centre for Pint of Science UK.",
    link: "https://pintofscience.co.uk/team/Birmingham%20Team/"
  },
  {
    date: "Mar 2026",
    text: "Awarded a competitive international travel scholarship from AAMAS to attend and present at the conference.",
    link: ""
  },
  {
    date: "Feb 2026",
    text: "Accepted to present research progress at the prestigious AAMAS 2026 Doctoral Consortium.",
    link: ""
  },
  {
    date: "Jan 2026",
    text: "Started volunteering as Event Manager for Pint of Science UK (Birmingham Team) alongside continuing PGTA teaching commitments for Software Workshop 2 and Building Usable Software.",
    link: "https://pintofscience.co.uk/team/Birmingham%20Team/"
  },
  {
    date: "Oct 2025",
    text: "Traveled to Bologna, Italy to deliver an oral presentation on multi-agent collaboration frameworks at ECAI 2025.",
    link: ""
  },
  {
    date: "Sep 2025",
    text: "Commenced second year of PhD; continued as PGTA for MSc Software Workshop (Python), Foundation Math/Logic modules, and technical interview mentor at ALGO Club.",
    link: ""
  },
  {
    date: "May 2025",
    text: "Successfully defended PhD Thesis Proposal, officially qualifying to progress with doctoral research.",
    link: ""
  },
  {
    date: "Sep 2024",
    text: "Continued PGTA teaching for Python and Math/Logic foundations. Joined the staff-led ALGO Club to coach students on Data Structures, Algorithms, and LeetCode.",
    link: ""
  },
  {
    date: "May 2024",
    text: "Officially commenced PhD research in Human-Agent Teaming in Heterogenous-Agent Reinforcement Learning at the University of Birmingham following ATAS clearance.",
    link: ""
  },
  {
    date: "Jan 2024",
    text: "Accepted a fully-funded PhD offer at the University of Birmingham, co-funded by the School of Computer Science and the Alan Turing Institute.",
    link: ""
  },
  {
    date: "Dec 2023",
    text: "Published and presented first-ever peer-reviewed paper 'Music Generation using Human-In-The-Loop Reinforcement Learning' at the IEEE International Conference on Big Data.",
    link: "https://doi.org/10.3233/FAIA251250"
  },
  {
    date: "Sep 2023",
    text: "Graduated with a Distinction (85.6%) in MSc Computer Science from the University of Birmingham and joined the faculty as a Post Graduate Teaching Assistant (PGTA) for Java OOP modules.",
    link: ""
  },
  {
    date: "Jun 2023",
    text: "Received the Postgraduate Professional Development Award (PPDA).",
    link: ""
  },
  {
    date: "Jun 2023",
    text: "Won 2nd Place at the UoB BEAR Challenge 2023 running deep learning workflows on the Baskerville HPC Cluster.",
    link: ""
  },
  {
    date: "Jan 2023",
    text: "Appointed Equality, Diversity, and Inclusion (EDI) Student Representative, acting as a liaison between the student body and school leadership board.",
    link: ""
  },
  {
    date: "Oct 2022",
    text: "Won 3 awards at HackTheMidlands 7.0 (3rd Overall, Spooooookiest Hack, Fun! Hack) and elected PGT Representative for the Computer Science Society.",
    link: "https://devpost.com/software/digimusician"
  },
  {
    date: "Sep 2022",
    text: "Elected as the Post Graduate Taught (PGT) Rep at the Computer Science Society at University of Birmingham, working with the committee to organise events and make sure all postgrad students (from 7 PGT courses) feel welcomed at CSS!",
    link: "https://cssbham.com/committee-archive"
  },
  {
    date: "Sep 2022",
    text: "Relocated to the UK to start an MSc in Computer Science at the University of Birmingham, serving as Student Representative for the cohort at Student-Staff Forum (SSF).",
    link: "https://cssbham.com/committee-archive"
  },
  {
    date: "Jan 2022",
    text: "Transitioned to Machine Learning Engineer following the acquisition and integration of BRIDGEi2i into Accenture Applied Intelligence.",
    link: ""
  },
  {
    date: "Aug 2021",
    text: "Received the BRIDGEi2i Team Award recognizing successful production deployment and client delivery milestones.",
    link: ""
  },
  {
    date: "Apr 2021",
    text: "Promoted to Machine Learning Engineering Consultant at BRIDGEi2i, scaling responsibility to lead end-to-end enterprise client projects.",
    link: ""
  },
  {
    date: "Nov 2020",
    text: "Awarded the corporate Rising Star Award at BRIDGEi2i for delivering high-impact Go-To-Market solution architectures and converting PoCs into client wins.",
    link: ""
  },
  {
    date: "Mar 2020",
    text: "Promoted to Data Scientist at BRIDGEi2i in record time (under a year from hiring).",
    link: ""
  },
  {
    date: "Sep 2019",
    text: "Received the corporate SPOT Award for leadership and driving continuous innovation initiatives inside the Humans of Analytics (HoA) community.",
    link: ""
  },
  {
    date: "Jun 2019",
    text: "Graduated with a B.Tech (Honours) in Civil Engineering from College of Engineering, Trivandrum and started professional data science career as Junior Data Scientist at an analytics startup BRIDGEi2i.",
    link: ""
  }
];

// --- Selected Research Publications ---
const publications = [
  {
    venue: "AAMAS 2026",
    title: "Grounded Communication Policies in Heterogeneous Agent Reinforcement Learning",
    authors: "Aju Ani Justus",
    fullVenue: "25th International Conference on Autonomous Agents and Multiagent Systems (AAMAS 2026) [Awarded scholarship from AAMAS to attend and present]",
    links: {
      pdf: "https://doi.org/10.65109/OAYF2008",
      code: "",
      bibtex: `@inproceedings{justus2026grounded,
        author = {Justus, Aju Ani},
        title = {Grounded Communication Policies in Heterogeneous Agent Reinforcement Learning},
        year = {2026},
        isbn = {9798400723179},
        publisher = {International Foundation for Autonomous Agents and Multiagent Systems},
        address = {Richland, SC},
        url = {https://doi.org/10.65109/OAYF2008},
        doi = {10.65109/OAYF2008},
        booktitle = {Proceedings of the 25th International Conference on Autonomous Agents and Multiagent Systems},
        pages = {4026–4028},
        numpages = {3},
        keywords = {multi-agent systems, agent communication, multi-agent reinforcement learning, heterogeneous agents, coordination},
        location = {Paphos, Cyprus},
        series = {AAMAS '26}
      }`,
      website: ""
    }
  },
  {
    venue: "ICASSP 2026",
    title: "voice2mode: Phonation Mode Classification in Singing using Self-Supervised Speech Models",
    authors: "Aju Ani Justus, Ruchit Agrawal, Sudarsana Reddy Kadiri, Shrikanth Narayanan",
    fullVenue: "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP 2026) [Oral presentation]",
    links: {
      pdf: "https://doi.org/10.1109/ICASSP55912.2026.11460695",
      code: "",
      bibtex: `@inproceedings{justus2026voice2mode,
        author={Justus, Aju Ani and Agrawal, Ruchit and Kadiri, Sudarsana Reddy and Narayanan, Shrikanth},
        booktitle={ICASSP 2026 - 2026 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)}, 
        title={VOICE2MODE: Phonation Mode Classification in Singing Using Self-Supervised Speech Models}, 
        year={2026},
        volume={},
        number={},
        pages={22072-22076},
        doi={10.1109/ICASSP55912.2026.11460695}
      }`,
      website: "https://github.com/ajuanijustus/voice2mode"
    }
  },
  {
    venue: "ECAI 2025",
    title: "LLMs as Policy-Agnostic Teammates: A Case Study in Human Proxy Design for Heterogeneous Agent Teams",
    authors: "Aju Ani Justus, Chris Baber",
    fullVenue: "Proceedings of the 28th European Conference on Artificial Intelligence (ECAI 2025) [Oral presentation]",
    links: {
      pdf: "https://doi.org/10.3233/FAIA251250",
      code: "",
      bibtex: `@inproceedings{justus2025llms,
        title={LLMs as Policy-Agnostic Teammates: A Case Study in Human Proxy Design for Heterogeneous Agent Teams},
        author={Justus, Aju Ani and Baber, Chris},
        booktitle={Proceedings of the 28th European Conference on Artificial Intelligence (ECAI 2025)},
        volume={413},
        series={Frontiers in Artificial Intelligence and Applications},
        pages={3711--3718},
        year={2025},
        publisher={IOS Press},
        doi={10.3233/FAIA251250}
      }`,
      website: ""
    }
  },
  {
    venue: "BigData 2023",
    title: "Music Generation using Human-In-The-Loop Reinforcement Learning",
    authors: "Aju Ani Justus",
    fullVenue: "Proceedings of the 2023 IEEE International Conference on Big Data (BigData) [Online presentation]",
    links: {
      pdf: "https://arxiv.org/pdf/2501.15304",
      code: "",
      bibtex: `@misc{justus2025musicgenerationusinghumanintheloop,
        title={Music Generation using Human-In-The-Loop Reinforcement Learning}, 
        author={Aju Ani Justus},
        year={2025},
        eprint={2501.15304},
        archivePrefix={arXiv},
        primaryClass={cs.SD},
        url={https://arxiv.org/abs/2501.15304}
      }`,
      website: "https://github.com/ajuanijustus/music-gen-hitl-rl"
    }
  }
];

// --- Teaching Assistantships & Commitments ---
const teaching = [
  {
    role: "Post Graduate Teaching Associate",
    course: "Math and Logic for Comp Sci, Software Workshop (Python), OOP (Java)",
    institution: "University of Birmingham",
    duration: "2023 - Present"
  },
  {
    role: "Head Course Instructor",
    course: "Foundations of Python, Time-Series Analysis",
    institution: "Center of Excellence, Accenture AI",
    duration: "2020 - 2022"
  }
];

// TEACHING
// Teaching & Talks - also add talks to news
// Spring 2024
// Data Structures and Algorithms (Conversion MSc CS)
// University of Birmingham
// Postgraduate Teaching Assistant.
// Autumn 2023
// Computer-Aided Verification (BSc/MSci CS, years 3 and 4)
// University of Birmingham
// Postgraduate Teaching Assistant.

// RECOGNITION
// Awards & Scholarships

// SERVICE
// Academic Service
// 2025
// General Chair, BASiC'25
// Chairing the Birmingham Algorithms, Synthesis, and Computability seminar series.
// 2024–present
// PGR Representative, UoB CS Research Committee
// 2024
// Artifact Evaluation Committee Member
// CAV'24, SAS'24, ECOOP'24.
// 2024–present
// Mentor, SIGPLAN-M
// 2023
// Student Volunteer, CIKM'23

// Email
// a.pal@bham.ac.uk
// Primary academic email
// abhinandan.mike123@gmail.com
// Personal email

// include sociotechnical systems, eq2rl, AA + MAS reading group

export {
  settings,
  seo,
  greeting,
  greetingLegacy,
  socialMediaLinks,
  skills,
  contactPageData,
  news,
  publications,
  teaching,
};
