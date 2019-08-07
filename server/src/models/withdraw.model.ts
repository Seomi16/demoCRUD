import { Entity, model, property } from '@loopback/repository';

@model()
export class Withdraw extends Entity {
  @property()
  wallet_type: number;

  @property()
  amount: number;
  
  @property()
  password: string;
}
