import { Entity, model, property } from '@loopback/repository';

@model()
export class EWallet extends Entity {
  @property()
  ewallet_type_id: number;
}
