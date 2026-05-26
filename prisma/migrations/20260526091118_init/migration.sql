-- CreateEnum
CREATE TYPE "CollegeType" AS ENUM ('IIT', 'NIT', 'IIIT', 'BITS', 'Government', 'Private', 'Deemed', 'Central_University', 'State_University');

-- CreateEnum
CREATE TYPE "DegreeType" AS ENUM ('BTech', 'MTech', 'MBA', 'MCA', 'MBBS', 'MD', 'BCA', 'BSc', 'MSc', 'BArch', 'MArch', 'BPharm', 'MPharm', 'PhD', 'BBA', 'BCom', 'MCom', 'BA', 'MA', 'LLB', 'LLM');

-- CreateEnum
CREATE TYPE "ExamType" AS ENUM ('JEE_Main', 'JEE_Advanced', 'NEET', 'CAT', 'GATE', 'XAT', 'CLAT', 'BITSAT', 'VITEEE', 'MHT_CET', 'KCET', 'WBJEE', 'COMEDK', 'SNAP', 'MAT');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('General', 'OBC', 'SC', 'ST', 'EWS', 'PwD');

-- CreateTable
CREATE TABLE "colleges" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "type" "CollegeType" NOT NULL,
    "streams" TEXT[],
    "nirf_rank" INTEGER,
    "established" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "colleges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_fees" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "degree" "DegreeType" NOT NULL,
    "annual_fee" INTEGER NOT NULL,

    CONSTRAINT "course_fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "placement_stats" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "avg_pkg" DOUBLE PRECISION NOT NULL,
    "max_pkg" DOUBLE PRECISION NOT NULL,
    "placement_pct" DOUBLE PRECISION NOT NULL,
    "top_recruiters" TEXT[],

    CONSTRAINT "placement_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admission_cutoffs" (
    "id" TEXT NOT NULL,
    "college_id" TEXT NOT NULL,
    "exam" "ExamType" NOT NULL,
    "year" INTEGER NOT NULL,
    "category" "CategoryType" NOT NULL,
    "cutoff_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "admission_cutoffs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "colleges_name_key" ON "colleges"("name");

-- CreateIndex
CREATE INDEX "colleges_state_idx" ON "colleges"("state");

-- CreateIndex
CREATE INDEX "colleges_type_idx" ON "colleges"("type");

-- CreateIndex
CREATE INDEX "colleges_nirf_rank_idx" ON "colleges"("nirf_rank");

-- CreateIndex
CREATE INDEX "course_fees_college_id_idx" ON "course_fees"("college_id");

-- CreateIndex
CREATE INDEX "course_fees_degree_idx" ON "course_fees"("degree");

-- CreateIndex
CREATE INDEX "placement_stats_college_id_idx" ON "placement_stats"("college_id");

-- CreateIndex
CREATE INDEX "placement_stats_year_idx" ON "placement_stats"("year");

-- CreateIndex
CREATE UNIQUE INDEX "placement_stats_college_id_year_key" ON "placement_stats"("college_id", "year");

-- CreateIndex
CREATE INDEX "admission_cutoffs_college_id_idx" ON "admission_cutoffs"("college_id");

-- CreateIndex
CREATE INDEX "admission_cutoffs_exam_idx" ON "admission_cutoffs"("exam");

-- CreateIndex
CREATE INDEX "admission_cutoffs_year_idx" ON "admission_cutoffs"("year");

-- CreateIndex
CREATE UNIQUE INDEX "admission_cutoffs_college_id_exam_year_category_key" ON "admission_cutoffs"("college_id", "exam", "year", "category");

-- AddForeignKey
ALTER TABLE "course_fees" ADD CONSTRAINT "course_fees_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placement_stats" ADD CONSTRAINT "placement_stats_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admission_cutoffs" ADD CONSTRAINT "admission_cutoffs_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "colleges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
