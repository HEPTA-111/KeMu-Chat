interface KemuUser {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  createdAt: string;
  emailVerified: boolean;
  apiKey: string;
  schoolId: string;
  providerData: [
    {
      providerId: string | null;
      uid: string;
      email: string;
      photoURL: string | null;
      displayName: string | null;
      phoneNumber: string | null;
    }
  ];
  isAnonymous: boolean;
  appName: string;
  lastLoginAt: string;
}

export default KemuUser;
