export interface Person {
    datasource: string;
    dataPulledDate: Date;
    ssan: string;
    id: string;
    personIdentifier: string;
    legacyPersonId: number;
    activeDodId: string;
    activeCoreType: string;
    activeDisplayGradeAndFullName: string;
    records: Record[];
};

export interface Record {
    dataPulledDate: Date;
    isActive: boolean;
    occupationalSeries: string;
    dodId: string;
    careerTypeDescription: string;
    gradeAbbreviation: string;
    firstName: string;
    lastName: string;
    middleName: string;
    fullName: string;
    displayGradeAndFullName: string;
    dependents: string[];
    acquisition: Acquisition[];
    acquisitionCertification: AcquisitionCertification[];
    duty: Duty;
    acquisitionDetails: AcquisitionDetails;
    additionalInfoDetails: {
        detail: {
            datasource: string;
            hasEmotionalInstability: true;
            hasUnrestrictiveFingerUsage: true;
            hasSpeechImpediment: true;
            citizenshipStatus: string;
            citizenshipStatusDescription: string;
            originalCitizenshipCountry: string;
            originalCitizenshipCountryDescription: string;
            hasDisputedDataIndicator: true;
            eyeColor: string;
            eyeColorDescription: string;
            hairColor: string;
            hairColorDescription: string;
            recruiterIdentifier: string;
            faithGroup: string;
            faithGroupDescription: string;
            dateOfBirth: string;
            maritalStatus: string;
            maritalStatusDescription: string;
            gender: string;
            genderDescription: string;
            colorVisionTestResult: true;
            depthPerceptionTestResult: true;
            hasDependentCareResponsibilityProgram: true;
            areaOfResponsibilityServiceFlag: string;
            areaOfResponsibilityServiceFlagDescription: string;
        };
    };
};

export interface Acquisition {
    datasource: string;
    warrantAmount: string;
    warrantAmountDescription: string;
    warrantBeginDate: Date;
    warrantEndDate: Date;
    warrantType: string;
    warrantTypeDescription: string
};

export interface AcquisitionCertification {
    datasource: string;
    acquisitionDateCareerLevelAchieved: Date;
    acquisitionCareerLevelAchievedDescription: string;
    acquisitionCareerLevelApprovedAuthority: string;
    acquisitionCareerLevelApprovedAuthorityDescription: string;
    acquisitionCertCareerField: string;
    acquisitionCertCareerFieldDescription: string
};

export interface Duty {
    datasource: string;
    dodId: string;
    asOfDate: Date;
    lastUpdated: Date;
    name: string;
    lastName: string;
    supervisoryLevel: string;
    currentDutyTitle: string;
    securityClearance: string;
    centrallyManagedPositionType: string;
    organizationLevel: string;
    language: string;
    payPlanSeriesGrade: string;
    startDate: Date;
    serviceComputationDate: Date;
    dateOfRank: Date;
    careerField: string;
    location: string;
    dateEligibleForReturnFromOverseas: Date;
    supervisoryExperienceYears: 0;
    overseasExperience: string;
    degreeLevel: string;
    degreeLevel01: string;
    degreeLevel02: string;
    degreeLevel03: string;
    degreeMajor: string;
    degreeMajor01: string;
    degreeMajor02: string;
    degreeMajor03: string;
    degreeSchool: string;
    degreeSchool01: string;
    degreeSchool02: string;
    degreeSchool03: string;
    degreeDate: number;
    degreeDate01: number;
    degreeDate02: number;
    degreeDate03: number;
    appraisalDescription: string;
    appraisalDescription01: string;
    appraisalDescription02: string;
    appraisalDescription03: string;
    appraisalDescription04: string;
    appraisalDescription05: string;
    appraisalDate: Date;
    appraisalDate01: Date;
    appraisalDate02: Date;
    appraisalDate03: Date;
    appraisalDate04: Date;
    appraisalDate05: Date;
    timeoffTotal: 0;
    cashAwardTotal: 0
};

export interface AcquisitionDetails {
    acquisition: AcquisitionDetailsAcquisition[];
    certification: AcquisitionDetailsCertification[];
};

export interface AcquisitionDetailsAcquisition {
    datasource: string;
    corpId: string;
    corpIdDescription: string;
    degreeBasis: string;
    degreeBasisDescription: string;
    experienceBasis: string;
    experienceBasisDescription: string;
    gradeBasis: string;
    gradeBasisDescription: string;
    qualificationHours: string;
    qualificationHoursDescription: string;
    experienceMonths: 0;
    experiencePastMonths: 0;
    qualifyingExperienceMonths: 0;
    specialAcquisitionAssignment: string;
    specialAcquisitionAssignmentDescription: string;
    systemProgramOfficeExperience: string;
};

export interface AcquisitionDetailsCertification {
    datasource: string;
    careerField: string;
    careerFieldDescription: string;
    careerLevel: string;
    careerLevelDescription: string;
    authority: string;
};