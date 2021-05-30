/* Change this file to get your personal Porfolio */

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
const greeting = {
  title: "Aju Ani Justus",
  logo_name: "AjuAniJustus",
  subTitle:
    "Something catchy and alluring.",
  resumeLink:
    "",
  portfolio_repository: "",
};

const socialMediaLinks = [
  /* Your Social Media Link */
  {
    name: "Github",
    link: "https://github.com/ajuanijustus",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/ajuanijustus/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#181717", // 0077B5 Reference https://simpleicons.org/?q=linkedin
  },
  // {
  //   name: "YouTube",
  //   link: "https://www.youtube.com/channel/UC_amoXmmxSY9KusoDczDTXQ",
  //   fontAwesomeIcon: "fa-youtube", // Reference https://fontawesome.com/icons/youtube?style=brands
  //   backgroundColor: "#181717", // FF0000 Reference https://simpleicons.org/?q=youtube
  // },
  {
    name: "Gmail",
    link: "mailto:ajuani1997@gmail.com",
    fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
    backgroundColor: "#181717", // D14836 Reference https://simpleicons.org/?q=gmail
  },
  {
    name: "Twitter",
    link: "https://twitter.com/ajuanijustus",
    fontAwesomeIcon: "fa-twitter", // Reference https://fontawesome.com/icons/twitter?style=brands
    backgroundColor: "#181717", // 1DA1F2 Reference https://simpleicons.org/?q=twitter
  },
  // {
  //   name: "Facebook",
  //   link: "https://www.facebook.com/laymanbrother.19/",
  //   fontAwesomeIcon: "fa-facebook-f", // Reference https://fontawesome.com/icons/facebook-f?style=brands
  //   backgroundColor: "#181717", // 1877F2  https://simpleicons.org/?q=facebook
  // },
  {
    name: "Instagram",
    link: "https://www.instagram.com/ajuanijustus/",
    fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#181717", // E4405F Reference https://simpleicons.org/?q=instagram
  },
];

const skills = {
  data: [
    {
      title: "Data Science",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Developing highly scalable production ready models for various deeplearning and statistical use cases.",
        "⚡ Experience of working with Supply Chain and Consumer Packaged Goods clients.",
        "⚡ Complex quantitative modelling for dynamic forecasting and time series analysis.",
      ],
      softwareSkills: [
        {
          skillName: "Python",
          fontAwesomeClassname: "ion-logo-python",
          style: {
            backgroundColor: "transparent",
            color: "#3776AB",
          },
        },
        {
          skillName: "Tensorflow",
          fontAwesomeClassname: "logos-tensorflow",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Keras",
          fontAwesomeClassname: "simple-icons:keras",
          style: {
            backgroundColor: "white",
            color: "#D00000",
          },
        },
        {
          skillName: "MySQL",
          fontAwesomeClassname: "simple-icons:mysql",
          style: {
            backgroundColor: "transparent",
            color: "#4479A1",
          },
        },
        {
          skillName: "PySpark",
          fontAwesomeClassname: "simple-icons:apachespark",
          style: {
            backgroundColor: "transparent",
            color: "#E25A1C",
          },
        },
      ],
    },
    {
      title: "Cloud Technologies",
      fileName: "",
      skills: [
        "⚡ Experience working on multiple cloud platforms",
        "⚡ Hosting and maintaining websites on virtual machine instances along with integration of databases",
        "⚡ Deploying deep learning models on cloud to use on mobile devices",
        "⚡ Setting up streaming jobs from DB to Server or vice-versa on GCP and AWS",
      ],
      softwareSkills: [
        {
          skillName: "GCP",
          fontAwesomeClassname: "simple-icons:googlecloud",
          style: {
            color: "#4285F4",
          },
        },
        // {
        //   skillName: "AWS",
        //   fontAwesomeClassname: "simple-icons:amazonaws",
        //   style: {
        //     color: "#FF9900",
        //   },
        // },
        {
          skillName: "Azure",
          fontAwesomeClassname: "simple-icons:microsoftazure",
          style: {
            color: "#0089D6",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        // {
        //   skillName: "Kubernetes",
        //   fontAwesomeClassname: "simple-icons:kubernetes",
        //   style: {
        //     color: "#326CE5",
        //   },
        // },
      ],
    },
    {
      title: "Education",
      fileName: "FullStackImg",
      skills: [
        "⚡ B.Tech (Honors) graduate from College of Engineering, Trivandrum with a 8.37 CGPA.",
        "⚡ Studied at The School of The Good Shepherd, Trivandrum from 10th grade (𝐂𝐆𝐏𝐀: 𝟗.𝟔) to 12th grade (𝟗𝟑.𝟐%).",
        "⚡ Studied at GEMS Our Own English High School, Sharjah - Boys from 5th grade to 9th grade.",
      ],
      softwareSkills: [
      //   {
      //     skillName: "HTML5",
      //     fontAwesomeClassname: "simple-icons:html5",
      //     style: {
      //       color: "#E34F26",
      //     },
      //   },
      //   {
      //     skillName: "CSS3",
      //     fontAwesomeClassname: "fa-css3",
      //     style: {
      //       color: "#1572B6",
      //     },
      //   },
      //   {
      //     skillName: "JavaScript",
      //     fontAwesomeClassname: "simple-icons:javascript",
      //     style: {
      //       backgroundColor: "#000000",
      //       color: "#F7DF1E",
      //     },
      //   },
      //   {
      //     skillName: "ReactJS",
      //     fontAwesomeClassname: "simple-icons:react",
      //     style: {
      //       color: "#61DAFB",
      //     },
      //   },
      ],
    },
    {
      title: "Hobbies",
      fileName: "DesignImg",
      skills: [
        "⚡ Confusion",
        "⚡ Doubt",
        "⚡ Indecisive",
        "🎮 Gaming",
      ],
      softwareSkills: [
        // {
        //   skillName: "Adobe Photoshop",
        //   fontAwesomeClassname: "simple-icons:adobephotoshop",
        //   style: {
        //     color: "#31A8FF",
        //   },
        // },
        // {
        //   skillName: "Adobe Lightroom",
        //   fontAwesomeClassname: "simple-icons:adobelightroom",
        //   style: {
        //     color: "#31A8FF",
        //   },
        // },
        // {
        //   skillName: "Figma",
        //   fontAwesomeClassname: "simple-icons:figma",
        //   style: {
        //     color: "#F24E1E",
        //   },
        // },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    {
      siteName: "HackerRank",
      iconifyClassname: "simple-icons:hackerrank",
      style: {
        color: "#2EC866", //2EC866
      },
      profileLink: "https://www.hackerrank.com/ajuanijustus",
    },
    {
      siteName: "Kaggle",
      iconifyClassname: "simple-icons:kaggle",
      style: {
        color: "#20BEFF", // 20BEFF
      },
      profileLink: "https://www.kaggle.com/ajuanijustus",
    },
  ],
};

const degrees = {
  degrees: [
    {
      title: "College of Engineering, Trivandrum",
      subtitle: "B.Tech. in Civil Engineering",
      logo_path: "cet_emblem.png",
      alt_name: "CET",
      duration: "2015 - 2019",
      descriptions: [
        "Graduated as a 𝐇𝐨𝐧𝐨𝐮𝐫𝐬 𝐒𝐭𝐮𝐝𝐞𝐧𝐭, having maintained a strong grade point average, and having earned additional credits by taking on 2 additional elective courses and 2 additional M.Tech courses, during the last 4 semesters of the program.",
        "𝐏𝐎𝐒𝐈𝐓𝐈𝐎𝐍𝐒 𝐎𝐅 𝐑𝐄𝐒𝐏𝐎𝐍𝐒𝐈𝐁𝐈𝐋𝐈𝐓𝐘:",
        "👷🏾 𝗜𝗻𝗱𝗶𝗮𝗻 𝗖𝗼𝗻𝗰𝗿𝗲𝘁𝗲 𝗜𝗻𝘀𝘁𝗶𝘁𝘂𝘁𝗲, 𝗖𝗘𝗧 𝗦𝘁𝘂𝗱𝗲𝗻𝘁 𝗖𝗵𝗮𝗽𝘁𝗲𝗿 (𝗜𝗖𝗜-𝗖𝗘𝗧)",
        "• Secretary: Aug 2018 – Jun 2019",
        "• Assistant Public Relations Head: Aug 2017 – Jul 2018",
        "📚 𝗟𝗶𝘁𝗲𝗿𝗮𝗿𝘆 𝗦𝗼𝗰𝗶𝗲𝘁𝘆, 𝗖𝗘𝗧 (𝗟𝗶𝘁𝗦𝗼𝗰-𝗖𝗘𝗧)",
        "• Chairperson: Aug 2017 – Jul 2018",
        "• Vice Chairperson: Aug 2016 – Jul 2017",
        "👨🏽‍💼 𝗜𝗻𝗻𝗼𝘃𝗮𝘁𝗶𝗼𝗻 𝗮𝗻𝗱 𝗘𝗻𝘁𝗿𝗲𝗽𝗿𝗲𝗻𝗲𝘂𝗿𝘀𝗵𝗶𝗽 𝗗𝗲𝘃𝗲𝗹𝗼𝗽𝗺𝗲𝗻𝘁 𝗖𝗲𝗹𝗹, 𝗖𝗘𝗧 (𝗜𝗘𝗗𝗖-𝗖𝗘𝗧)",
        "• Chief Operating Officer: Jul 2018 – May 2019",
        "📷 𝗣𝗵𝗼𝘁𝗼𝗴𝗿𝗮𝗽𝗵𝘆 𝗖𝗹𝘂𝗯, 𝗖𝗘𝗧 𝗦𝗵𝘂𝘁𝘁𝗲𝗿𝗯𝘂𝗴𝘀",
        "• Treasurer: Aug 2017 – Jul 2018",
        "• Events Coordinator: Aug 2016 – Jul 2017"
      ],
      website_link: "https://www.cet.ac.in/",
    },
  ],
};

const certifications = {
  certifications: [
    {
      title: "The Web Developer Bootcamp",
      subtitle: "",
      logo_path: "_udemy.jpg",
      certificate_link:
        "https://www.udemy.com/certificate/UC-0ea51c1a-d97e-4327-9990-2df80637a37d/",
      alt_name: "Udemy",
      color_code: "#EA5153",
    },
    {
      title: "Neural Networks and Deep Learning",
      subtitle: "",
      logo_path: "_deeplearning_ai.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/C64SUS5Y4TBT",
      alt_name: "deeplearning.ai",
      color_code: "#00000099",
    },
    {
      title: "Applied Text Mining in Python",
      subtitle: "",
      logo_path: "_michigan.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/UUJQA8WBWR9P",
      alt_name: "University of Michigan",
      color_code: "#FFFFFF",
    },
    {
      title: "Cloud Engineering",
      subtitle: "",
      logo_path: "_gcp.jpg",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/specialization/certificate/3JAVEXSWKTNW",
      alt_name: "Google Cloud Platform",
      color_code: "#1D1D1D",
    },
    {
      title: "Game Theory",
      subtitle: "",
      logo_path: "_stanford.jpg",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/VUXWU2HPAYTB",
      alt_name: "Stanford online",
      color_code: "#A80532",
    },
    {
      title: "Data Engineering, Big Data, and Machine Learning on GCP",
      subtitle: "",
      logo_path: "_gcp.jpg",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/specialization/certificate/WGXZ7E8FZZ5W",
      alt_name: "Google Cloud Platform",
      color_code: "#1D1D1D",
    },
    {
      title: "Understanding and Visualizing Data with Python",
      subtitle: "",
      logo_path: "_michigan.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/TV2C7F4T9RBP",
      alt_name: "University of Michigan",
      color_code: "#FFFFFF",
    },
    {
      title: "Introduction to Data Science in Python",
      subtitle: "",
      logo_path: "_michigan.png",
      certificate_link:
        "https://www.coursera.org/account/accomplishments/certificate/WGCKN6NDD67Z",
      alt_name: "University of Michigan",
      color_code: "#FFFFFF",
    },
    
  ],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work, Internship and Volunteership",
  description:
    "I have worked with many evolving startups as ML and DL Developer, Designer and Software Architect. I have also worked with some well established companies mostly as AI Developer. I love organising events and that is why I am also involved with many opensource communities as a representative.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      experiences: [
        {
          title: "Associate AI Engineer",
          company: "Legato Health Technology",
          company_url: "https://legatohealthtech.com/",
          logo_path: "legato_logo.png",
          duration: "June 2020 - PRESENT",
          location: "Hyderabad, Telangana",
          description:
            "I am working on automating healthcare products. The projects involve automation for process improvements and for significantly enhancing the profits. I am currently working on Cancer Survival and Reoccurence Prediction. Our goal is to make AI system which scales and removes doctor dependency as much as possible.",
          color: "#0879bf",
        },
        {
          title: "Android and ML Developer",
          company: "Muffito Incorporation",
          company_url: "https://www.linkedin.com/company/muffito-inc/about/",
          logo_path: "muffito_logo.png",
          duration: "May 2018 - Oct 2018",
          location: "Pune, Maharashtra",
          description:
            "I have created complete Android Application for locating Pub, Bar and beverage shops around you. I have also worked on implementation of algorithms for Face Detection, Text extraction from Image. I was involved in a team for creating complete software architecure of mobile and web application as well as admin panel for company.",
          color: "#9b1578",
        },
        {
          title: "Android Developer",
          company: "FreeCopy Pvt. Ltd.",
          company_url: "https://www.linkedin.com/company/freecopy/about/",
          logo_path: "freecopy_logo.png",
          duration: "Nov 2017 - Dec 2017",
          location: "Ahmedabad, Gujarat",
          description:
            "FreeCopy is the Start up from Indian Institute of Management, Ahmedabad. I have changed the integration of the whole app from Google to Firebase. I learnt the efﬁcient ways of Data communications like Retroﬁt, Eventbus etc. I experienced the real time start up. I learnt the Design thinking of UI on perspective of People.",
          color: "#fc1f20",
        },
      ],
    },
    {
      title: "Internships",
      experiences: [
        {
          title: "Data Science Research Intern",
          company: "Delhivery Pvt. Ltd.",
          company_url: "https://www.delhivery.com/",
          logo_path: "delhivery_logo.png",
          duration: "May 2019 - Sept 2019",
          location: "Gurgaon, Haryana",
          description:
            "I have worked on project of predicting freight rates based on previous data. There were two objectives: (1) To build a forecasting engine to predict daily freight rates. (2) To embed feature in the model which can explain the seasonal major changes in freight rate based on regions and locations. I have closely worked with deep learning models in combination with statistical methods to create solution for this. At the end of internship, I had created model deployed on AWS EC2 with the use of Kafka stream jobs, ElasticSearch and PostgreSQL.",
          color: "#ee3c26",
        },
        {
          title: "Data Science Intern",
          company: "Intel Indexer LLC",
          company_url:
            "https://opencorporates.com/companies/us_dc/EXTUID_4170286",
          logo_path: "intel_logo.jpg",
          duration: "Nov 2018 - Dec 2018",
          location: "Work From Home",
          description:
            "This is financial Solution Company. I have made Supervised Learning model for the company which can perform time series analysis on Stock price data for 32 companies. I have built LSTM Neural Networks Model and trained the data of 32 companies for last 2 years. This model is also used for forecasting.",
          color: "#0071C5",
        },
      ],
    },
    {
      title: "Volunteerships",
      experiences: [
        {
          title: "Google Explore ML Facilitator",
          company: "Google",
          company_url: "https://about.google/",
          logo_path: "google_logo.png",
          duration: "June 2019 - April 2020",
          location: "Hyderabad, Telangana",
          description:
            "Explore Machine Learning (ML) is a Google-sponsored program for university students to get started with Machine Learning. The curriculum offers 3 tracks of ML Content (Beginner, Intermediate, Advanced) and relies on university student facilitators to train other students on campus and to build opensource projects under this program.",
          color: "#4285F4",
        },
        {
          title: "Microsoft Student Partner",
          company: "Microsoft",
          company_url: "https://www.microsoft.com/",
          logo_path: "microsoft_logo.png",
          duration: "Aug 2019 - May 2020",
          location: "Hyderabad, Telangana",
          description:
            "Microsoft Student Partner is a program for university students to lead the awareness and use of Cloud especially Azure tools in the development of their projects and startups. Under this program, I have organised hands on workshops and seminars to teach Cloud Computing concepts to students.",
          color: "#D83B01",
        },
        {
          title: "Mozilla Campus Captain",
          company: "Mozilla",
          company_url: "https://www.mozilla.org/",
          logo_path: "mozilla_logo.png",
          duration: "Oct 2019 - May 2020",
          location: "Kurnool, Andhra Pradesh",
          description:
            "My responsibility for this program was to create opensource environment in college and in the city. We have organised multiple hackathons on the problems collected by ordinary people from Kurnool city. We have build opensource community of our own college. The community is available at dsc_iiitdmk on github.",
          color: "#000000",
        },
        {
          title: "Developer Students Club Member",
          company: "DSC IIITDM Kurnool",
          company_url:
            "https://www.linkedin.com/company/developer-students-club-iiitdm-kurnool",
          logo_path: "dsc_logo.png",
          duration: "Jan 2018 - May 2020",
          location: "Kurnool, Andhra Pradesh",
          description:
            "We have well established developer club in college which is directly associated with Google Developers. We have developed many interdisciplinary projects under the membership of this club. We have organised workshops and activities on Android Application Development, Flutter and React JS.",
          color: "#0C9D58",
        },
        {
          title: "Developer Program Member",
          company: "Github",
          company_url: "https://github.com/",
          logo_path: "github_logo.png",
          duration: "July 2019 - PRESENT",
          location: "Work From Home",
          description:
            "I am actively contributing to many opensource projects. I have contributed to projects of organisations like Tensorflow, Uber, Facebook, Google, Scikit-learn, Kiwix, Sympy, Python, NVLabs, Fossasia, Netrack, Keras etc. These contributions include bug fixes, feature requests and formulating proper documentation for project.",
          color: "#181717",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "My projects makes use of vast variety of latest technology tools. My best experience is to create Data Science projects and deploy them to web applications using cloud infrastructure.",
  avatar_image_path: "projects_image.svg",
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "animated_ashutosh.png",
    description:
      "I am available on almost every social media. You can message me, I will reply within 24 hours. I can help you with ML, AI, React, Android, Cloud and Opensource Development.",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "For individual fundamental empowerment, I like to write powerful lessons that create impact on each of the reader individually to change the core of their character.",
    link: "https://ashutoshhathidara.wordpress.com",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Address",
    subtitle:
      "Ambavadi vas, Kanodar, T.A.-Palanpur, Dist.-Banaskantha, Gujarat - 385520",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://goo.gl/maps/MpMqtRZytFchMkZ76",
  },
  phoneSection: {
    title: "Phone Number",
    subtitle: "+91 8320758513",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  projectsHeader,
  contactPageData,
};
