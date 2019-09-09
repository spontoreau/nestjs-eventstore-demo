import { IsNumber, Min } from "class-validator";

export class WithdrawBody {
  @IsNumber()
  @Min(1)
  readonly amount!: number ;
}