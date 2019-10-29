import { IsString, IsNotEmpty } from "class-validator";

export class CreateAccountParams {
  @IsString()
  @IsNotEmpty()
  readonly id!: string;
}
