import Order from "../entity/Order";

export default interface OrderRepository {
    save(order: Order): Promise<void>;
    findByCode(code: string): Promise<Order>;
    findAll(): Promise<Order[]>;
}