export class User {
  public userId: string;
  public firstName: string;
  public lastName: string;
  public name: string;
  public userNameOrEmail: string;
  public username: string;
  public email: string;
  public password: string;
  public lastLoginDate: Date;
  public lastLoginDateDisplay: Date;
  public joinDate: Date;
  public profileImageUrl: string;
  public active: boolean;
  public notLocked: boolean;
  public roleName: string;
  public authorities: [];
  public accessToken: string;

  constructor() {
    this.userId = '';
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.lastLoginDate = null;
    this.lastLoginDateDisplay = null;
    this.joinDate = null;
    this.profileImageUrl = '';
    this.active = false;
    this.notLocked = false;
    this.roleName = '';
    this.accessToken = '';
    this.password = '';
    this.userNameOrEmail = '';
  }

}
