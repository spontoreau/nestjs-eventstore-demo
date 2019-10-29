import { IsString, IsNotEmpty } from "class-validator";

export class WithdrawParams {
  @IsString()
  @IsNotEmpty()
  readonly id!: string;
}
