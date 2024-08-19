import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";

interface Order {
  date: string;
  engravings: string[];
  images: string[];
  orderNumber: string;
}

export const getOrders = async (): Promise<Order[]> => {
  const ordersCollection = collection(db, "orders");
  const ordersSnapshot = await getDocs(ordersCollection);
  const ordersList: Order[] = ordersSnapshot.docs.map((doc) => ({
    date: doc.data().date,
    engravings: doc.data().engravings,
    images: doc.data().images,
    orderNumber: doc.data().orderNumber,
  }));
  return ordersList;
};

// Example usage
getOrders().then((orders) => {
  console.log(orders);
});
