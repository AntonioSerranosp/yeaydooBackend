import { IsInt, IsString } from 'class-validator';
/**Esto ya incluye la validacion de cuantos campos deben de ser */
export class CreateUsersDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly role: string;
  @IsString()
  readonly email: string;
}
