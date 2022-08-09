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
  subTitle: "Let all that you do be done in love.",
  resumeLink:
    'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/e466b454-9889-46a6-8c21-b9d12cfc5cfd/Aju_Ani_Justus.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220809T221327Z&X-Amz-Expires=86400&X-Amz-Signature=92570224b0d66cf08be60a59dcb5ac58d362412d6a49399e5afbdca0394d1556&X-Amz-SignedHeaders=host&response-content-disposition=filename %3D"Aju%2520Ani%2520Justus.pdf"&x-id=GetObject',
  portfolio_repository: "",
};

const socialMediaLinks = [
  /* Your Social Media Link */
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
  //   link: "",
  //   fontAwesomeIcon: "fa-facebook-f", // Reference https://fontawesome.com/icons/facebook-f?style=brands
  //   backgroundColor: "#181717", // 1877F2  https://simpleicons.org/?q=facebook
  // },
  {
    name: "Instagram",
    link: "https://www.instagram.com/ajuanijustus/",
    fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#181717", // E4405F Reference https://simpleicons.org/?q=instagram
  },
  {
    name: "Github",
    link: "https://github.com/ajuanijustus",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "Goodreads",
    link: "https://www.goodreads.com/user/show/50358068-aju-justus",
    fontAwesomeIcon: "fa-goodreads", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#181717", // E4405F Reference https://simpleicons.org/?q=instagram
  },
  {
    name: "Twitch",
    link: "https://www.twitch.tv/ajewdor",
    fontAwesomeIcon: "fa-twitch", // Reference https://fontawesome.com/icons/instagram?style=brands
    backgroundColor: "#181717", // E4405F Reference https://simpleicons.org/?q=instagram
  },
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
        {
          skillName: "GCP",
          fontAwesomeClassname: "simple-icons:googlecloud",
          style: {
            color: "#4285F4",
          },
        },
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
        {
          skillName: "react.js",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
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
          fontAwesomeClassname: "simple-icons:java",
          style: {
            color: "#E34F26",
          },
        },
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
        //   skillName: "Photography",
        //   fontAwesomeClassname: "fa-solid fa-camera-retro",
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
        "• Events Coordinator: Aug 2016 – Jul 2017",
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
          title: "ML Engineering Consultant",
          company: "Accenture AI",
          company_url: "",
          logo_path: "",
          duration: "June 2020 - PRESENT",
          location: "Bengaluru",
          description:
            "I am working on automating healthcare products. The projects involve automation for process improvements and for significantly enhancing the profits. I am currently working on Cancer Survival and Reoccurence Prediction. Our goal is to make AI system which scales and removes doctor dependency as much as possible.",
          color: "#0879bf",
        },
      ],
    },
    {
      title: "Internships",
      experiences: [
        {
          title: "Civil Engg",
          company: "",
          company_url: "",
          logo_path: ".png",
          duration: "May 2019 - Sept 2019",
          location: "Kerala",
          description:
            "I have worked on project of predicting freight rates based on previous data. There were two objectives: (1) To build a forecasting engine to predict daily freight rates. (2) To embed feature in the model which can explain the seasonal major changes in freight rate based on regions and locations. I have closely worked with deep learning models in combination with statistical methods to create solution for this. At the end of internship, I had created model deployed on AWS EC2 with the use of Kafka stream jobs, ElasticSearch and PostgreSQL.",
          color: "#ee3c26",
        },
      ],
    },
    {
      title: "Volunteerships",
      experiences: [
        {
          title: "LIFE",
          company: "Kerala Government",
          company_url: "",
          logo_path: ".png",
          duration: "June 2019 - April 2020",
          location: "Trivandrum, Kerala",
          description: "",
          color: "#4285F4",
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
