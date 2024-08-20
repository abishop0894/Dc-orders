"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Providers } from "@/app/providers";
import { useEffect, useState } from "react";
import { data } from "@/lib/data";
import { getOrders } from "@/lib/data/getDocs";

interface Order {
  date: string;
  engravings: string[];
  images: string[];
  orderNumber: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array to ensure this runs only once

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <Providers>
      <div className="mx-auto  flex w-full max-w-4xl flex-col gap-6 mb-[2vh]">
        <Accordion
          fullWidth
          keepContentMounted
          className="gap-3 mt-6"
          itemClasses={{
            base: "px-6 !bg-default-100 !shadow-none hover:!bg-default-200/50",
            title: "font-medium",
            trigger: "py-6",
            content: "pt-0 pb-6 text-base text-default-500",
          }}
          selectionMode="multiple"
          variant="splitted"
        >
          {orders.map((order, i) => (
            <AccordionItem
              key={i}
              indicator={<Icon icon="lucide:plus" width={24} />}
              title={order.date}
            >
              <div className="order-details">
                <h3>{order.orderNumber}</h3>
                <p>Date: {order.date}</p>

                <div className="engraving-list">
                  <p>Engravings:</p>
                  {order.engravings.map((engraving, index) => (
                    <p key={index} className="text-sm">
                      {engraving}
                    </p>
                  ))}
                </div>

                <div className="image-list flex flex-row gap-2">
                  {order.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Order ${order.orderNumber} Image ${index + 1}`}
                      className="w-10 h-10 cursor-pointer"
                      onClick={() => openModal(image)}
                    />
                  ))}
                </div>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div className="relative bg-white p-4 rounded shadow-lg">
            <img
              src={selectedImage}
              alt="Expanded view"
              className="max-w-full max-h-screen"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black text-2xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </Providers>
  );
}
