import { Org, Employee } from "@prisma/client";

export const orgSeedData: Omit<Org, "id">[] = [
  {
    role: "CEO/Chair of Board",
    name: "Jo-Anne Sinclair",
    description:
      "A chief executive officer, the highest-ranking person in a company or other institution, ultimately responsible for making managerial decisions.",
  },
  {
    role: "COO/VP Operations",
    name: "Jackson Smith",
    description:
      "The chief operating officer (COO) is responsible for executing and implementing the operational directives set by the CEO and the board of directors.",
  },
  {
    role: "CFO/VP Administration",
    name: "Susan Thomas",
    description:
      "A chief financial officer, a senior executive with responsibility for the financial affairs of a corporation or other institution. The vice president of administration position is responsible for directing all of the administrative functions of the corporation in accordance with industry standards, where applicable, regulatory agencies, as appropriate and company objectives and policies.",
  },
  {
    role: "VP Client Services",
    name: "Richa Kaur",
    description:
      "Responsible for the Consumer Banking division performing a variety of roles including lending, investing, risk management, marketing, and technology. Their team provides a suite of solutions to help our retail customers meet their financial goals. Also responsible for the Commercial Banking Division performing a variety of roles including lending, investing, risk management, marketing, and technology. Their team provides a suite of solutions to help our retail customers meet their financial goals.",
  },
  {
    role: "CIO",
    name: "Josee Benjamin",
    description:
      "Chief Information Officer (CIO), chief digital information officer (CDIO) or information technology (IT) director is a job title commonly given to the most senior executive in a bank responsible for the traditional information technology and computer systems that support bank goals.",
  },
  {
    role: "VP Sales & Marketing",
    name: "Vincent Grey",
    description:
      "Responsible for the overall strategic marketing plans for an entire organization (or lines of business and brands within an organization) in order to attract potential customers and retain existing ones.",
  },
  {
    role: "Director Financial and Audit Svcs",
    name: "Rupa Kharki (she/her/hers)",
    description:
      "Sometimes called a compliance manager, responsible for making sure that a company is conducting its business in full compliance with all national and international laws and regulations that pertain to its particular industry, as well as professional standards and accepted business practices.",
  },
  {
    role: "Director Human Resources",
    name: "Xun Kuang",
    description:
      "Responsible for a number of job duties related to organizational development, recruitment and staffing, employment law, performance management, employee relations, and compensation and benefits.",
  },
  {
    role: "Director Legal Services/General Counsel",
    name: "Stien Pedersen",
    description: "The senior executive managing legal affairs for the company.",
  },
  {
    role: "Director Information Technology",
    name: "Sandra Bear",
    description:
      "Manages the IT infrastructure, operations, and services; and how it enables businesses/individuals to access and make use of data and services.",
  },
  {
    role: "Director Information Security and CISSO",
    name: "Gus Blue",
    description:
      "A chief information security officer (CISO) is the senior-level executive within an organization responsible for establishing and maintaining the bank security vision, strategy, and program to ensure information assets and technologies are adequately protected.",
  },
  {
    role: "Director Accounting",
    name: "Sam Kong",
    description:
      "Responsible for analysis and reconciliation of accounts and in development and implementation of accounting policies, procedures and controls.",
  },
  {
    role: "Director Physical Security",
    name: "Valentine Smith",
    description:
      "Responsible for identifying, assessing, and integrating physical security operations, technology, and policy solutions at the organization.",
  },
  {
    role: "Director Facilities",
    name: "Mariya Kaperski",
    description: "To be added.",
  },
  {
    role: "Manager, Business Continuity and Disaster Recovery",
    name: "Abd al-Hamid Alami",
    description:
      "Develop, maintain, or implement business continuity and disaster recovery strategies and solutions, including risk assessments, business impact analyses, strategy selection, and documentation of business continuity and disaster recovery procedures.",
  },
  {
    role: "Manager, Internal Audit",
    name: "Victoria Gray",
    description:
      "Perform full audits, including risk management, control management, and assessing financial reliability. The audit processes ensure that compliance is met within all the company's systems.",
  },
  {
    role: "Chief Architect",
    name: "Cheryl Guru",
    description: "To be added.",
  },
  {
    role: "Manager, Security Architecture",
    name: "Jean Ngoy",
    description:
      "Plays a crucial role in designing and overseeing the implementation of security measures for an organization's information systems. They ensure that the systems are resistant to potential threats while remaining compliant with security policies and regulations.",
  },
  {
    role: "Solution Architect, Online Banking",
    name: "Kris Gold",
    description: "To be added.",
  },
  {
    role: "Manager, Application Solutions",
    name: "Isaac Smith",
    description: "To be added.",
  },
  {
    role: "Lead Developer, Online Banking",
    name: "Payton Frost",
    description: "To be added.",
  },
  {
    role: "Manager, Operational Risk",
    name: "Samantha Nettle",
    description:
      "Responsible for monitoring, handling, and measuring operational and economic risk exposures in order to minimize risk and place appropriate controls in place.",
  },
  {
    role: "Manager, Vendor Relations",
    name: "Yolanda Ferreira",
    description: "To be added.",
  },
  {
    role: "Manager, Purchasing",
    name: "Samir Hassan",
    description:
      "Responsible for leading all global procurement efforts to efficiently and effectively enable spend owners such as business units and functional partners to maximize the value they receive from suppliers to meet their objectives.",
  },
  {
    role: "Manager, Communications",
    name: "Yuna Aikawa",
    description: "To be added.",
  },
  {
    role: "Manager Customer Experience and Community Eng.",
    name: "Jonathan Carberry",
    description:
      "Foster customer loyalty through high-quality interactions at each step. Responsible for improving the experiences customers have with organizations, with the goal of increasing customer satisfaction.",
  },
  {
    role: "Manager of Sales",
    name: "Roland Wei",
    description:
      "Lead a sales team by providing guidance, training, and mentorship, setting sales quotas and goals, creating sales plans, analyzing data, assigning sales territories and building their team.",
  },
  {
    role: "Manager, Marketing",
    name: "Pran Singh",
    description:
      "Responsible for developing, implementing and executing strategic marketing plans for an entire organization (or lines of business and brands within an organization) in order to attract potential customers and retain existing ones.",
  },
  {
    role: "Business Analyst, Online Banking",
    name: "Linda Analyst",
    description: "To be added.",
  },
  {
    role: "Manager, Contract Management",
    name: "Esra Sedge",
    description: "To be added.",
  },
  {
    role: "Manager, Compliance Management",
    name: "Pranee Tan",
    description: "To be added.",
  },
  {
    role: "Manager IT End User Service Desk",
    name: "Karmen Spruce",
    description:
      "Responsible for managing daily operations of the service desk, managing the service desk team, representing the team to other elements of the organization, and helping to ensure that the service desk is constantly developing and improving.",
  },
  {
    role: "Manager IT End User Computing",
    name: "Haydar Katirci",
    description:
      "Delivers operational day-to-day support for the operations of end-user computing services organization wide, in collaboration with third-party vendors.",
  },
  {
    role: "Manager IT Telecom and Infrastructure",
    name: "Jill Harkness",
    description:
      "Responsible for the daily operations of infrastructure, telecom, and infrastructure support staff. Works with other business and IT teams to ensure that services and infrastructure needs are met.",
  },
  {
    role: "Manager, Data Center and Hosting Services",
    name: "Tim Morrison",
    description:
      "Responsible for the day to day operations of the datacenter, contracting cloud services, and ensuring the high availability of data to the stakeholders.",
  },
  {
    role: "Manager of IT Risk Management",
    name: "Aleksandr Milosevic",
    description:
      "Responsible for identifying, assessing, and mitigating risks that could potentially jeopardize an organization's assets, profitability, or existence.",
  },
  {
    role: "Manager IT, project management office",
    name: "Jim Wingnut",
    description: "To be added.",
  },
  {
    role: "Left Vacant for future expansion",
    name: "Vacant",
    description: "To be added.",
  },
];

export const employeeSeedData: Omit<Employee, "id">[] = [
  { name: "Zoë Robins", department: "Administration" },
  { name: "Madeleine Madden", department: "Administration" },
  { name: "Josha Sadowski", department: "Audit" },
  { name: "Kate Fleetwood", department: "Audit" },
  { name: "Priyanka Bose", department: "Banking Operations" },
  { name: "Hammed Animashaun", department: "Banking Operations" },
  { name: "Álvaro Morte", department: "Banking Operations" },
  { name: "Taylor Napier", department: "Banking Operations" },
  { name: "Alan Simmonds", department: "Banking Operations" },
  { name: "Gil Cardinal", department: "Communications" },
  { name: "Richard J. Lewis", department: "Communications" },
  { name: "Randy Bradshaw", department: "Corporate Services" },
  { name: "Tracey Cook", department: "Corporate Services" },
  { name: "Lubomir Mykytiuk", department: "Corporate Services" },
  { name: "Dakota House", department: "Facilities" },
  { name: "Lori Lea Okemah", department: "Facilities" },
  { name: "Renae Morrisseau", department: "Facilities" },
  { name: "Rick Belcourt", department: "Facilities" },
  { name: "Selina Hanusa", department: "Financial Services" },
  { name: "Buffy Gaudry", department: "Financial Services" },
  { name: "Shaneen Ann Fox", department: "Financial Services" },
  { name: "Allan Little", department: "Financial Services" },
  { name: "Danny Rabbit", department: "Financial Services" },
  { name: "Jesse Ed Azure", department: "Human Resources" },
  { name: "Stacy Da Silva", department: "Human Resources" },
  { name: "Vladimír Valenta", department: "Human Resources" },
  { name: "Samone Sayeses-Whitney", department: "Human Resources" },
  { name: "Paul Coeur", department: "Human Resources" },
  { name: "Graham Greene", department: "Information Technology" },
  { name: "Sandika Evergreen", department: "Information Technology" },
  {
    name: "Jennifer Rodriguez (Software Developer)",
    department: "Information Technology",
  },
  { name: "Aiyana Littlebear", department: "IT Technician" },
  { name: "Inara Thunderbird", department: "IT Technician" },
  { name: "Kaya Runningbrook", department: "IT Technician" },
  { name: "Elara Firehawk", department: "IT Technician" },
  { name: "Siona Moonflower", department: "IT Technician" },
  { name: "Kaiyu Greywolf", department: "IT Technician" },
  { name: "Ayawamat Nightwind", department: "IT Technician" },
  { name: "Tala Braveheart", department: "IT Technician" },
  { name: "Iniko Stonebear", department: "IT Technician" },
  { name: "Onatah Redhawk", department: "IT Technician" },
];
