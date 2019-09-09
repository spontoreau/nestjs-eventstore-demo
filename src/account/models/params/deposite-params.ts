import { IsString, IsNotEmpty } from "class-validator";

export class DepositeParams {
  @IsString()
  @IsNotEmpty()
  readonly id!: string;
}