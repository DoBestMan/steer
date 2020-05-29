import { Cars } from './Car.enums';

export function instanceOfCars(idCar: string): idCar is Cars {
  return idCar in Cars;
}
