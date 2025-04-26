-- CreateTable
CREATE TABLE "LegalCase" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uploadId" TEXT NOT NULL,

    CONSTRAINT "LegalCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseInfo" (
    "id" TEXT NOT NULL,
    "appellant" TEXT NOT NULL,
    "apellee" TEXT NOT NULL,
    "relevant_to_bmw" BOOLEAN NOT NULL,
    "subject_of_case" BOOLEAN NOT NULL,
    "high_risk" BOOLEAN NOT NULL,
    "complaint_and_legal_action" TEXT NOT NULL,
    "department" TEXT[],
    "summary" TEXT NOT NULL,
    "legalCaseId" TEXT NOT NULL,

    CONSTRAINT "CaseInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CaseInfo_legalCaseId_key" ON "CaseInfo"("legalCaseId");

-- AddForeignKey
ALTER TABLE "CaseInfo" ADD CONSTRAINT "CaseInfo_legalCaseId_fkey" FOREIGN KEY ("legalCaseId") REFERENCES "LegalCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
