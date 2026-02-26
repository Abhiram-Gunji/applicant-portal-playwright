/**
 * Centralized Test Configuration
 * Contains all test data for verification request flow
 */

export const testConfig = {
  // Base URL
  baseUrl: "https://app.preprod.dataflowgroup.com",

  // Timeouts
  timeouts: {
    default: 240000,
    short: 2000,
    medium: 3000,
    long: 5000
  },

  // User Credentials
  users: {
    existingUser: {
      email: "gunjiabhiram+dhpregression6@dataflowgroup.com",
      captcha: "123456",
      otp: "123456"
    },
    newUser: {
      email: "newuser+test@dataflowgroup.com",
      captcha: "123456",
      otp: "123456",
      profile: {
        salutation: "Mr.",
        firstName: "Suyeon",
        lastName: "Lee",
        mobile: "9876543210",
        dob: {
          year: "1996",
          month: "Jan",
          date: "15"
        },
        gender: "Male",
        nationality: "Afghanistan",
        profession: "Accountant"
      }
    }
  },

  // Verification Request Data
  verification: {
    country: "Norway",
    authority: "The Norwegian Directorate of Health (Helsedirektoratet)",
    speciality: "License Application",
    subSpeciality: "1 Document Verification",
    
    documents: {
      passport: "Passport - First Page",
      experienceLetter: "Experience Letter"
    },

    issuer: {
      name: "BIGFLOW",
      address: "north goa"
    }
  },

  // File Paths (Update these based on your environment)
  files: {
    passport: "C:/Users/gunjiabhiram_dataflo/Downloads/Passport Sample.jpg",
    experience: "C:/Users/gunjiabhiram_dataflo/Downloads/wipro.png"
  },

  // Experience Letter Details
  experienceDetails: {
    designation: "Senior QA Engineer",
    startDate: {
      year: "2020",
      month: "Dec",
      day: "20"
    },
    endDate: {
      year: "2024",
      month: "Dec",
      day: "15"
    },
    employmentType: "Full-time",
    currentlyWorking: "No",
    firstName: "Suyeon",
    lastName: "Lee"
  },

  // Payment Details
  payment: {
    cardNumber: "4012001037141112",
    expiryMonth: "12",
    expiryYear: "26",
    cvv: "123",
    cardHolder: "Abhi",
    otp: "123456"
  }
};

// Export individual sections for convenience
export const { users, verification, files, experienceDetails, payment, timeouts } = testConfig;
