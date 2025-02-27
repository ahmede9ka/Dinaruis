export class Usersignup {
    firstName: string;
    lastName: string;
    DateOfBirth: Date;
    phoneNumber: string;
    role: string;
    localisation: string;
    email: string;
    password: string;
    constructor(
        email: string = '', 
        password: string = '', 
        firstName: string = '', 
        lastName: string = '', 
        DateOfBirth: Date = new Date(),  // Set default value to a new Date object
        phoneNumber: string = '', 
        role: string = '', 
        localisation: string = ''
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.DateOfBirth = DateOfBirth;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.localisation = localisation;
        this.email = email;
        this.password = password;
    }
}
