import { Accordion, AccordionItem } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { Providers } from "@/app/providers";
import { useEffect, useState } from "react";
import { getOrders } from "@/lib/data/getDocs";

interface Order {
  date: string;
  engravings: string[];
  images: string[];
  orderNumber: string;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Set the number of orders to display per page

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

  // Calculate the index of the first and last orders for the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Providers>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 mb-[2vh]">
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
          {currentOrders.map((order, i) => (
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

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal for image preview */}
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
