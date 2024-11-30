export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  roleId: number; // Untuk menghubungkan user dengan role
}
