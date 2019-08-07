import { Entity, model, property } from '@loopback/repository';

@model()
export class Transfer extends Entity {
  @property()
  wallet_type_from: number;

  @property()
  wallet_type_to: number;

  @property()
  transfer_to: string;

  @property()
  amount: number;

  @property()
  message: string;

  @property()
  password: string;
}
