import { getOrders } from "./getDocs";

export const data = async () => {
  await getOrders().then((orders) => {
    return orders;
  });
};
