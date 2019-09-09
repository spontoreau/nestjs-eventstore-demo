import { IsNumber, Min } from "class-validator";

export class DepositeBody {
  @IsNumber()
  @Min(1)
  readonly amount!: number;
}