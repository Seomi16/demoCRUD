import { Entity, model, property } from '@loopback/repository';

@model()
export class TopupMw extends Entity {
  @property()
  topup_amount: number;

  @property()
  payment_type: string;

  @property.array(Number)
  wallet_type: number[];

  @property.array(Object)
  payment_detail: object[];

  @property()
  password: string;
}
