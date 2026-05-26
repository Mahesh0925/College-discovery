import { PrismaClient, CollegeType, DegreeType, ExamType, CategoryType } from '@prisma/client';

const prisma = new PrismaClient();

// ── College seed data ──────────────────────────────────────────────────────
const colleges = [
  {
    name: 'Indian Institute of Technology Bombay',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: CollegeType.IIT,
    streams: ['Engineering', 'Technology', 'Science', 'Design', 'Management'],
    nirf_rank: 3,
    established: 1958,
  },
  {
    name: 'Indian Institute of Technology Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    type: CollegeType.IIT,
    streams: ['Engineering', 'Technology', 'Science', 'Management', 'Humanities'],
    nirf_rank: 2,
    established: 1961,
  },
  {
    name: 'Indian Institute of Technology Madras',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: CollegeType.IIT,
    streams: ['Engineering', 'Technology', 'Science', 'Management'],
    nirf_rank: 1,
    established: 1959,
  },
  {
    name: 'Indian Institute of Technology Kanpur',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    type: CollegeType.IIT,
    streams: ['Engineering', 'Technology', 'Science', 'Management', 'Humanities'],
    nirf_rank: 4,
    established: 1959,
  },
  {
    name: 'Indian Institute of Technology Kharagpur',
    city: 'Kharagpur',
    state: 'West Bengal',
    type: CollegeType.IIT,
    streams: ['Engineering', 'Technology', 'Science', 'Architecture', 'Management', 'Law'],
    nirf_rank: 5,
    established: 1951,
  },
  {
    name: 'National Institute of Technology Trichy',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    type: CollegeType.NIT,
    streams: ['Engineering', 'Technology', 'Science', 'Management'],
    nirf_rank: 9,
    established: 1964,
  },
  {
    name: 'BITS Pilani',
    city: 'Pilani',
    state: 'Rajasthan',
    type: CollegeType.BITS,
    streams: ['Engineering', 'Technology', 'Science', 'Pharmacy', 'Management'],
    nirf_rank: 25,
    established: 1964,
  },
  {
    name: 'VIT Vellore',
    city: 'Vellore',
    state: 'Tamil Nadu',
    type: CollegeType.Private,
    streams: ['Engineering', 'Technology', 'Science', 'Management', 'Law'],
    nirf_rank: 11,
    established: 1984,
  },
  {
    name: 'College of Engineering Pune',
    city: 'Pune',
    state: 'Maharashtra',
    type: CollegeType.Government,
    streams: ['Engineering', 'Technology'],
    nirf_rank: 42,
    established: 1854,
  },
  {
    name: 'IIIT Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    type: CollegeType.IIIT,
    streams: ['Engineering', 'Technology', 'Science'],
    nirf_rank: 30,
    established: 1998,
  },
  {
    name: 'Delhi University',
    city: 'New Delhi',
    state: 'Delhi',
    type: CollegeType.Central_University,
    streams: ['Arts', 'Science', 'Commerce', 'Law', 'Management', 'Education'],
    nirf_rank: 11,
    established: 1922,
  },
  {
    name: 'Jadavpur University',
    city: 'Kolkata',
    state: 'West Bengal',
    type: CollegeType.State_University,
    streams: ['Engineering', 'Technology', 'Science', 'Arts', 'Architecture'],
    nirf_rank: 12,
    established: 1955,
  },
  {
    name: 'Manipal Institute of Technology',
    city: 'Manipal',
    state: 'Karnataka',
    type: CollegeType.Deemed,
    streams: ['Engineering', 'Technology', 'Medicine', 'Management', 'Architecture'],
    nirf_rank: 52,
    established: 1957,
  },
  {
    name: 'SRM Institute of Science and Technology',
    city: 'Chennai',
    state: 'Tamil Nadu',
    type: CollegeType.Deemed,
    streams: ['Engineering', 'Technology', 'Medicine', 'Management', 'Science', 'Law'],
    nirf_rank: 36,
    established: 1985,
  },
  {
    name: 'National Institute of Technology Surathkal',
    city: 'Surathkal',
    state: 'Karnataka',
    type: CollegeType.NIT,
    streams: ['Engineering', 'Technology', 'Science', 'Management'],
    nirf_rank: 18,
    established: 1960,
  },
];

// ── Course fees per college ────────────────────────────────────────────────
type CourseFeeData = { course: string; degree: DegreeType; annual_fee: number };

const courseFeeMap: Record<string, CourseFeeData[]> = {
  'Indian Institute of Technology Bombay': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 228650 },
    { course: 'B.Tech Electrical Engineering', degree: DegreeType.BTech, annual_fee: 228650 },
    { course: 'B.Tech Mechanical Engineering', degree: DegreeType.BTech, annual_fee: 228650 },
    { course: 'M.Tech Computer Science', degree: DegreeType.MTech, annual_fee: 68650 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 450000 },
    { course: 'Ph.D Computer Science', degree: DegreeType.PhD, annual_fee: 42000 },
  ],
  'Indian Institute of Technology Delhi': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 217600 },
    { course: 'B.Tech Electronics & Communication', degree: DegreeType.BTech, annual_fee: 217600 },
    { course: 'B.Tech Civil Engineering', degree: DegreeType.BTech, annual_fee: 217600 },
    { course: 'M.Tech VLSI Design', degree: DegreeType.MTech, annual_fee: 67600 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 420000 },
  ],
  'Indian Institute of Technology Madras': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 212500 },
    { course: 'B.Tech Aerospace Engineering', degree: DegreeType.BTech, annual_fee: 212500 },
    { course: 'B.Tech Chemical Engineering', degree: DegreeType.BTech, annual_fee: 212500 },
    { course: 'M.Tech Data Science', degree: DegreeType.MTech, annual_fee: 62500 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 400000 },
  ],
  'Indian Institute of Technology Kanpur': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 220000 },
    { course: 'B.Tech Electrical Engineering', degree: DegreeType.BTech, annual_fee: 220000 },
    { course: 'M.Tech Artificial Intelligence', degree: DegreeType.MTech, annual_fee: 70000 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 430000 },
  ],
  'Indian Institute of Technology Kharagpur': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 148700 },
    { course: 'B.Tech Mining Engineering', degree: DegreeType.BTech, annual_fee: 148700 },
    { course: 'B.Arch Architecture', degree: DegreeType.BArch, annual_fee: 148700 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 380000 },
    { course: 'LLB Law', degree: DegreeType.LLB, annual_fee: 148700 },
  ],
  'National Institute of Technology Trichy': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 155000 },
    { course: 'B.Tech Electronics & Communication', degree: DegreeType.BTech, annual_fee: 155000 },
    { course: 'B.Tech Mechanical Engineering', degree: DegreeType.BTech, annual_fee: 155000 },
    { course: 'M.Tech Computer Science', degree: DegreeType.MTech, annual_fee: 55000 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 200000 },
  ],
  'BITS Pilani': [
    { course: 'B.Tech Computer Science', degree: DegreeType.BTech, annual_fee: 575000 },
    { course: 'B.Tech Electronics & Instrumentation', degree: DegreeType.BTech, annual_fee: 575000 },
    { course: 'B.Tech Mechanical Engineering', degree: DegreeType.BTech, annual_fee: 575000 },
    { course: 'M.Pharm Pharmacy', degree: DegreeType.MPharm, annual_fee: 250000 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 650000 },
  ],
  'VIT Vellore': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 198000 },
    { course: 'B.Tech AI & Machine Learning', degree: DegreeType.BTech, annual_fee: 225000 },
    { course: 'B.Tech Electronics & Communication', degree: DegreeType.BTech, annual_fee: 198000 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 350000 },
    { course: 'M.Tech Software Engineering', degree: DegreeType.MTech, annual_fee: 150000 },
  ],
  'College of Engineering Pune': [
    { course: 'B.Tech Computer Engineering', degree: DegreeType.BTech, annual_fee: 120000 },
    { course: 'B.Tech Mechanical Engineering', degree: DegreeType.BTech, annual_fee: 120000 },
    { course: 'B.Tech Civil Engineering', degree: DegreeType.BTech, annual_fee: 120000 },
    { course: 'M.Tech Computer Engineering', degree: DegreeType.MTech, annual_fee: 80000 },
  ],
  'IIIT Hyderabad': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 350000 },
    { course: 'B.Tech Electronics & Communication', degree: DegreeType.BTech, annual_fee: 350000 },
    { course: 'M.Tech Computer Science', degree: DegreeType.MTech, annual_fee: 200000 },
    { course: 'M.Tech Computational Linguistics', degree: DegreeType.MTech, annual_fee: 200000 },
    { course: 'Ph.D Computer Science', degree: DegreeType.PhD, annual_fee: 50000 },
  ],
  'Delhi University': [
    { course: 'B.A. (Hons) Economics', degree: DegreeType.BA, annual_fee: 15000 },
    { course: 'B.Com (Hons)', degree: DegreeType.BCom, annual_fee: 12000 },
    { course: 'B.Sc (Hons) Computer Science', degree: DegreeType.BSc, annual_fee: 18000 },
    { course: 'LLB Law', degree: DegreeType.LLB, annual_fee: 25000 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 180000 },
    { course: 'M.A. Economics', degree: DegreeType.MA, annual_fee: 12000 },
  ],
  'Jadavpur University': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 45000 },
    { course: 'B.Tech Electronics & Telecommunication', degree: DegreeType.BTech, annual_fee: 45000 },
    { course: 'B.Arch Architecture', degree: DegreeType.BArch, annual_fee: 45000 },
    { course: 'M.Tech Computer Science', degree: DegreeType.MTech, annual_fee: 30000 },
    { course: 'M.Sc Physics', degree: DegreeType.MSc, annual_fee: 20000 },
  ],
  'Manipal Institute of Technology': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 420000 },
    { course: 'B.Tech Mechatronics', degree: DegreeType.BTech, annual_fee: 420000 },
    { course: 'MBBS', degree: DegreeType.MBBS, annual_fee: 1200000 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 500000 },
    { course: 'B.Arch Architecture', degree: DegreeType.BArch, annual_fee: 380000 },
  ],
  'SRM Institute of Science and Technology': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 250000 },
    { course: 'B.Tech Biomedical Engineering', degree: DegreeType.BTech, annual_fee: 250000 },
    { course: 'MBBS', degree: DegreeType.MBBS, annual_fee: 1100000 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 400000 },
    { course: 'LLB Law', degree: DegreeType.LLB, annual_fee: 150000 },
  ],
  'National Institute of Technology Surathkal': [
    { course: 'B.Tech Computer Science & Engineering', degree: DegreeType.BTech, annual_fee: 145000 },
    { course: 'B.Tech Information Technology', degree: DegreeType.BTech, annual_fee: 145000 },
    { course: 'B.Tech Electrical & Electronics', degree: DegreeType.BTech, annual_fee: 145000 },
    { course: 'M.Tech Computer Science', degree: DegreeType.MTech, annual_fee: 50000 },
    { course: 'MBA', degree: DegreeType.MBA, annual_fee: 180000 },
  ],
};

// ── Placement stats per college ────────────────────────────────────────────
type PlacementData = { year: number; avg_pkg: number; max_pkg: number; placement_pct: number; top_recruiters: string[] };

const placementMap: Record<string, PlacementData[]> = {
  'Indian Institute of Technology Bombay': [
    { year: 2024, avg_pkg: 2800000, max_pkg: 25000000, placement_pct: 95, top_recruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'McKinsey', 'Uber', 'Apple', 'Amazon'] },
    { year: 2023, avg_pkg: 2600000, max_pkg: 22000000, placement_pct: 94, top_recruiters: ['Google', 'Microsoft', 'Goldman Sachs', 'Flipkart', 'Qualcomm'] },
  ],
  'Indian Institute of Technology Delhi': [
    { year: 2024, avg_pkg: 2700000, max_pkg: 24000000, placement_pct: 94, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Samsung', 'Deloitte', 'BCG'] },
    { year: 2023, avg_pkg: 2500000, max_pkg: 21000000, placement_pct: 93, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Walmart Labs', 'Adobe'] },
  ],
  'Indian Institute of Technology Madras': [
    { year: 2024, avg_pkg: 2600000, max_pkg: 23000000, placement_pct: 93, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Cisco', 'Texas Instruments', 'Qualcomm'] },
    { year: 2023, avg_pkg: 2400000, max_pkg: 20000000, placement_pct: 92, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Cisco', 'Intel'] },
  ],
  'Indian Institute of Technology Kanpur': [
    { year: 2024, avg_pkg: 2500000, max_pkg: 22000000, placement_pct: 92, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Sprinklr', 'Tower Research'] },
    { year: 2023, avg_pkg: 2300000, max_pkg: 20000000, placement_pct: 91, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Optiver', 'DE Shaw'] },
  ],
  'Indian Institute of Technology Kharagpur': [
    { year: 2024, avg_pkg: 2400000, max_pkg: 20000000, placement_pct: 91, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Tata Steel', 'McKinsey', 'BCG'] },
    { year: 2023, avg_pkg: 2200000, max_pkg: 18000000, placement_pct: 90, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Infosys', 'TCS'] },
  ],
  'National Institute of Technology Trichy': [
    { year: 2024, avg_pkg: 1200000, max_pkg: 8000000, placement_pct: 88, top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Zoho', 'Cognizant'] },
    { year: 2023, avg_pkg: 1100000, max_pkg: 7500000, placement_pct: 87, top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Zoho'] },
  ],
  'BITS Pilani': [
    { year: 2024, avg_pkg: 1800000, max_pkg: 15000000, placement_pct: 90, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Uber', 'Zomato'] },
    { year: 2023, avg_pkg: 1700000, max_pkg: 14000000, placement_pct: 89, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Flipkart'] },
  ],
  'VIT Vellore': [
    { year: 2024, avg_pkg: 800000, max_pkg: 6000000, placement_pct: 82, top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Capgemini', 'Amazon'] },
    { year: 2023, avg_pkg: 750000, max_pkg: 5500000, placement_pct: 80, top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL'] },
  ],
  'College of Engineering Pune': [
    { year: 2024, avg_pkg: 900000, max_pkg: 5000000, placement_pct: 85, top_recruiters: ['TCS', 'Infosys', 'Persistent Systems', 'KPIT', 'Cummins'] },
    { year: 2023, avg_pkg: 850000, max_pkg: 4500000, placement_pct: 83, top_recruiters: ['TCS', 'Infosys', 'Persistent Systems', 'KPIT'] },
  ],
  'IIIT Hyderabad': [
    { year: 2024, avg_pkg: 2000000, max_pkg: 18000000, placement_pct: 96, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Uber', 'Qualcomm', 'Samsung Research'] },
    { year: 2023, avg_pkg: 1900000, max_pkg: 16000000, placement_pct: 95, top_recruiters: ['Google', 'Microsoft', 'Amazon', 'Uber', 'Qualcomm'] },
  ],
  'Delhi University': [
    { year: 2024, avg_pkg: 600000, max_pkg: 3000000, placement_pct: 70, top_recruiters: ['Deloitte', 'KPMG', 'EY', 'PwC', 'Hindustan Unilever'] },
    { year: 2023, avg_pkg: 550000, max_pkg: 2800000, placement_pct: 68, top_recruiters: ['Deloitte', 'KPMG', 'EY', 'PwC'] },
  ],
  'Jadavpur University': [
    { year: 2024, avg_pkg: 900000, max_pkg: 6000000, placement_pct: 80, top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Tata Motors'] },
    { year: 2023, avg_pkg: 850000, max_pkg: 5500000, placement_pct: 78, top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Amazon'] },
  ],
  'Manipal Institute of Technology': [
    { year: 2024, avg_pkg: 750000, max_pkg: 5000000, placement_pct: 78, top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Manipal Health'] },
    { year: 2023, avg_pkg: 700000, max_pkg: 4500000, placement_pct: 76, top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] },
  ],
  'SRM Institute of Science and Technology': [
    { year: 2024, avg_pkg: 700000, max_pkg: 4500000, placement_pct: 75, top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Capgemini'] },
    { year: 2023, avg_pkg: 650000, max_pkg: 4000000, placement_pct: 73, top_recruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant'] },
  ],
  'National Institute of Technology Surathkal': [
    { year: 2024, avg_pkg: 1100000, max_pkg: 7000000, placement_pct: 86, top_recruiters: ['Amazon', 'Microsoft', 'Infosys', 'TCS', 'Qualcomm', 'Texas Instruments'] },
    { year: 2023, avg_pkg: 1000000, max_pkg: 6500000, placement_pct: 85, top_recruiters: ['Amazon', 'Microsoft', 'Infosys', 'TCS', 'Qualcomm'] },
  ],
};

// ── Admission cutoffs per college ──────────────────────────────────────────
type CutoffData = { exam: ExamType; year: number; category: CategoryType; cutoff_value: number };

const cutoffMap: Record<string, CutoffData[]> = {
  'Indian Institute of Technology Bombay': [
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.General, cutoff_value: 67 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.OBC, cutoff_value: 120 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.SC, cutoff_value: 350 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.ST, cutoff_value: 520 },
    { exam: ExamType.JEE_Advanced, year: 2023, category: CategoryType.General, cutoff_value: 72 },
  ],
  'Indian Institute of Technology Delhi': [
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.General, cutoff_value: 55 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.OBC, cutoff_value: 100 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.SC, cutoff_value: 310 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.ST, cutoff_value: 480 },
    { exam: ExamType.JEE_Advanced, year: 2023, category: CategoryType.General, cutoff_value: 60 },
  ],
  'Indian Institute of Technology Madras': [
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.General, cutoff_value: 45 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.OBC, cutoff_value: 90 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.SC, cutoff_value: 280 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.ST, cutoff_value: 450 },
    { exam: ExamType.JEE_Advanced, year: 2023, category: CategoryType.General, cutoff_value: 50 },
  ],
  'Indian Institute of Technology Kanpur': [
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.General, cutoff_value: 80 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.OBC, cutoff_value: 140 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.SC, cutoff_value: 400 },
    { exam: ExamType.JEE_Advanced, year: 2023, category: CategoryType.General, cutoff_value: 85 },
  ],
  'Indian Institute of Technology Kharagpur': [
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.General, cutoff_value: 95 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.OBC, cutoff_value: 160 },
    { exam: ExamType.JEE_Advanced, year: 2024, category: CategoryType.SC, cutoff_value: 450 },
    { exam: ExamType.JEE_Advanced, year: 2023, category: CategoryType.General, cutoff_value: 100 },
  ],
  'National Institute of Technology Trichy': [
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.General, cutoff_value: 1200 },
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.OBC, cutoff_value: 3500 },
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.SC, cutoff_value: 12000 },
    { exam: ExamType.JEE_Main, year: 2023, category: CategoryType.General, cutoff_value: 1350 },
  ],
  'BITS Pilani': [
    { exam: ExamType.BITSAT, year: 2024, category: CategoryType.General, cutoff_value: 360 },
    { exam: ExamType.BITSAT, year: 2024, category: CategoryType.OBC, cutoff_value: 340 },
    { exam: ExamType.BITSAT, year: 2023, category: CategoryType.General, cutoff_value: 355 },
    { exam: ExamType.BITSAT, year: 2023, category: CategoryType.OBC, cutoff_value: 335 },
  ],
  'VIT Vellore': [
    { exam: ExamType.VITEEE, year: 2024, category: CategoryType.General, cutoff_value: 5000 },
    { exam: ExamType.VITEEE, year: 2024, category: CategoryType.OBC, cutoff_value: 8000 },
    { exam: ExamType.VITEEE, year: 2023, category: CategoryType.General, cutoff_value: 5500 },
  ],
  'College of Engineering Pune': [
    { exam: ExamType.MHT_CET, year: 2024, category: CategoryType.General, cutoff_value: 98 },
    { exam: ExamType.MHT_CET, year: 2024, category: CategoryType.OBC, cutoff_value: 95 },
    { exam: ExamType.MHT_CET, year: 2024, category: CategoryType.SC, cutoff_value: 88 },
    { exam: ExamType.MHT_CET, year: 2023, category: CategoryType.General, cutoff_value: 97 },
  ],
  'IIIT Hyderabad': [
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.General, cutoff_value: 800 },
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.OBC, cutoff_value: 2000 },
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.SC, cutoff_value: 8000 },
    { exam: ExamType.JEE_Main, year: 2023, category: CategoryType.General, cutoff_value: 900 },
  ],
  'Delhi University': [
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.General, cutoff_value: 95 },
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.OBC, cutoff_value: 90 },
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.SC, cutoff_value: 80 },
    { exam: ExamType.JEE_Main, year: 2023, category: CategoryType.General, cutoff_value: 94 },
  ],
  'Jadavpur University': [
    { exam: ExamType.WBJEE, year: 2024, category: CategoryType.General, cutoff_value: 150 },
    { exam: ExamType.WBJEE, year: 2024, category: CategoryType.OBC, cutoff_value: 400 },
    { exam: ExamType.WBJEE, year: 2024, category: CategoryType.SC, cutoff_value: 1200 },
    { exam: ExamType.WBJEE, year: 2023, category: CategoryType.General, cutoff_value: 180 },
  ],
  'Manipal Institute of Technology': [
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.General, cutoff_value: 50000 },
    { exam: ExamType.NEET, year: 2024, category: CategoryType.General, cutoff_value: 550 },
    { exam: ExamType.NEET, year: 2024, category: CategoryType.OBC, cutoff_value: 500 },
    { exam: ExamType.NEET, year: 2023, category: CategoryType.General, cutoff_value: 540 },
  ],
  'SRM Institute of Science and Technology': [
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.General, cutoff_value: 80000 },
    { exam: ExamType.NEET, year: 2024, category: CategoryType.General, cutoff_value: 520 },
    { exam: ExamType.NEET, year: 2024, category: CategoryType.OBC, cutoff_value: 480 },
    { exam: ExamType.NEET, year: 2023, category: CategoryType.General, cutoff_value: 510 },
  ],
  'National Institute of Technology Surathkal': [
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.General, cutoff_value: 2500 },
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.OBC, cutoff_value: 6000 },
    { exam: ExamType.JEE_Main, year: 2024, category: CategoryType.SC, cutoff_value: 18000 },
    { exam: ExamType.JEE_Main, year: 2023, category: CategoryType.General, cutoff_value: 2800 },
  ],
};

// ── Main seed function ─────────────────────────────────────────────────────
async function main() {
  console.log('🌱 Starting seed...\n');

  // Clear existing data in correct order (child → parent)
  console.log('🗑️  Clearing existing data...');
  await prisma.admissionCutoff.deleteMany();
  await prisma.placementStat.deleteMany();
  await prisma.courseFee.deleteMany();
  await prisma.college.deleteMany();
  console.log('✅ Cleared\n');

  let totalColleges = 0;
  let totalCourses = 0;
  let totalPlacements = 0;
  let totalCutoffs = 0;

  for (const collegeData of colleges) {
    const college = await prisma.college.create({ data: collegeData });
    totalColleges++;
    console.log(`✅ Created college: ${college.name}`);

    // Seed course fees
    const fees = courseFeeMap[college.name] || [];
    if (fees.length > 0) {
      await prisma.courseFee.createMany({
        data: fees.map((f) => ({ ...f, college_id: college.id })),
      });
      totalCourses += fees.length;
      console.log(`   📚 Added ${fees.length} course fees`);
    }

    // Seed placement stats
    const placements = placementMap[college.name] || [];
    for (const p of placements) {
      await prisma.placementStat.create({
        data: { ...p, college_id: college.id },
      });
    }
    totalPlacements += placements.length;
    if (placements.length > 0) console.log(`   📊 Added ${placements.length} placement records`);

    // Seed admission cutoffs
    const cutoffs = cutoffMap[college.name] || [];
    if (cutoffs.length > 0) {
      await prisma.admissionCutoff.createMany({
        data: cutoffs.map((c) => ({ ...c, college_id: college.id })),
      });
      totalCutoffs += cutoffs.length;
      console.log(`   🎯 Added ${cutoffs.length} cutoff records`);
    }

    console.log('');
  }

  console.log('─────────────────────────────────────────');
  console.log('🎉 Seed completed successfully!');
  console.log(`   Colleges    : ${totalColleges}`);
  console.log(`   Course Fees : ${totalCourses}`);
  console.log(`   Placements  : ${totalPlacements}`);
  console.log(`   Cutoffs     : ${totalCutoffs}`);
  console.log('─────────────────────────────────────────');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
